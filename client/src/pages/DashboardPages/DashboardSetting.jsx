import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/auth/authAction";
import { toast, ToastContainer } from "react-toastify";
import { clearError, clearSuccess } from "../../redux/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

const DashboardSetting = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    logOutOption: "", // Default option
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const dispatch = useDispatch();
  const { message, success, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (error) {
      toast.error(message || "An error occurred!", { autoClose: 5000 }); // 5-second auto-dismiss
      dispatch(clearError());
    }
    if (success) {
      toast.success(message || "Success!", { autoClose: 5000 });
      dispatch(clearSuccess());
    }
  }, [error, success, message, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    // Regex for validation: Minimum 6 characters, at least 1 alphabet, 1 special character, and 1 number
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.oldPassword) {
      toast.error("Old Password is required");
      return;
    }

    if (!formData.newPassword || !validatePassword(formData.newPassword)) {
      toast.error(
        "New Password must be at least 6 characters long, include 1 alphabet, 1 special character, and 1 number."
      );
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Confirm New Password does not match New Password.");
      return;
    }

    try {
      dispatch(changePassword(formData));
      // console.log(formData);
      // toast.success("Password changed successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        </div>

        {/* Password Change Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Change Your Password
            </h2>

            <div className="space-y-4">
              <div className="space-y-1 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your old password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPasswords.oldPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPasswords.newPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={
                      showPasswords.confirmNewPassword ? "text" : "password"
                    }
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("confirmNewPassword")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPasswords.confirmNewPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Log out options */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">
              Log out options
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="logOutOption"
                  value="logOutOthers"
                  checked={formData.logOutOption === "logOutOthers"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">
                  Log me out of other devices
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="logOutOption"
                  value="keepLoggedIn"
                  checked={formData.logOutOption === "keepLoggedIn"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">Keep me logged in</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardSetting;
