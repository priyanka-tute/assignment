const { fetchAllCourses, fetchCourse, modifyCourse, addNewCourse, deleteCourse } = require("../controllers/course");

const router = require("express").Router();

router.get("/course/all",fetchAllCourses);
router.get("/course",fetchCourse);

router.post("/course",addNewCourse);

router.put("/course",modifyCourse);

router.delete("/course",deleteCourse);

module.exports = router;