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

exports.removeFileSubmission = (submission_id, list_id, filelink, filename,index) => {
    return new Promise((resolve,reject)=>{
        // Submission.aggregate([{
        //     $match:{_id:submission_id},
        //     $filter:{"submissions._id":list_id},   
        // }])
        Submission.findOne({_id:submission_id, "submissions._id":list_id,"submissions.filelink":{"$in":filelink}})
        .then((sub)=>{
            console.log("before committing....",sub,"\n",sub.submissions);
            sub.submissions[0].filelink.splice(index,1);
            sub.submissions[0].filename.splice(index,1);
            sub.submissions[0].filecloudlinks.splice(index,1);
            console.log(sub);
            sub.save();
            // Submission.updateOne({_id:submission_id, "submissions._id":list_id},{$set:{"submissions.filelink":sub.submissions[0].filelink, "submissions.filecloudlinks":sub.submissions[0].filecloudlinks, "submissions.filename":sub.submissions[0].filename}}).then((data)=>{
            //     resolve(data);
            // }).catch((err)=>{
            //     console.log("update err",err);
            //     reject(err);
            // })
        }).catch((err)=>{
            console.log("find err",err);
            reject(err);
        })
        // Submission.updateOne({_id:submission_id}, {$pull:{submissions:{}}})
    })
}

exports.removeLinkSubmission = (submission_id, list_id, link, linkText,index) => {
    return new Promise((resolve,reject)=>{
        Submission.findOne({_id:submission_id, "submissions._id":list_id,"submissions.link":{$in:["submissions.link",[link]]}}).then((sub)=>{
            console.log(sub);
            sub.submissions[0].link.splice(index,1);
            sub.submissions[0].linkText.splice(index,1);
            console.log(sub);
            sub.save();
            
        }).catch((err)=>{
            reject(err);
        })
        // Submission.updateOne({_id:submission_id}, {$pull:{submissions:{}}})
    })
}


exports.resetTextSubmission = (submission_id, list_id, text) => {
    return new Promise((resolve,reject)=>{
        Submission.findOne({_id:submission_id, "submissions._id":list_id}).then((sub)=>{
            console.log(sub);
            if(text==undefined || text.trim()!="")
            {
                delete sub.submissions[0].text;
            }
            else
            {
                sub.submissions[0].text = text;
            }
            console.log(sub);
            sub.save();
        }).catch((err)=>{
            reject(err);
        })
        // Submission.updateOne({_id:submission_id}, {$pull:{submissions:{}}})
    })
}