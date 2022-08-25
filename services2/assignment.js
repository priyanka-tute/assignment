// const { resolve } = require("path");
const db = require("./mongo");
const ObjectId = require("mongodb").ObjectId;
var assignment;
db.initialize(process.env.DB_NAME, "assignments", (data) => {
  console.log("Successfully connected to database...");
  assignment = data;
});

exports.addAssignment = (subject_id, questions) => {
  return new Promise((resolve, reject) => {
    assignment.insertOne(
      { subject_id: subject_id, questions: questions },
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.fetchAssignmentBySubject = (subject_id) => {
  return new Promise((resolve, reject) => {
    console.log("subject_id in fAbS..", subject_id);
    assignment.find({ subject_id: subject_id }).toArray((err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else resolve(result);
    });
  });
};

exports.fetchAssignment = (assignment_id) => {
  console.log("fetchAssignment..", assignment_id);
  // console.log("ass..", assignment);
  return new Promise((resolve, reject) => {
    assignment.findOne({ _id: new ObjectId(assignment_id) }).then((data) => {
      console.log("fo data = ", data);
    });
  });
};
exports.updateAssignment = (subject_id, assignment_id, questions) => {
  return new Promise((resolve, reject) => {
    assignment.updateOne(
      { id: assignment_id },
      { $set: { subject_id: subject_id, questions: questions } },
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else resolve(result);
      }
    );
  });
};

exports.deleteAssignment = (assignment_id) => {
  return new Promise((resolve, reject) => {
    assignment.deleteOne({ id: assignment_id }, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      } else resolve(result);
    });
  });
};

exports.fetchAssignments = (assignment_id_list) => {
  console.log("fa..", assignment_id_list);
  return new Promise((resolve, reject) => {
    const newList = assignment_id_list.map((a) => {
      return new ObjectId(a);
    });
    const a = assignment
      .find({ _id: { $in: newList } })
      .toArray((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else resolve(result);
      });

    // console.log("a..", a);
  });
};
