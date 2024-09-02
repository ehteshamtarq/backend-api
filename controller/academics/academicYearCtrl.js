const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@desc     Create Academic Year
//@route    POST /api/v1/academic-years
//@access   Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic Year already exists");
  }

  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  //push academic into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic year created successfully",
    data: academicYearCreated,
  });
});

//@desc     get all Academic Years
//@route    POST /api/v1/academic-years
//@access   Private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();

  res.status(201).json({
    status: "success",
    data: academicYears,
  });
});

//@desc     get single Academic Year
//@route    POST /api/v1/academic-years/:id
//@access   Private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);

  if (!academicYears){
    throw new Error("Academic year doesn't exists")
  }

  res.status(201).json({
    status: "success",
    data: academicYears,
  });
});

//@desc     Update Academic Year
//@route    PUT /api/v1/academic-years/:id
//@access   Private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    throw new Error("Academic year already exists");
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Academic year updated successfully",
    data: academicYear,
  });
});

//@desc     Delete Academic Year
//@route    Delete /api/v1/academic-years/:id
//@access   Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
   const deleteAcademicYearFound = await AcademicYear.findById(req.params.id);
  if (!deleteAcademicYearFound) {
    throw new Error("Academic year doesn't exists");
  }

  await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic year deleted successfully",
  });
});
