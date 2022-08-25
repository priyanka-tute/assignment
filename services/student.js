const db = require("./mongo");
var studentAssignment;
db.initialize(process.env.DB_NAME, "student_assignments", (data) => {
  console.log("Successfully connected to database...");
  studentAssignment = data;
});

exports.saveAssignment = (student_id, assignment_id, solutions, subject_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment.insertOne(
      {
        student_id: student_id,
        assignment_id: assignment_id,
        solutions: solutions,
        subject_id: subject_id,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
};

exports.getAssignmentsByStudent = (student_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment
      .find({ student_id: student_id })
      .toArray((err, result) => {
        if (err) {
          //   console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.getAssignmentsBySubject = (subject_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment
      .find({ subject_id: subject_id })
      .toArray((err, result) => {
        if (err) {
          //   console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

exports.getAssignmentsByStudentSubject = (student_id, subject_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment
      .find({ student_id: student_id, subject_id: subject_id })
      .toArray((err, result) => {
        if (err) {
          //   console.log(err);
          reject(err);
        } else {
          console.log("ss..", result);
          resolve(result);
        }
      });
  });
};

exports.addResult = (student_id, assignment_id, results, subject_id) => {
  /*
  review = [{correct:true/false, feedback:...}]
  */
  return new Promise((resolve, reject) => {
    studentAssignment.updateOne(
      { id: assignment_id },
      { $set: { review: results } },
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        } else resolve(result);
      }
    );
  });
};

exports.getAssignmentByStudents = (assignment_id, subject_id) => {
  return new Promise((resolve, reject) => {
    studentAssignment
      .find({ subject_id: subject_id, assignment_id: assignment_id })
      .toArray((err, result) => {
        if (err) {
          //   console.log(err);
          reject(err);
        } else {
          console.log("AbyS..", result);
          resolve(result);
        }
      });
  });
};
