const catchAsync = require("../middleware/catchAsync");
const Student = require("../models/student");
const AppError = require("../utils/appError");
const sendMail = require("../utils/sendmail");
const sendToken = require("../utils/token");
const validator = require("validator");
const crypto = require("crypto");
const {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} = require("../utils/cloudinaryHelpers");
const { deleteFile } = require("../utils/fileHelpers");
const path = require("path");

// Utility function to validate password strength
const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};
const registerStudent = catchAsync(async (req, res, next) => {
  const {
    studentName,
    username,
    mobileNumber,
    studentEmail,
    password,
    confirmPassword,
  } = req.body;

  // 1. Basic validation
  if (
    !studentName ||
    !username ||
    !mobileNumber ||
    !studentEmail ||
    !password ||
    !confirmPassword
  ) {
    return next(new AppError("All fields are required", 400));
  }
  // 2. Advanced validation
  if (!validator.isEmail(studentEmail)) {
    return next(new AppError("Please provide a valid email address", 400));
  }

  if (!validator.isMobilePhone(mobileNumber, "any")) {
    return next(new AppError("Please provide a valid mobile number", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }
  if (!isStrongPassword(password)) {
    return next(
      new AppError(
        "Password must be at least 8 characters long and contain uppercase, lowercase, numbers and special characters",
        400
      )
    );
  }
  if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return next(
      new AppError(
        "Username must be at least 3 characters and contain only letters, numbers and underscores",
        400
      )
    );
  }
  const existingUser = await Student.findOne({
    $or: [
      { username: username.toLowerCase() },
      { studentEmail: studentEmail.toLowerCase() },
    ],
  });

  if (existingUser) {
    return next(
      new AppError("Username or email already exists. Please try again.", 400)
    );
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const hashedEmailToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");

  const newStudent = await Student.create({
    studentName,
    username: username.toLowerCase(),

    mobileNumber,
    studentEmail: studentEmail.toLowerCase(),

    password,
    emailVerificationToken: hashedEmailToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    accountStatus: "inactive", // Requires email verification
  });

  try {
    const verificationURL = `http://localhost:5173/activation/${emailVerificationToken}`;

    await sendMail({
      email: studentEmail,
      subject: "Welcome! Please verify your email",
      message: `
        Please verify your email by clicking the link below:
        ${verificationURL}

        This link will expire in 24 hours.
        If you did not create an account, please ignore this email.
      `,
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${studentName},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationURL}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not create an account, please ignore this email.</p>
      `,
    });

    // 8. Send success response
    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
    });
  } catch (error) {
    // Rollback student creation if email fails
    await Student.findByIdAndDelete(newStudent._id);
    return next(
      new AppError("Error sending verification email. Please try again.", 500)
    );
  }
});
const verifyEmail = catchAsync(async (req, res, next) => {
  const { emailVerificationToken } = req.body;
  console.log(emailVerificationToken);
  if (!emailVerificationToken) {
    return next(new AppError("Verification token is missing", 400));
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken) // Ensure the variable name matches
    .digest("hex");

  // 2. Find student with the hashed token and valid expiration
  const student = await Student.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });
  console.log(student);

  // 3. Check if student exists
  if (!student) {
    return next(new AppError("Invalid or expired verification token", 400));
  }

  // 4. Update student's verification status and activate account
  student.isEmailVerified = true;
  student.accountStatus = "active";
  student.emailVerificationToken = undefined;
  student.emailVerificationExpires = undefined;
  await student.save({ validateBeforeSave: false });

  // 5. Send success response
  res.status(200).json({
    success: true,
    message: "Email verified successfully! Your account is now active.",
  });
});
const loginStudent = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError("Username and password are required!", 400));
  }
  const student = await Student.findOne({
    $or: [
      { username: username.toLowerCase() },
      { studentEmail: username.toLowerCase() },
    ],
  }).select("+password");

  if (!student) {
    return next(new AppError("Invalid username or email!", 401));
  }
  if (student.accountStatus !== "active") {
    return next(
      new AppError("Your account is not active. Please contact support.", 403)
    );
  }

  const isPasswordCorrect = await student.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid password!", 401));
  }

  student.lastLogin = new Date();
  await student.save();

  sendToken(student, 200, res);
});

const getStudentProfile = catchAsync(async (req, res) => {
  const studentId = req.student.id;

  const student = await Student.findById(studentId).select("-password");
  if (!student) {
    return next(new AppError("Student not found!", 404));
  }
  res.status(200).json({
    success: true,
    message: "Student profile retrieved successfully!",
    data: student,
  });
});

const updateStudentProfile = catchAsync(async (req, res, next) => {
  const studentId = req.student.id;
  if (!studentId) {
    return next(new AppError("Student ID is required", 400));
  }

  const allowedFields = {
    studentName: req.body.studentName,
    username: req.body.username,
    dob: req.body.dob,
    gender: req.body.gender,
    religion: req.body.religion,

    // Parent information
    parentName: req.body.parentName,
    parentEmail: req.body.parentEmail,
    parentContact: req.body.parentContact,

    // Education information
    degree: req.body.degree,
    institution: req.body.institution,

    // Contact information
    mobileNumber: req.body.mobileNumber,
    alternateContact: req.body.alternateContact,
    studentEmail: req.body.studentEmail,

    // Address information
    address: req.body.address,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    pincode: req.body.pincode,

    maritalStatus: req.body.maritalStatus,
  };

  // Remove undefined, null, or empty string fields
  Object.keys(allowedFields).forEach((key) => {
    if (
      allowedFields[key] === undefined ||
      allowedFields[key] === null ||
      allowedFields[key] === ""
    ) {
      delete allowedFields[key];
    }
  });

  // Special handling for enum fields - convert empty strings to null
  if (req.body.gender === "") {
    allowedFields.gender = null;
  }
  if (req.body.religion === "") {
    allowedFields.religion = null;
  }
  if (req.body.maritalStatus === "") {
    allowedFields.maritalStatus = null;
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    { $set: allowedFields },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!updatedStudent) {
    return next(new AppError("Student not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Student Profile Updated Successfully",
    data: updatedStudent,
  });
});

const uploadProfileImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please provide Student Image!", 400));
  }
  const studentId = req.student.id;
  if (!studentId) {
    return next(new AppError("Student ID is required", 400));
  }
  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError("Student not found", 404));
  }

  if (student.studentImage) {
    // Extract the public ID from the URL (Cloudinary URL format)
    const imagePublicId = student.studentImage.split("/").pop().split(".")[0];
    await deleteFileFromCloudinary(imagePublicId, "student_profiles");
  }

  const localImagePath = path.join(__dirname, "../uploads", req.file.filename);
  try {
    // Upload to Cloudinary
    const cloudinaryUrl = await uploadFileToCloudinary(
      localImagePath,
      "student_profiles"
    );

    // Update student image and save
    student.studentImage = cloudinaryUrl;
    await student.save({ validateBeforeSave: false });

    // Optionally delete local file after upload
    await deleteFile(localImagePath).catch((err) =>
      console.warn("Failed to delete local file:", err)
    );

    // Send the response once all operations are done
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
      data: student,
    });
  } catch (error) {
    await deleteFile(localImagePath).catch(console.warn);
    return next(new AppError("Image upload failed", 500));
  }
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { studentEmail } = req.body;
  if (!studentEmail) {
    return next(new AppError("Please provide your email!", 400));
  }

  const student = await Student.findOne({ studentEmail });
  if (!student) {
    return next(new AppError("No student found with that email!", 404));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  student.resetPasswordToken = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
  student.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await student.save({ validateBeforeSave: false });
  const message = `
    Hello ${student.studentName || "Student"},

    You have requested to reset your password. 
    Your password reset OTP is: ${otp}

    This OTP is valid for 10 minutes only.
    If you did not request this reset, please ignore this email and ensure your account is secure.

    Best regards,
    Your Application Team
  `.trim();
  try {
    await sendMail({
      email: student.studentEmail,
      subject: "Your password reset OTP",
      message,
    });
    res.status(200).json({
      success: true,
      message: "OTP sent to email!",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
const verifyOtp = catchAsync(async (req, res, next) => {
  const { studentEmail, otp } = req.body;
  console.log(req.body);
  if (!studentEmail || !otp) {
    return next(new AppError("Please provide email and OTP!", 400));
  }

  const student = await Student.findOne({ studentEmail });
  if (!student) {
    return next(new AppError("No student found with that email!", 404));
  }

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  if (student.resetPasswordToken !== hashedOtp) {
    return next(new AppError("Invalid OTP!", 400));
  }

  if (student.resetPasswordExpires < Date.now()) {
    return next(new AppError("OTP has expired!", 400));
  }

  // OTP is valid, so show the password reset page
  res.status(200).json({
    success: true,
    message: "OTP verified. You can now reset your password.",
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { studentEmail, newPassword, confirmPassword } = req.body;
  console.log(req.body);

  // Check if required fields are provided
  if (!studentEmail || !newPassword || !confirmPassword) {
    return next(new AppError("Please provide all required fields!", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError("Passwords do not match!", 400));
  }

  // Check password strength using the shared isStrongPassword function
  if (!isStrongPassword(newPassword)) {
    return next(
      new AppError(
        "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character",
        400
      )
    );
  }
  try {
    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return next(new AppError("No student found with that email!", 404));
    }

    if (
      !student.resetPasswordToken ||
      !student.resetPasswordExpires ||
      student.resetPasswordExpires < Date.now()
    ) {
      return next(
        new AppError(
          "OTP has expired or is invalid. Please request a new one.",
          400
        )
      );
    }
    student.password = newPassword;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpires = undefined;
    await student.save();
    res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    return next(new AppError(error, 500));
  }
});

const changePassword = catchAsync(async (req, res, next) => {
  const studentId = req.student?.id;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  // Check if required fields are provided
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return next(new AppError("All fields are required!", 400));
  }

  // Check if the new password and confirm password match

  if (oldPassword === newPassword) {
    return next(new AppError("Old and new passwords cannot be the same!", 400));
  }
  // Check password strength using the shared isStrongPassword function
  if (!isStrongPassword(newPassword)) {
    return next(
      new AppError(
        "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character",
        400
      )
    );
  }
  if (newPassword !== confirmNewPassword) {
    return next(new AppError("Passwords do not match!", 400));
  }
  // Find the student by email
  const student = await Student.findById(studentId).select("+password");
  if (!student) {
    return next(new AppError("No student found with that email!", 404));
  }

  // Check if the old password is correct
  const isOldPasswordCorrect = await student.comparePassword(oldPassword);
  if (!isOldPasswordCorrect) {
    return next(new AppError("Incorrect old password!", 400));
  }

  // Update the student's password (hashing will be done in pre-save hook)
  student.password = newPassword;

  // Save the updated student data
  await student.save();

  // Send success response
  res.status(200).json({
    success: true,
    message: "Password updated successfully!",
  });
});

const logout = catchAsync(async (req, res, next) => {
  const studentId = req.student.id;
  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError("Student not found", 404));
  }
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.status(200).cookie("studentToken", null, options).json({
    message: "user successfully logout",
    success: true,
  });
});

module.exports = {
  registerStudent,
  verifyEmail,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
  verifyOtp,
  changePassword,
  logout,
};
