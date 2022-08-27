// const { uploadFile } = require("../services/s3");
const { uploadFiles } = require("../util/s3");
// const { saveAssignment } = require("./dynamodb");
const {
  saveAssignment,
  getAssignmentsByStudentSubject,
} = require("../services/student");
const { fetchAssignmentsBySubject } = require("../services/Assignment");
let formidable = require("formidable");
const { addSubmission, addAttempt, getSubmissionsByStudentSubject, getSubmissionsByAssignmentStudent, getSubmissionsByAssignmentStudentQuestion } = require("../services/submissions");
const { QuestionSchema } = require("../models/Assignment");

exports.submitAssignment = (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function (error, fields, file) {
    // console.log("file = ", Object.keys(file.fileupload));
    console.log("fields = ", fields);
    console.log("file = ", file);
    console.log(fields.question);
    // console.log("error = ", error);
    let files = [];
    for (let i = 0; i < fields.n; i++) {
      files.push(file[fields.aid + "_" + i]);
    }
    uploadFiles(files)
      .then((data) => {
        console.log("response of uploadFiles...\n", data);
        sub = {

        };
        if(fields.attempt)
        sub.attempt = fields.attempt;
        if(fields.link)
        sub.link=fields.link;
        if(fields.linkText)
        sub.linkText=fields.linkText;
        if(fields.text)
        sub.text=fields.text;
        if(data.filename)
        sub.filename=data.filename
        if(data.filelinks)
        sub.filelink=data.filelinks;
        if(data.filecloudlinks)
        sub.filecloudlinks=data.filecloudlinks;
        console.log(sub);
        addSubmission(fields.assignment_id,fields.subject_id,fields.student_id,{question:fields.question,question_no:fields.question_no,points:fields.points},sub)
          .then((data) => {
            console.log(data);
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            console.log(err);
            res.send({ success: false, error: err });
          });
      })
      .catch((err) => {
        // console.log("error in submit: ", err);
        res.send({ success: false, error: err });
      });
  });
};

exports.viewAssignments = async (req, res) => {
  const subject_id = req.query.subject_id;
  const student_id = req.query.student_id;
  const allAssignments = await fetchAssignmentsBySubject(subject_id)
  // .then((allAssignments)=>{
    let assignments = new Array(allAssignments.length);
    console.log("allAssignments",allAssignments);
    for(let i=0;i<allAssignments.length;i++)
    {
      assignments[i] = {};
      assignments[i].assignment_id=allAssignments[i]._id;
      assignments[i].subject_id=allAssignments[i].subject_id;
      assignments[i].questions = new Array(allAssignments[i].questions.length);
      for(let j=0;j<allAssignments[i].questions.length;j++)
      {
        const question = allAssignments[i].questions[j].question;
        const question_no = allAssignments[i].questions[j].question_no;
        assignments[i].questions[j] = {};
        assignments[i].questions[j].question = question;
        assignments[i].questions[j].question_no = question_no;
        if(allAssignments[i].questions[j].points)
        assignments[i].questions[j].points = allAssignments[i].questions[j].points;
        if(allAssignments[i].questions[j].instructions)
        assignments[i].questions[j].instructions = allAssignments[i].questions[j].instructions;
        console.log("assignment",assignments[i]);
      const submission = await getSubmissionsByAssignmentStudentQuestion(student_id,subject_id,allAssignments[i],question_no,question)
      // .then((submission)=>{
        console.log("submission",submission);
        if(submission.length>0)
        {
          if(submission[0].status)
          assignments[i].questions[j].status=submission[0].status;
          else
          assignments[i].questions[j].status="submitted";
          assignments[i].questions[j].submissions = submission[0].submissions;
          assignments[i].questions[j].submission_id = submission[0]._id;
          console.log("assignment after submission update",assignments[i]);
        }
        else
        {
          assignments[i].questions[j].status="pending";
        }
      // })
    }
    }
    console.log("submitting");
    res.send({success:true,data:assignments});
  // })
};

exports.getAssignmentsByStudent = (student_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment
      .find({ student_id: student_id })
      .toArray((err, result) => {
        if (err) {
          //   console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.resubmit = (req,res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, async function (error, fields, file) {
    // console.log("file = ", Object.keys(file.fileupload));
    console.log("fields = ", fields);
    console.log("file = ", file);
    // console.log(fields.question);
    // console.log("error = ", error);
    let files = [];
    for (let i = 0; i < fields.n; i++) {
      files.push(file[fields.aid + "_" + i]);
    }
    uploadFiles(files)
      .then((data) => {
        console.log("response of uploadFiles...\n", data);
        sub = {

        };
        if(fields.attempt)
        sub.attempt = fields.attempt;
        if(fields.link)
        sub.link=fields.link;
        if(fields.linkText)
        sub.linkText=fields.linkText;
        if(fields.text)
        sub.text=fields.text;
        if(data.filename)
        sub.filename=data.filename
        if(data.filelinks)
        sub.filelink=data.filelinks;
        if(data.filecloudlinks)
        sub.filecloudlinks=data.filecloudlinks;
        console.log(sub);
        addAttempt(fields.submission_id,sub)
          .then((data) => {
            console.log(data);
            res.send({ success: true, data: data });
          })
          .catch((err) => {
            console.log(err);
            res.send({ success: false, error: err });
          });
      })
      .catch((err) => {
        // console.log("error in submit: ", err);
        res.send({ success: false, error: err });
      });
  });
}
