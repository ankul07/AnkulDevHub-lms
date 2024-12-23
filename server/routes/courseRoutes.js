const { allCourse } = require("../controller/courseController");

const router = require("express").Router();

router.get("/", allCourse);

module.exports = router;
