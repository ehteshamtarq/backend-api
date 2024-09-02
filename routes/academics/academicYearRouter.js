const express = require("express");
const {
    createAcademicYear,
    getAcademicYears,
    getAcademicYear,
    updateAcademicYear,
    deleteAcademicYear
}  = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicTermRouter  = express.Router();

academicTermRouter.post("/", isLogin, isAdmin, createAcademicYear);

academicTermRouter.get("/", isLogin, isAdmin, getAcademicYears);

academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicYear);

academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);

academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);





module.exports = academicTermRouter;