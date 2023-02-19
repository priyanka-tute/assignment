const {Course} = require("../models/Course");

exports.getAllCourses = () => {
    return new Promise((resolve, reject)=>{
        Course.find({}).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.getCourse = (course_id) => {
    return new Promise((resolve, reject)=>{
        Course.findById(course_id).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.addCourse = (course) => {
    return new Promise((resolve, reject)=>{
        const c = new Course({
            course_name:course.course_name
        });
        c.save().then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.modifyCourseById = (course_id,course) => {
    return new Promise((resolve, reject)=>{
        Course.findByIdAndUpdate(course_id,course).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}

exports.deleteCourseById = (course_id) => {
    return new Promise((resolve, reject)=>{
        Course.deleteOne({_id:course_id}).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        })
    })
}