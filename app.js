// var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
require("./models/Course");
// const {
//   getAssignmentsByStudent,
//   getAssignmentsBySubject,
// } = require("./services/dynamodb");
// const {
//   getAssignmentsByStudent,
//   getAssignmentsBySubject,
// } = require("./services/student");
// const { submitAssignment } = require("./services/student");
const {
  putAssignment,
  getAssignment,
  getAssignmentsBySubject,
  removeAssignment,
  modifyAssignment,
} = require("./controllers/assignment");
const {
  viewAssignments,
  submitAssignment,
  getAssignmentsByStudent,
} = require("./controllers/student");
// const {
//   adminViewAllAssignmentsBySubject,
//   adminViewAssignmentsBySubject,
//   adminViewAssignmentByStudents,
// } = require("./controllers/admin");

var app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "upskill.tutedude.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require("./services/mongoose");

// view engine setup
// app.set(path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
// app.use(
//   express.json({
//     type: ["application/json", "text/plain"],
//   })
// );
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.route("/assignment")
app.get("/", (req, res) => {
  //   res = setPublicCookie(req, res);
  res.render("index", { user: undefined });
})
app.use("/assignment",require("./routes/assignment"));
app.use("/assignment",require("./routes/submission"));
app.use("/assignment/mentor",require("./routes/mentor"));
app.use("/assignment",require("./routes/course"));
app.post("/assignment/submit", submitAssignment);
app.get("/assignment/subjects", (req, res) => {
  res.send({
    success: true,
    data: [
      { subject_id: 1, subject_name: "C++" },
      { subject_id: 2, subject_name: "Java" },
    ],
  });
});
app.get("/assignment/admin", (req, res) => {
  res.render("admin");
});
app.get("/assignment/assignment/view",viewAssignments);


module.exports = app;
