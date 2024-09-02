const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");

//@desc     Create Academic Terms
//@route    POST /api/v1/academic-terms
//@access   Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic Term already exists");
  }

  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //push academic into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Term created successfully",
    data: academicTermCreated,
  });
});

//@desc     get all Academic Terms
//@route    POST /api/v1/academic-terms
//@access   Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();

  res.status(201).json({
    status: "success",
    data: academicTerms,
  });
});

//@desc     get single Academic Term
//@route    POST /api/v1/academic-terms/:id
//@access   Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);

  if (!academicTerm){
    throw new Error("Academic Term doesn't exists")
  }

  res.status(201).json({
    status: "success",
    data: academicTerm,
  });
});

//@desc     Update Academic Term
//@route    PUT /api/v1/academic-terms/:id
//@access   Private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const createAcademicTermFound = await AcademicTerm.findOne({ name });
  if (createAcademicTermFound) {
    throw new Error("Academic Term already exists");
  }
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      duration,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Academic Term updated successfully",
    data: academicTerm,
  });
});

//@desc     Delete Academic Term
//@route    Delete /api/v1/academic-terms/:id
//@access   Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
   const deleteAcademicTermFound = await AcademicTerm.findById(req.params.id);
  if (!deleteAcademicTermFound) {
    throw new Error("Academic Term doesn't exists");
  }

  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic Term deleted successfully",
  });
});
