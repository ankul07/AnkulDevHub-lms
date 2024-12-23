const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const { uploadCourseDataToMongoDB } = require("./controller/courseController");

app.use(
  cors({
    origin: [
      "https://ankul-dev-hub-lms.vercel.app",
      "https://ankul-dev-hub-lms-mw3l.vercel.app",
      "https://ankul-dev-hub-lms-mw3l-kkzrkh54l-ankul07s-projects.vercel.app",
    ],
    credentials: true, // For allowing cookies, authorization headers
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const user = require("./routes/userRoutes");
const courses = require("./routes/courseRoutes");

app.use("/api/v2/user", user);
app.use("/api/v2/courses", courses);

app.use(errorHandler);
// uploadCourseDataToMongoDB();
module.exports = app;
