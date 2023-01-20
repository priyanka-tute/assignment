const { getSubmissionsBySubject, getSubmissionsByStudent, getAllSubmissions, getSubmissionsByStudentSubject, addFeedback } = require("../services/submissions");
const { uploadFiles } = require("../util/s3");
let formidable = require("formidable");
const { addAssignment } = require("../services/Assignment");


exports.fetchSubmissionsBySubject = (req,res) => {
    const subject_id = req.query.subject_id;
    console.log("subject_id = ",subject_id);
    getSubmissionsBySubject(subject_id).then((data)=>{
        console.log(data);
        res.send({success:true,data:data});
    }).catch((err)=>{
        console.log(err);
        res.send({success:false,error:err});
    })
}

exports.fetchSubmissionsByStudent = (req,res) => {
    const student_id = req.query.student_id;
    console.log("student_id = ",student_id);
    getSubmissionsByStudent(student_id).then((data)=>{
        console.log(data);
        res.send({success:true,data:data});
    }).catch((err)=>{
        console.log(err);
        res.send({success:false,error:err});
    })
}

exports.fetchAllSubmissions = (req,res) => {
    // const student_id = req.query.student_id;
    // console.log("student_id = ",student_id);
    getAllSubmissions().then((data)=>{
        console.log(data);
        res.send({success:true,data:data});
    }).catch((err)=>{
        console.log(err);
        res.send({success:false,error:err});
    })
}

exports.fetchSubmissionsByStudentSubject = (req,res) => {
    const student_id = req.query.student_id;
    console.log("student_id = ",student_id);
    const subject_id = req.query.subject_id;
    console.log("subject_id = ",subject_id);
    getSubmissionsByStudentSubject(student_id,subject_id).then((data)=>{
        console.log(data);
        res.send({success:true,data:data});
    }).catch((err)=>{
        console.log(err);
        res.send({success:false,error:err});
    })
}

exports.addMentorFeedback = (req,res) => {
    let form = new formidable.IncomingForm();
  form.parse(req, async function (error, fields, file) {
    // console.log("file = ", Object.keys(file.fileupload));
    console.log("fields = ", fields);
    console.log("file = ", file);
    // console.log("error = ", error);
    let links = [];
    for (let i = 0; i < fields.link_n; i++) {
      links.push(fields[fields.link-aid + "_" + i]);
    }
    let ltd = [];
    for (let i = 0; i < fields.ltd_n; i++) {
      ltd.push(fields[fields.ltd-aid + "_" + i]);
    }
    let files = [];
    for (let i = 0; i < fields.n; i++) {
      files.push(file[fields.aid + "_" + i]);
    }
    uploadFiles(files)
      .then((data) => {
        console.log("response of uploadFiles...\n", data);
        sub = {

        };
        // if(fields.attempt)
        // sub.attempt = fields.attempt;
        // if(fields.link)
        sub.link=fields.links;
        // if(fields.linkText)
        sub.linkText=fields.ltd;
        if(fields.text)
        sub.text=fields.text;
        if(data.filename)
        sub.filename=data.filename
        if(data.filelinks)
        sub.filelink=data.filelinks;
        if(data.filecloudlinks)
        sub.filecloudlinks=data.filecloudlinks;
        // if(data.resubmit && data.resubmit=="true")
        // sub.status = "pending";
        // sub
        console.log(sub);
        addFeedback(fields.submission_id,fields.list_id,sub)
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

exports.addAssignment = (req,res) => {
  console.log(req.body.assignment);
  addAssignment(req.body.assignment.subject_id,req.body.assignment.questions,req.body.assignment.addedBy,req.body.assignment.topic);
  res.send({success:true});
}