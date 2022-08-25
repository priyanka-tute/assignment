const { getAssignmentsBySubject, getAssignment, removeAssignment, modifyAssignment, putAssignment } = require("../controllers/assignment");

const router = require("express").Router();

router.get("/assignment/all",getAssignmentsBySubject);
router.get("/assignment",getAssignment);

router.post("/assignment",putAssignment);

router.put("/assignment",modifyAssignment);

router.delete("/assignment",removeAssignment);

module.exports = router;