const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const QuestionSchema = new Schema({
  question_no:Number,
  points:Number,
  question:String,
  instructions:String,
  addedBy:{type:ObjectId, ref:"instructor"},
},{timestamps:{
  createdAt: 'addDate',
  updatedAt: 'updatedAt'
}});

const AssignmentSchema = new Schema({
 subject_id:Number,
 questions:[QuestionSchema],
 topic:{default:"Topic",type:String},
 addedBy:{type:ObjectId, ref:"instructor"},
},{
    timestamps: {
        createdAt: 'addDate',
        updatedAt: 'updatedAt'
    }
  });

const Assignment = mongoose.model('assignment',AssignmentSchema);
module.exports = {Assignment,QuestionSchema};
