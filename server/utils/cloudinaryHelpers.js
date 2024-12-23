const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

const uploadFileToCloudinary = async (localImagePath, folderName) => {
  try {
    if (!fs.existsSync(localImagePath)) {
      throw new Error(`File not found: ${localImagePath}`);
    }
    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: folderName,
      // resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading to Cloudinary: " + error.message);
  }
};

const deleteFileFromCloudinary = async (publicId, folderName) => {
  try {
    // Add folder name in the public ID path
    const result = await cloudinary.uploader.destroy(
      `${folderName}/${publicId}`
    );
    if (result.result !== "ok") {
      throw new Error("Failed to delete file from Cloudinary");
    }
  } catch (error) {
    throw new Error("Error deleting from Cloudinary: " + error.message);
  }
};

module.exports = { uploadFileToCloudinary, deleteFileFromCloudinary };
