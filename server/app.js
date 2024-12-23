const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const { uploadCourseDataToMongoDB } = require("./controller/courseController");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
