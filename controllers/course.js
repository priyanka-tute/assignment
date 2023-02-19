const { addCourse, getAllCourses, getCourse, modifyCourseById, deleteCourseById } = require("../services/course");

exports.addNewCourse = (req,res) => {
    const course = req.body.course;
    addCourse(course).then((data)=>{
        res.send({success:true,data:data});
    }).catch((err)=>{
        res.send({success:false, error:err});
    })
}

exports.fetchAllCourses = (req,res) => {
    getAllCourses().then((data)=>{
        res.send({success:true,data:data});
    }).catch((err)=>{
        res.send({success:false, error:err});
    })
}

exports.fetchCourse = (req,res) => {
    const course_id = req.body.course_id;
    console.log(course_id);
    getCourse(course_id).then((data)=>{
        res.send({success:true,data:data});
    }).catch((err)=>{
        res.send({success:false, error:err});
    })
}

exports.modifyCourse = (req,res) => {
    const course = req.body.course;
    const course_id = req.body.course_id;
    console.log("course = ",course,"\ncourse_id = ",course_id);
    modifyCourseById(course_id,course).then((data)=>{
        res.send({success:true,data:data});
    }).catch((err)=>{
        res.send({success:false, error:err});
    })
}

exports.deleteCourse = (req,res) => {
    const course_id = req.body.course_id;
    console.log("course_id = ",course_id);
    deleteCourseById(course_id).then((data)=>{
        res.send({success:true,data:data});
    }).catch((err)=>{
        res.send({success:false, error:err});
    })
}