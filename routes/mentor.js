const { loginMentor } = require("../controllers/auth");
const { fetchAllSubmissions, fetchSubmissionsByStudent, fetchSubmissionsBySubject, fetchSubmissionsByStudentSubject, addMentorFeedback, addAssignment, getPendingSubmissions } = require("../controllers/mentor");

const router = require("express").Router();

router.get("/submission",fetchAllSubmissions);

router.get("/submission/subject",fetchSubmissionsBySubject);

router.get("/submission/student",fetchSubmissionsByStudent);

router.get("/submission/student/subject",fetchSubmissionsByStudentSubject);

router.post("/submission/feedback",addMentorFeedback);

router.post("/assignment",addAssignment);

router.get("/submission/pending",getPendingSubmissions);

router.post("/login",loginMentor);

module.exports = router;