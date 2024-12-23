import React, { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaUserFriends,
  FaGraduationCap,
  FaPhone,
  FaEllipsisH,
  FaEdit,
  FaSave,
  FaTimes,
  FaEnvelope,
  FaCalendar,
  FaMapMarkerAlt,
  FaHashtag,
  FaCamera,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent, updateStudentImage } from "../../redux/auth/authAction";
// import { Country, State, City } from "country-state-city";
import { clearError, clearSuccess } from "../../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// constants.js
export const DEFAULT_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWQ5snLzNeHXc8Bso4YCnGTf7WVV2_U74PA&s";

export const TABS = [
  { id: "personal", name: "Personal", icon: FaUser },
  { id: "parent", name: "Parent", icon: FaUserFriends },
  { id: "educational", name: "Educational", icon: FaGraduationCap },
  { id: "contact", name: "Contact", icon: FaPhone },
  { id: "other", name: "Other", icon: FaEllipsisH },
];

export const FORM_FIELDS = {
  personal: [
    { name: "studentName", label: "Student Name", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other,prefer_not_to_say"],
    },
    {
      name: "religion",
      label: "Religion",
      type: "select",
      options: ["Hindu", "Muslim", "Christian", "Other"],
    },
  ],
  parent: [
    { name: "parentName", label: "Parent Name", type: "text" },
    { name: "parentEmail", label: "Parent Email", type: "email" },
    { name: "parentContact", label: "Parent Contact", type: "text" },
  ],
  educational: [
    { name: "degree", label: "Degree", type: "text" },
    { name: "institution", label: "Institution", type: "text" },
  ],
  contact: [
    { name: "mobileNumber", label: "Mobile Number", type: "text" },
    { name: "alternateContact", label: "Alternate Contact", type: "text" },
    { name: "studentEmail", label: "Student Email", type: "email" },
    { name: "address", label: "Address", type: "text" },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: ["India", "USA", "UK", "Other"],
    },
    { name: "state", label: "State", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
  ],
  other: [
    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "prefer_not_to_say",
      ],
    },
  ],
};

// components/FormField.js
const FormField = ({ field, value, onChange, disabled }) => {
  const { name, label, type, options } = field;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );
};

// components/ProfileImage.js
const ProfileImage = ({ previewImage, handleImageChange, fileInputRef }) => (
  <div className="relative">
    <img
      src={previewImage}
      alt="Profile"
      className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover"
    />
    <label
      htmlFor="studentImageInput"
      aria-label="Upload profile picture"
      className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors cursor-pointer"
    >
      <FaCamera size={16} />
    </label>
    <input
      type="file"
      id="studentImageInput"
      ref={fileInputRef}
      onChange={handleImageChange}
      className="hidden"
      accept="image/*"
    />
  </div>
);

// components/ProfileInfo.js
const ProfileInfo = ({ formData }) => {
  const infoItems = [
    { icon: FaHashtag, value: formData.id, fallback: "Registration not set" },
    {
      icon: FaEnvelope,
      value: formData.studentEmail,
      fallback: "Email not set",
    },
    { icon: FaCalendar, value: formData.dob, fallback: "DOB not set" },
    { icon: FaPhone, value: formData.mobileNumber, fallback: "Phone not set" },
    {
      icon: FaMapMarkerAlt,
      value: formData.address,
      fallback: "Address not set",
    },
  ];

  return (
    <div className="w-full space-y-3 text-gray-600 text-sm sm:text-base">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <item.icon className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{item.value || item.fallback}</span>
        </div>
      ))}
    </div>
  );
};

// DashboardProfile.js
const DashboardProfile = () => {
  const dispatch = useDispatch();
  const { student, error, message, success } = useSelector(
    (state) => state.student
  );
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState({});
  // const [studentData, setstudentData] = useState(student);

  useEffect(() => {
    if (student) {
      const initialFormData = Object.keys(FORM_FIELDS).reduce((acc, tabKey) => {
        FORM_FIELDS[tabKey].forEach((field) => {
          acc[field.name] = student[field.name] || "";
        });
        return acc;
      }, {});
      setFormData(initialFormData);
      setUnsavedChanges({}); // Reset unsaved changes
      setPreviewImage(student.studentImage || DEFAULT_IMAGE);
    }
  }, [student]);

  useEffect(() => {
    if (error) {
      toast.error(message || "An error occurred!");
      dispatch(clearError());
    }
    if (success) {
      // Update local state with saved changes
      setFormData((prev) => ({ ...prev, ...unsavedChanges }));
      setUnsavedChanges({});
      setIsEditing(false);
      toast.success(message);
      dispatch(clearSuccess());
    }
  }, [error, success, message, dispatch, unsavedChanges]);

  // useEffect(() => {
  //   if (studentData) {
  //     const initialFormData = Object.keys(FORM_FIELDS).reduce((acc, tabKey) => {
  //       FORM_FIELDS[tabKey].forEach((field) => {
  //         acc[field.name] = studentData[field.name] || "";
  //       });
  //       return acc;
  //     }, {});
  //     setFormData(initialFormData);
  //     setUnsavedChanges({}); // Reset unsaved changes
  //     setPreviewImage(studentData.studentImage || DEFAULT_IMAGE);
  //   }
  // }, [studentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnsavedChanges((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const updatedFormData = { ...formData, ...unsavedChanges };
  //   try {
  //     await dispatch(
  //       updateStudent(updatedFormData, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //     );
  //     // console.log(updatedFormData);
  //     setFormData(updatedFormData);
  //     setUnsavedChanges({});
  //     setIsEditing(false);
  //     console.log("Form submitted:", updatedFormData); // Only log on form submit
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData, ...unsavedChanges };
    try {
      await dispatch(updateStudent(updatedFormData));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("studentImage", file);
    dispatch(updateStudentImage(formData));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUnsavedChanges({}); // Reset unsaved changes
  };

  const renderTabContent = () => {
    const fields = FORM_FIELDS[activeTab];
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={
              unsavedChanges[field.name] !== undefined
                ? unsavedChanges[field.name]
                : formData[field.name]
            }
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <ToastContainer />
      <form
        className="bg-white rounded-lg shadow-sm"
        onSubmit={handleFormSubmit}
      >
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center p-4 sm:p-6 border-b gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaEdit className="text-sm sm:text-base" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <FaSave /> Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
          {/* Left Profile Section */}
          <div className="flex flex-col items-center space-y-4 p-4 sm:p-6 border rounded-lg">
            <ProfileImage
              previewImage={previewImage}
              handleImageChange={handleImageChange}
              fileInputRef={fileInputRef}
            />
            <h2 className="text-lg sm:text-xl font-semibold text-center">
              {formData.studentName || "Student Name"}
            </h2>
            <ProfileInfo formData={formData} />
          </div>

          {/* Right Content Section */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide border-b">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">{renderTabContent()}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;

/*=======================
=====================
===============================
==================================
=========================== fake */

// const DashboardProfile = () => {
//   const dispatch = useDispatch();
//   const studentData = useSelector((state) => state.student?.student);
//   const [activeTab, setActiveTab] = useState("Personal");
//   const [isEditing, setIsEditing] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");
//   const fileInputRef = useRef(null);

//   const DEFAULT_IMAGE =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWQ5snLzNeHXc8Bso4YCnGTf7WVV2_U74PA&s";

//   const [formData, setFormData] = useState({
//     _id: "",
//     studentName: "",
//     username: "",
//     dob: "",
//     gender: "",
//     religion: "",
//     parentName: "",
//     parentEmail: "",
//     parentContact: "",
//     degree: "",
//     institution: "",
//     mobileNumber: "",
//     alternateContact: "",
//     studentEmail: "",
//     address: "",
//     country: "",
//     state: "",
//     city: "",
//     pincode: "",
//     maritalStatus: "",
//   });

//   const handleTabClick = (tabName, event) => {
//     event.preventDefault(); // Prevent default behavior of form submission
//     setActiveTab(tabName);
//   };

//   // Initialize form data and image when studentData changes
//   useEffect(() => {
//     if (studentData) {
//       setFormData({
//         _id: studentData._id || "",
//         studentName: studentData.studentName || "",
//         username: studentData.username || "",
//         dob: studentData.dob || "",
//         gender: studentData.gender || "",
//         religion: studentData.religion || "",
//         parentName: studentData.parentName || "",
//         parentEmail: studentData.parentEmail || "",
//         parentContact: studentData.parentContact || "",
//         degree: studentData.degree || "",
//         institution: studentData.institution || "",
//         mobileNumber: studentData.mobileNumber || "",
//         alternateContact: studentData.alternateContact || "",
//         studentEmail: studentData.studentEmail || "",
//         address: studentData.address || "",
//         country: studentData.country || "",
//         state: studentData.state || "",
//         city: studentData.city || "",
//         pincode: studentData.pincode || "",
//         maritalStatus: studentData.maritalStatus || "",
//       });

//       // Set profile image
//       setPreviewImage(studentData.studentImage || DEFAULT_IMAGE);
//     }
//   }, [studentData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const newFormData = {
//         ...prev,
//         [name]: value,
//       };

//       return newFormData;
//     });
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         headers: {
//           // Add any necessary headers here, for example, content type
//           "Content-Type": "application/json",
//         },
//       };
//       await dispatch(updateStudent(formData, config));
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     // // Preview the image
//     const reader = new FileReader();
//     reader.onload = () => {
//       setPreviewImage(reader?.result);
//     };
//     reader.readAsDataURL(file);
//     setImageFile(file);
//     const formData = new FormData();
//     formData.append("studentImage", file);
//     try {
//       dispatch(updateStudentImage(formData));
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setPreviewImage(studentData?.studentImage || DEFAULT_IMAGE);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setFormData({
//       _id: studentData._id || "",
//       studentName: studentData.studentName || "",
//       username: studentData.username || "",
//       dob: studentData.dob || "",
//       gender: studentData.gender || "",
//       religion: studentData.religion || "",
//       parentName: studentData.parentName || "",
//       parentEmail: studentData.parentEmail || "",
//       parentContact: studentData.parentContact || "",
//       degree: studentData.degree || "",
//       institution: studentData.institution || "",
//       mobileNumber: studentData.mobileNumber || "",
//       alternateContact: studentData.alternateContact || "",
//       studentEmail: studentData.studentEmail || "",
//       address: studentData.address || "",
//       country: studentData.country || "",
//       state: studentData.state || "",
//       city: studentData.city || "",
//       pincode: studentData.pincode || "",
//       maritalStatus: studentData.maritalStatus || "",
//     });
//     setPreviewImage(studentData?.studentImage || DEFAULT_IMAGE);
//   };

//   const tabs = [
//     { name: "Personal", icon: <FaUser /> },
//     { name: "Parent", icon: <FaUserFriends /> },
//     { name: "Educational", icon: <FaGraduationCap /> },
//     { name: "Contact", icon: <FaPhone /> },
//     { name: "Other", icon: <FaEllipsisH /> },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Personal":
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Student Name
//               </label>
//               <input
//                 type="text"
//                 name="studentName"
//                 value={formData.studentName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter student name"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter username"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Religion
//               </label>
//               <select
//                 name="religion"
//                 value={formData.religion}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select religion</option>
//                 <option value="Hindu">Hindu</option>
//                 <option value="Muslim">Muslim</option>
//                 <option value="Christian">Christian</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//         );

//       case "Parent":
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parent Name
//               </label>
//               <input
//                 type="text"
//                 name="parentName"
//                 value={formData.parentName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter parent name"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parent Email
//               </label>
//               <input
//                 type="email"
//                 name="parentEmail"
//                 value={formData.parentEmail}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter parent email"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Parent Contact
//               </label>
//               <input
//                 type="text"
//                 name="parentContact"
//                 value={formData.parentContact}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter parent contact"
//               />
//             </div>
//           </div>
//         );

//       case "Educational":
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Degree
//               </label>
//               <input
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter degree"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Institution
//               </label>
//               <input
//                 type="text"
//                 name="institution"
//                 value={formData.institution}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter institution"
//               />
//             </div>
//           </div>
//         );

//       case "Contact":
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter mobile number"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Alternate Contact
//               </label>
//               <input
//                 type="text"
//                 name="alternateContact"
//                 value={formData.alternateContact}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter alternate contact"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Student Email
//               </label>
//               <input
//                 type="email"
//                 name="studentEmail"
//                 value={formData.studentEmail}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter email"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter address"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Country
//               </label>
//               <select
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select country</option>
//                 <option value="India">India</option>
//                 <option value="USA">USA</option>
//                 <option value="UK">UK</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 State
//               </label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter state"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 City
//               </label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter city"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Pincode
//               </label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter pincode"
//               />
//             </div>
//           </div>
//         );

//       case "Other":
//         return (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Marital Status
//               </label>
//               <select
//                 name="maritalStatus"
//                 value={formData.maritalStatus}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-lg bg-gray-50 disabled:text-gray-500 disabled:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select country</option>
//                 <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4">
//       <form className="bg-white rounded-lg shadow-sm">
//         {/* Header */}
//         <div className="flex flex-wrap justify-between items-center p-4 sm:p-6 border-b gap-4">
//           <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
//           {!isEditing ? (
//             <button
//               type="button"
//               onClick={() => setIsEditing(true)}
//               className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
//             >
//               <FaEdit className="text-sm sm:text-base" />
//               <span>Edit</span>
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <button
//                 type="submit"
//                 onClick={handleFormSubmit}
//                 className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
//               >
//                 <FaSave /> Save
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
//               >
//                 <FaTimes /> Cancel
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
//           {/* Left Profile Section */}
//           <div className="flex flex-col items-center space-y-4 p-4 sm:p-6 border rounded-lg">
//             <div className="relative">
//               <img
//                 src={previewImage}
//                 alt="Profile"
//                 className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover"
//               />
//               <label
//                 htmlFor="studentImageInput"
//                 aria-label="Upload profile picture"
//                 // onClick={handleImageClick}
//                 className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
//               >
//                 <FaCamera size={16} />
//               </label>
//               <input
//                 type="file"
//                 id="studentImageInput"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//                 accept="image/*"
//               />
//             </div>
//             <h2 className="text-lg sm:text-xl font-semibold text-center">
//               {formData.studentName || "Student Name"}
//             </h2>
//             <div className="w-full space-y-3 text-gray-600 text-sm sm:text-base">
//               <div className="flex items-center gap-3">
//                 <FaHashtag className="text-gray-400 flex-shrink-0" />
//                 <span className="truncate">
//                   {formData._id || "Registration not set"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaEnvelope className="text-gray-400 flex-shrink-0" />
//                 <span className="truncate">
//                   {formData.studentEmail || "Email not set"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaCalendar className="text-gray-400 flex-shrink-0" />
//                 <span className="truncate">
//                   {formData.dob || "DOB not set"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaPhone className="text-gray-400 flex-shrink-0" />
//                 <span className="truncate">
//                   {formData.mobileNumber || "Phone not set"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
//                 <span className="truncate">
//                   {formData.address || "Address not set"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content Section */}
//           <div className="lg:col-span-2">
//             {/* Tabs */}
//             <div className="flex overflow-x-auto scrollbar-hide border-b">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.name}
//                   onClick={(event) => handleTabClick(tab.name, event)}
//                   className={`flex items-center gap-2 px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base ${
//                     activeTab === tab.name
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   {tab.icon}
//                   {tab.name}
//                 </button>
//               ))}
//             </div>

//             <div className="p-4 sm:p-6">{renderTabContent()}</div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DashboardProfile;
