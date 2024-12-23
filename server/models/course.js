const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  credentials: String,
  imageUrl: String,
});

const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: String,
  url: String,
  duration: Number, // Duration in minutes for example
  description: String,
  notes: String, // Optional field for additional notes
  timestamps: [Number], // Optional: Timestamp points
});

const ModuleSchema = new mongoose.Schema({
  moduleTitle: String,
  topics: [{ title: String, description: String }], // Update as needed
  resources: [{ type: { type: String }, url: String }], // Corrected field type
  videos: [VideoSchema],
});

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const TestimonialSchema = new mongoose.Schema({
  student: String,
  review: String,
  rating: { type: Number, min: 1, max: 5 },
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  instructor: InstructorSchema,
  institution: String,
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  imageUrl: String,
  category: String,
  level: String,
  language: String,
  duration: String,
  contentFormat: [String],
  prerequisites: String,
  enrollments: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  status: String,
  certification: Boolean,
  syllabus: [String],
  modules: [ModuleSchema],
  learningObjectives: [String],
  assessmentMethods: [String],
  discussionForum: String,
  courseMaterials: [String],
  FAQs: [FAQSchema],
  testimonials: [TestimonialSchema],
  previewVideoUrl: String,
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
