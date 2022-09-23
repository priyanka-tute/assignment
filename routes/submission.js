const { resubmit, deleteFile } = require("../controllers/student");

const router = require("express").Router();

// router.post("/submit");

// router.get("/submissions");

// router.put("/submit")

// router.delete("/submission");

router.post("/resubmit",resubmit);

router.delete("/submission/file",deleteFile);

// router.put("/attempt");

module.exports = router;