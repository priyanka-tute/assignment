// const { addResult } = require("../services/student");
const {
  fetchAssignmentBySubject,
  fetchAssignment,
  fetchAssignments,
} = require("../services/assignment");
// const {
//   getAssignmentsBySubject,
//   getAssignmentByStudents,
// } = require("../services/student");
exports.submitFeedback = (req, res) => {
  const review = req.body.review;
  const student_id = req.body.student_id;
  const subject_id = req.body.subject_id;
  const assignment_id = req.body.assignment_id;
  addResult(student_id, assignment_id, review, subject_id)
    .then((data) => {
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, error: err });
    });
};

exports.adminViewAssignmentsBySubject = async (req, res) => {
  const subject_id = req.query.subject_id;
  //   console
  // let assignments = [];
  // let aoids = [];
  await fetchAssignmentBySubject(subject_id).then((a) => {
    console.log("a..", a);
    // for (let i = 0; i < sa.length; i++) {
    //   aoids.push(sa[i].assignment_id);
    // }
    // fetchAssignments(aoids).then((assignments) => {
    //   assignments = assignments.map((assignment, index) => {
    //     return { ...sa[index], questions: assignment.questions };
    //   });
    // console.log("a..", assignments);
    res.send({ success: true, data: a });
  });
  // });
};

exports.adminViewAllAssignmentsBySubject = (req, res) => {
  const subject_id = req.body.subject_id;
  fetchAssignmentBySubject(subject_id).then((data) => {
    res.send({ success: true, data: data });
  });
};

exports.adminViewAssignmentByStudents = (req, res) => {
  const subject_id = req.query.subject_id;
  const assignment_id = req.query.assignment_id;

  getAssignmentByStudents(assignment_id, subject_id)
    .then((data) => {
      res.send({ success: true, data: data });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
};
