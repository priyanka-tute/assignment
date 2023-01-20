const {Assignment} = require("../models/Assignment");

exports.fetchAssignmentsBySubject = (subject_id) => {
    return new Promise((resolve,reject)=>{
        Assignment.find({subject_id:subject_id}).then((data)=>{
            console.log(data);
            resolve(data);
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}

exports.fetchAssignment = (assignment_id) => {
    return new Promise((resolve,reject)=>{
        Assignment.findById({_id:assignment_id}).exec().then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.deleteAssignment = (assignment_id) => {
    return new Promise((resolve,reject)=>{
        Assignment.deleteOne({_id:assignment_id}).exec().then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.updateAssignment = (subject_id,assignment_id,questions) => {
    return new Promise((resolve,reject)=>{
        Assignment.findByIdAndUpdate(assignment_id,{subject_id:subject_id,questions:questions}).exec().then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.addAssignment = (subject_id,questions,addedBy,topic) => {
    return new Promise((resolve,reject)=>{
        var a = new Assignment({
            subject_id:subject_id,
            questions:questions,
            addedBy:addedBy,
            topic:topic
        });
        console.log(a);
        a.save(function(err,data){
            if (err){
                console.log(err);
                reject(err);
            }
            else{
                console.log("saved data = ",data);
                resolve(data);            }
        });
    })
}