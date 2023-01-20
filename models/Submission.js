const mongoose = require("mongoose");
const {QuestionSchema} = require("./Assignment");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SubmissionSchema = new Schema({
 student_id: Number,
 assignment_id:{type:ObjectId,ref:"assignment"},
 subject_id:Number,
 question: QuestionSchema,
 status : {type:String,default:"submitted"},
 submissions: [new Schema(
    {
      attempt: Number,
      filelink: [],
      filename: [],
      filecloudlinks:[],
      link: [],
      text: String,
      linkText:[],
      review:new Schema(
        {
          filelink: [],
          filename: [],
          filecloudlinks:[],
          link: [],
          text: String,
          linkText:[],
        }
      ),
      reviewBy:{type:ObjectId, ref:"instructor"},
      reviewDate:Date,
    },{timestamps:{
        createdAt: 'addDate',
        updatedAt: 'updatedAt'
      }}),]
});

const Submission = mongoose.model('student_assignment',SubmissionSchema);
module.exports = Submission;
