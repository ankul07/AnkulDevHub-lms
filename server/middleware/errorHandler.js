const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  // Default values for error status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  let error = { ...err };
  error.message = message;
  console.log(error);

  // Handle MongoDB CastError (Invalid ID)
  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
  }

  // Handle MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Get the field name causing the error
    const value = err.keyValue[field]; // Get the value causing the error
    const message = value
      ? `Duplicate value '${value}' found for field '${field}'. Please use a different value.`
      : `Duplicate value found for field '${field}'. Please provide a valid value.`;

    error = new AppError(message, 400);
  }

  // Handle Invalid JWT Error
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token. Please log in again.", 401);
  }

  // Handle Expired JWT Error
  if (err.name === "TokenExpiredError") {
    error = new AppError("Your token has expired. Please log in again.", 401);
  }

  // Custom Errors (Specific to Application)
  if (err.name === "CourseNotFound") {
    error = new AppError("The requested course could not be found.", 404);
  }

  if (err.name === "UserNotAuthorized") {
    error = new AppError("You are not authorized to perform this action.", 403);
  }

  // Send JSON Response
  res.status(error.statusCode || statusCode).json({
    success: false,
    message: error.message || message,
    error,
  });
};
