const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const openaijson = require("../openai.json");

const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRouter");
const academicTermRouter = require("../routes/academics/academicTermRouter");
const classLevelRouter = require("../routes/academics/classLevelRouter");
const programRouter = require("../routes/academics/programRouter");
const subjectRouter = require("../routes/academics/subjectRouter");
const yearGroupRouter = require("../routes/academics/yearGroupRouter");
const teacherRouter = require("../routes/staff/teacherRouter");
const examsRouter = require("../routes/academics/examsRouter");
const studentRouter = require("../routes/staff/studentRouter");
const questionsRouter = require("../routes/academics/questionsRouter");
const examResultsRouter = require("../routes/academics/examResultsRouter");

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); // pass incoming jsons

const options = {
  definition: openaijson,
   apis: [
    '../routes/academics/*.js', 
    '../routes/staff/*.js'
  ]
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/exam-results", examResultsRouter);

app.use(notFoundErr);
app.use(globalErrHandler);

// Serve Swagger UI
module.exports = app;
