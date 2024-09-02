const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");

//@desc     Exam results checking
//@route    POST /api/v1/exam-results/:id/checking
//@access   Private - Students only
exports.checkExamResults = AsyncHandler(async (req, res) => {
    //find the student
    const studentFound = await  Student.findById(res.userAuth?._id);
    if (!studentFound){
        throw new Error("No Student Found");
    }
    
    //find the exam results
    const examResult = await ExamResult.findOne({
        studentID: studentFound?.studentId,
        _id: req.params.id,
    }).populate({
        path: 'exam',
        populate:{
            path:'questions',
        },
    }).populate('classLevel').populate('academicTerm').populate('academicYear');

    //check if exam is published
    if ( examResult?.isPublished == false){
        throw new Error("Exam result is not available, check out later");
    }
  res.json({
    status: "success",
    message: "Exam result",
    data: examResult,
    student: studentFound
  });
});

//@desc     Get all Exam Results (name, id)
//@route    POST /api/v1/exam-results
//@access   Private - Students only
exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find().select('exam').populate('exam');
  res.status(200).json({
    status: "success",
    message: "Exam Results fetched",
    data: results,
  })
});

//@desc     Admin publish exam results
//@route    POST /api/v1/exam-results/:id/admin-publish
//@access   Private - Admin only
exports.adminPublishExamResult = AsyncHandler(async (req, res) => {
    const examResult = await ExamResult.findById(req.params);
    if (!examResult){
        throw new Error("Exam result not found");
    }
    
    const publishResult = await ExamResult.findByIdAndUpdate(req.params.id,{
        isPublished: req.body.publish,
    },{
        new: true
    });
  res.status(200).json({
    status: "success",
    message: "Exam Results fetched",
    data: publishResult,
  })
});