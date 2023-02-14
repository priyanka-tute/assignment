// const mongoose = require("mongoose")

const { ObjectId } = require("mongodb");
const Submission = require("../models/Submission");
const { searchUserFromMysql } = require("./mysql");

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
    Submission.findByIdAndUpdate(submission_id,{$push:{submissions:submission},"status":"submitted"},{new:true}).then((data)=>{
        console.log("updated...");
        resolve(data);
    }).catch((err)=>{
        console.log("err...");
        reject(err);
    })
})
}

exports.getSubmissionsByStudentSubject = (student_id,subject_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id,subject_id}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsBySubject = (subject_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({subject_id}).populate("assignment_id").populate({ 
        path: 'assignment_id',
        populate: {
          path: 'subject_id',
          model: 'course'
        } 
     }).exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByStudent = (student_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getAllSubmissions = () => {
    return new Promise((resolve,reject)=>{
    Submission.find({}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getAllUnreviewedSubmissions = () => {
    return new Promise((resolve,reject)=>{
    Submission.find({"status":{"$in":["submitted","resubmit"]}}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByAssignmentStudent = (student_id,subject_id,assignment_id) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id,subject_id,assignment_id}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    })
})
}

exports.getSubmissionsByAssignmentStudentQuestion = (student_id,subject_id,assignment_id,question_no,question) => {
    return new Promise((resolve,reject)=>{
    Submission.find({student_id:student_id,subject_id:subject_id,assignemnt_is:assignment_id,"question.question":question,"question.question_no":question_no},{"submissions.filecloudlinks":0}).populate("assignment_id").populate("assignment_id.subject_id").exec().then((data)=>{
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

exports.addFileToSubmission = (submission_id, list_id, fileData) => {
    return new Promise((resolve,reject)=>{
        // Submission.aggregate([{
        //     $match:{_id:submission_id},
        //     $filter:{"submissions._id":list_id},   
        // }])
        Submission.findOne({_id:submission_id},{ "submissions":{"$elemMatch":{"_id":ObjectId(list_id)}}})
        .then((sub)=>{
            console.log("before committing....",sub,"\n",sub.submissions);
            sub.submissions[0].filelink.push.apply(sub.submissions[0].filelink, fileData.filelinks);
            sub.submissions[0].filename.push.apply(sub.submissions[0].filename, fileData.filename);
            sub.submissions[0].filecloudlinks.push.apply(sub.submissions[0].filecloudlinks, fileData.filecloudlinks);
            // console.log(sub);
            // sub.save();
            Submission.updateOne({"submissions":{"$elemMatch":{"_id":ObjectId(list_id)}}},{"submissions.$":sub.submissions[0]},{new:true}).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                console.log("update err",err);
                reject(err);
            })
            // resolve(sub);
        }).catch((err)=>{
            console.log("find err",err);
            reject(err);
        })
        // Submission.updateOne({_id:submission_id}, {$pull:{submissions:{}}})
    })
}

exports.addLinkToSubmission = (submission_id, list_id, linkData) => {
    return new Promise((resolve,reject)=>{
        // Submission.aggregate([{
        //     $match:{_id:submission_id},
        //     $filter:{"submissions._id":list_id},   
        // }])
        Submission.findOne({_id:submission_id},{ "submissions":{"$elemMatch":{"_id":ObjectId(list_id)}}})
        .then((sub)=>{
            console.log("before committing....",sub.submissions[0]._id);
            sub.submissions[0].link.push.apply(sub.submissions[0].link, linkData.link);
            sub.submissions[0].linkText.push.apply(sub.submissions[0].linkText, linkData.linkText);
            // console.log(sub);
            // sub.save();
            Submission.updateOne({_id:submission_id,"submissions":{"$elemMatch":{"_id":ObjectId(list_id)}}},{"submissions.$":sub.submissions[0]},{new:true}).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                console.log("update err",err);
                reject(err);
            })
            resolve(sub);
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

exports.addFeedback = (submission_id,list_id, review,resubmit,mentor) => {
    return new Promise((resolve,reject)=>{
        Submission.findOne({_id:submission_id, "submissions._id":list_id},
        {submissions:{$elemMatch:{_id:list_id}}}).then((sub)=>{
            console.log(sub);
            // sub.submissions[0].filelink.splice(index,1);
            // sub.submissions[0].filename.splice(index,1);
            // sub.submissions[0].filecloudlinks.splice(index,1);
            sub.submissions[0].review = review;
            sub.submissions[0].reviewDate = new Date();
            sub.submissions[0].reviewBy=mentor;
            if(resubmit!=undefined && resubmit)
            sub.status="resubmit";
            else
            sub.status = "completed";
            console.log(sub);
            Submission.updateOne({_id:submission_id},sub).then((data)=>{
            // Submission.updateOne({_id:submission_id, "submissions._id":list_id},{$set:{"submissions.filelink":sub.submissions[0].filelink, "submissions.$.filecloudlinks":sub.submissions[0].filecloudlinks, "submissions.$.filename":sub.submissions[0].filename}}).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        });
    });
}

exports.resetTextSubmission = (submission_id, list_id, text) => {
    return new Promise((resolve,reject)=>{
        Submission.findOne({_id:submission_id, "submissions._id":list_id}).then((sub)=>{
            console.log(sub);
            if(text==undefined || text.trim()=="")
            {
                delete sub.submissions[0].text;
            }
            else
            {
                sub.submissions[0].text = text;
            }
            console.log(sub);
            sub.save();
            resolve(sub);
        }).catch((err)=>{
            reject(err);
        })
        // Submission.updateOne({_id:submission_id}, {$pull:{submissions:{}}})
    })
}

exports.getMysqlStudentForEachSubmission = (data) => {
    return new Promise(async (resolve,reject)=>{
        let newData = JSON.parse(JSON.stringify(data));
        // let newData = data;
        // console.log(newData);
        for(let i=0;i<data.length;i++)
        {
            const student_id = newData[i].student_id;
            const student = await searchUserFromMysql(student_id).catch((err)=>{
                reject(err);
            });
            newData[i].student_name = student.name;
            // console.log(newData[i]);
        }
        resolve(newData);
    });
}