// const mongoose = require("mongoose")

const { resolve } = require("path");
const Submission = require("../models/Submission");

exports.addSubmission = (assignment_id,subject_id, student_id, question, submission) => {
    console.log("in as...");
    return new Promise((resolve,reject)=>{
        let sl = [];
        sl.push(submission);
        console.log(sl);
    var s = new Submission({assignment_id,subject_id,student_id,question,submissions:sl});
    console.log(s);
    s.save().then((data)=>{
        console.log(data);
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.addAttempt = (submission_id, submission) => {
    return new Promise((resolve,reject)=>{
    Submission.findByIdAndUpdate(submission_id,{$push:{submissions:submission}}).then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByStudentSubject = (student_id,subject_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id,subject_id}).exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByAssignmentStudent = (student_id,subject_id,assignment_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id,subject_id,assignment_id}).exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByAssignmentStudentQuestion = (student_id,subject_id,assignment_id,question_no,question) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id:student_id,subject_id:subject_id,assignemnt_is:assignment_id,"question.question":question,"question.question_no":question_no},{"submissions.filecloudlinks":0}).exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}