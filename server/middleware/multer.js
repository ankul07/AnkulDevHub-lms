const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Define the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);

    let prefix = "";
    if (file.mimetype.startsWith("image/")) {
      prefix = "image";
    } else if (file.mimetype.startsWith("video/")) {
      prefix = "video";
    } else if (file.mimetype.startsWith("application/")) {
      prefix = "document";
    }

    cb(null, `${prefix}-${originalName}-${uniqueSuffix}${extension}`);
  },
});

// File filter to allow specific types of files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|avi|mkv|pdf|doc|docx|ppt|pptx/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: File type not supported!"));
  }
};

// Export the multer upload middleware
exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
