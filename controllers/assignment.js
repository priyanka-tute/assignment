const {
  addAssignment,
  fetchAssignmentsBySubject,
  fetchAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../services/Assignment");

exports.putAssignment = (req, res) => {
  console.log(req.body); 
  addAssignment(req.body.subject_id, req.body["questions"], req.body["topic"], req.body["mentor"])
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
};

exports.getAssignment = (req, res) => {
  fetchAssignment(req.query.assignment_id)
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
}; 

exports.getAssignmentsBySubject = (req, res) => {
  fetchAssignmentsBySubject(req.query.subject_id)
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
};

exports.removeAssignment = (req, res) => {
  deleteAssignment(req.body.assignment_id)
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
};

exports.modifyAssignment = (req, res) => {
  updateAssignment(
    req.body.subject_id,
    req.body.assignment_id,
    req.body["questionSet[]"]
  )
    .then((result) => {
      res.send({ success: true, data: result });
    })
    .catch((err) => {
      res.send({ success: false, error: err });
    });
};
