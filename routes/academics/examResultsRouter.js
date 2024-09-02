const express = require("express");
const {
checkExamResults,
getAllExamResults,
adminPublishExamResult
} = require("../../controller/academics/examResultsCtrl");
const isStudent = require("../../middlewares/isAdmin");
const isAdmin = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const isAdminLogin = require("../../middlewares/isLogin");

const examResultsRouter = express.Router();

examResultsRouter.get("/", isStudentLogin, isStudent, getAllExamResults)
examResultsRouter.get('/:id/checking',  isStudentLogin, isStudent, checkExamResults);
examResultsRouter.put('/:id/admin-publish',  isAdminLogin, isAdmin, adminPublishExamResult);

module.exports = examResultsRouter;
