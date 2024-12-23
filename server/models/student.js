const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    dob: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other", "prefer_not_to_say"],
        message: "{VALUE} is not a valid gender option",
      },
      default: "prefer_not_to_say",
    },
    religion: {
      type: String,
      trim: true,
      enum: {
        values: ["Hindu", "Muslim", "Christian", "Other", "prefer_not_to_say"],
        message: "{VALUE} is not a valid religion option",
      },
      default: "prefer_not_to_say",
      maxlength: [30, "Religion cannot exceed 30 characters"],
    },
    studentImage: {
      type: String,
    },
    // Parent Information
    parentName: {
      type: String,
      trim: true,
      maxlength: [50, "Parent name cannot exceed 50 characters"],
    },
    parentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      // validate: [validator.isEmail, "Please provide a valid email"],
    },
    parentContact: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\+?[\d\s-]+$/.test(v);
        },
        message: "Please provide a valid contact number",
      },
    },
    // Education Information
    degree: {
      type: String,
      trim: true,
      maxlength: [100, "Degree name cannot exceed 100 characters"],
    },
    institution: {
      type: String,
      trim: true,
      maxlength: [100, "Institution name cannot exceed 100 characters"],
    },
    // Contact Information
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{9,14}$/.test(v); // Allows international numbers in E.164 format
        },
        message: "Please provide a valid mobile number",
      },
    },
    alternateContact: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\+?[\d\s-]+$/.test(v);
        },
        message: "Please provide a valid contact number",
      },
    },
    studentEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [50, "Address cannot exceed 50 characters"],
    },
    country: {
      type: String,
      trim: true,
      maxlength: [50, "Country name cannot exceed 50 characters"],
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, "State name cannot exceed 50 characters"],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    pincode: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\d{5,10}$/.test(v);
        },
        message: "Please provide a valid pincode",
      },
    },
    // Other Information
    maritalStatus: {
      type: String,
      enum: {
        values: [
          "Single",
          "Married",
          "Divorced",
          "Widowed",
          "prefer_not_to_say",
        ],
        message: "{VALUE} is not a valid marital status",
      },
      default: "prefer_not_to_say",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Excludes password from queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["instructor", "student", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "student",
    },
    // Security and Status
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordChangedAt: Date,

    // Verification Tokens
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

studentSchema.virtual("age").get(function () {
  if (!this.dob) return null;
  return Math.floor(
    (new Date() - new Date(this.dob)) / (365.25 * 24 * 60 * 60 * 1000)
  );
});
// Pre-save hook for hashing password
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// jwt token
studentSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
// Method to compare password
studentSchema.methods.comparePassword = async function (oldPassword) {
  return await bcrypt.compare(oldPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
