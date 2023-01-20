const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CourseSchema = new Schema({
 course_name:{type:String,required:true},
},{
    timestamps: {
        createdAt: 'addDate',
        updatedAt: 'updatedAt'
    }
  });

const Course = mongoose.model('course',CourseSchema);
module.exports = Course;
