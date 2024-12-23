const AppError = require("../utils/appError");
const catchAsync = require("../middleware/catchAsync");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { studentToken } = req.cookies;

  if (!studentToken) {
    return next(new AppError("Please login to continue", 401));
  }

  jwt.verify(studentToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(new AppError("Token expired, please login again", 401));
      }
      return next(new AppError("Invalid token", 403));
    }

    req.student = await Student.findById(decoded.id);

    if (!req.student) {
      return next(new AppError("Student not found!", 404));
    }

    next();
  });
});
