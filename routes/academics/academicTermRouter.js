const express = require("express");
const {
    createAcademicTerm,
    getAcademicTerms,
    getAcademicTerm,
    updateAcademicTerm,
    deleteAcademicTerm
}  = require("../../controller/academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter  = express.Router();

academicYearRouter.post("/", isLogin, isAdmin, createAcademicTerm);

academicYearRouter.get("/", isLogin, isAdmin, getAcademicTerms);

academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicTerm);

academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicTerm);

academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicTerm);





module.exports = academicYearRouter;