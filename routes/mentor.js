const { fetchAllSubmissions, fetchSubmissionsByStudent, fetchSubmissionsBySubject, fetchSubmissionsByStudentSubject, addMentorFeedback } = require("../controllers/mentor");

const router = require("express").Router();

router.get("/submission",fetchAllSubmissions);

router.get("/submission/subject",fetchSubmissionsBySubject);

router.get("/submission/student",fetchSubmissionsByStudent);

router.get("/submission/student/subject",fetchSubmissionsByStudentSubject);

router.post("/submission/feedback",addMentorFeedback);

module.exports = router;