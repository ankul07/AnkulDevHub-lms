import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

const Test = () => {
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);
  const DEFAULT_IMAGE =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWQ5snLzNeHXc8Bso4YCnGTf7WVV2_U74PA&s";
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result); // Set the preview image
    };
    reader.readAsDataURL(file); // Convert file to base64
    setImageFile(file);
    const formData = new FormData();
    formData.append("studentImage", file);
    try {
      dispatch(updateStudentImage(formData));
    } catch (error) {
      console.error("Error uploading image:", error);
      setPreviewImage(studentData?.studentImage || DEFAULT_IMAGE);
    }
  };

  return (
    <div className="relative">
      <img
        src={previewImage}
        alt="Profile"
        className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover"
      />
      <button
        aria-label="Upload profile picture"
        onClick={handleImageClick}
        className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
      >
        <FaCamera size={16} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default Test;
