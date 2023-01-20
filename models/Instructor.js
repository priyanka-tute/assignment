const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
  first_name:{type:String, required:true},
  last_name:String,
  email:{type:String,unique:true},
  phone:{type:String, unique:true}
},{timestamps:{
  createdAt: 'addDate',
  updatedAt: 'updatedAt'
}});

const Instructor = mongoose.model('instructor',InstructorSchema);
module.exports = Instructor;