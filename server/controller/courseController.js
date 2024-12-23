const Course = require("../models/course");
const catchAsync = require("../middleware/catchAsync");
const AppError = require("../utils/appError");
const CourseData = require("../data.json");

const uploadCourseDataToMongoDB = catchAsync(async (req, res, next) => {
  try {
    if (!Array.isArray(CourseData) || CourseData.length === 0) {
      return next(
        new AppError("data.json must contain an array of objects.", 400)
      );
    }

    await Course.deleteMany({});
    console.log("Existing data cleared.");
    await Course.insertMany(CourseData);
    console.log("Data uploaded successfully.");

    res.status(200).json({
      status: "success",
      message: "Course data uploaded successfully to MongoDB.",
    });
  } catch (error) {
    return next(
      new AppError(`Failed to upload course data: ${error.message}`, 500)
    );
  }
});

const allCourse = catchAsync(async (req, res, next) => {
  let query = {};

  // Handle search query
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  // Handle category filter
  if (req.query.category) {
    const categories = req.query.category.split(",");
    query.category = { $in: categories };
  }

  // Handle level filter
  if (req.query.level) {
    const levels = req.query.level.split(",");
    query.level = { $in: levels };
  }

  // Handle language filter
  if (req.query.language) {
    const languages = req.query.language.split(",");
    query.language = { $in: languages };
  }

  // Handle price range filter
  if (req.query.priceRange) {
    const priceRanges = req.query.priceRange.split(",");
    const priceQuery = [];

    priceRanges.forEach((range) => {
      switch (range) {
        case "Free":
          priceQuery.push({ price: { $eq: 0 } });
          break;
        case "0 - 500":
          priceQuery.push({ price: { $gte: 0, $lt: 500 } });
          break;
        case "501 - 1000":
          priceQuery.push({ price: { $gte: 501, $lt: 1000 } });
          break;
        case "1000+":
          priceQuery.push({ price: { $gt: 1000 } });
          break;
        default:
          break;
      }
    });

    if (priceQuery.length > 0) {
      query.$or = priceQuery;
    }
  }

  // Add logging for query
  console.log("Applied Filters:", req.query);
  console.log("MongoDB Query:", JSON.stringify(query, null, 2));

  // Fetch filtered courses
  const courses = await Course.find(query).limit(10);

  // If no courses found, send 404 response
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No courses found matching your criteria",
    });
  }

  // Send response with filtered courses
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
});
module.exports = {
  allCourse,
  uploadCourseDataToMongoDB,
};
