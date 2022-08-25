const { resolve } = require("path");
const { dynamodb } = require("./aws_init");
exports.getAssignmentsByStudent = (req, res) => {
  console.log(req);
  const studentId = req.query.student_id;
  console.log("student_id = ", studentId);
  let params = {
    KeyConditionExpression: "student_id = :s",
    ExpressionAttributeValues: {
      ":s": {
        S: studentId,
      },
    },
    TableName: "student_assignments",
  };
  dynamodb.query(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.send({ success: false, error: err });
    } else {
      console.log(data);
      res.send({ success: true, data: data });
    }
  });
};

exports.getAssignmentsBySubject = (req, res) => {
  const assignemnt_id = req.query.assignment_id;
  let params = {
    FilterExpression: "assignment_id = :a",
    ExpressionAttributeValues: {
      ":a": {
        S: assignemnt_id,
      },
    },
    TableName: "student_assignments",
  };
  dynamodb.scan(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.send({ success: false, error: err });
    } else {
      console.log(data);
      res.send({ success: true, data: data });
    }
  });
};

exports.saveAssignment = (
  student_id,
  assignment_id,
  assignment_link,
  filename
) => {
  return new Promise(function (resolve, reject) {
    console.log(
      "student_id = ",
      student_id,
      "\nassignment_id = ",
      assignment_id
    );
    console.log("ass_link = ", assignment_link, "\nfname = ", filename);
    dynamodb.putItem(
      {
        Item: {
          student_id: {
            S: student_id,
          },
          assignment_id: {
            S: assignment_id,
          },
          assignment_link: {
            S: assignment_link,
          },
          filename: {
            S: filename,
          },
        },
        TableName: "student_assignments",
      },
      (err, data) => {
        if (err) {
          console.log(err, err.stack);
          reject(err);
          // res.send({ success: false, error: err });
        } else {
          console.log(data);
          resolve(data);
          // res.send({ success: true, data: data });
        }
      }
    );
  });
};

exports.addAssignment = (assignment_id, subject_id, questions) => {
  return new Promise((resolve, reject) => {
    dynamodb.putItem(
      {
        Item: {
          assignment_id: {
            S: assignment_id,
          },
          subject_id: {
            S: subject_id,
          },
          questions: {
            L: questions,
          },
        },
        TableName: "tutedude_assignments",
      },
      (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
