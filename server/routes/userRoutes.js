const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
  verifyOtp,
  changePassword,
  logout,
  verifyEmail,
} = require("../controller/studentController");

const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

// Student Registration Route
router.post("/register", registerStudent); // POST /api/students/register
router.post("/verify-email", verifyEmail);

// Student Login Route
router.post("/login", loginStudent); // POST /api/students/login

// Get Student Profile Route (Protected)
router.get("/profile", isAuthenticated, getStudentProfile); // GET /api/students/profile

// Update Student Profile Route (Protected)
router.put("/profile", isAuthenticated, updateStudentProfile); // PUT /api/students/profile

router.put(
  "/profile-image",
  isAuthenticated,
  upload.single("studentImage"),
  uploadProfileImage
);

// Forgot Password Route
router.post("/forgot-password", forgotPassword); // POST /api/students/forgot-password
router.post("/verify-otp", verifyOtp);

// Reset Password Route
router.put("/reset-password", resetPassword);
router.put("/change-password", isAuthenticated, changePassword); // PUT /api/students/reset-password/:token
router.get("/logout", isAuthenticated, logout);

module.exports = router;
