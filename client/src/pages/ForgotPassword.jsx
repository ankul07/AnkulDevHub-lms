import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  otpGenerate,
  verifyOtp,
  resetPassword,
} from "../redux/auth/authAction";
import { clearError, clearSuccess } from "../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    step: 1,
    studentEmail: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const { error, success, message } = useSelector((state) => state.student);

  // Handle success, error states and step changes
  useEffect(() => {
    if (success) {
      switch (formState.step) {
        case 1:
          toast.success(message || "OTP sent successfully");
          setFormState((prev) => ({ ...prev, step: 2 }));
          break;
        case 2:
          toast.success(message || "OTP verified successfully");
          setFormState((prev) => ({ ...prev, step: 3 }));
          break;
        case 3:
          toast.success(message || "Password reset successful");
          setTimeout(() => navigate("/login"), 2000);
          break;
        default:
          break;
      }
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(message || error || "An error occurred!");
      dispatch(clearError());
    }
  }, [success, error, message, dispatch, navigate, formState.step]);

  // Clear states on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setFormState((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleRequestOtp = () => {
    if (!formState.studentEmail) {
      toast.error("Please enter your email");
      return;
    }
    dispatch(otpGenerate({ studentEmail: formState.studentEmail }));
  };

  const handleVerifyOtp = () => {
    if (!formState.otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (!formState.studentEmail) {
      toast.error("Email not found");
      return;
    }
    dispatch(verifyOtp(formState.studentEmail, formState.otp));
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!formState.newPassword || !formState.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (formState.newPassword !== formState.confirmPassword) {
      toast.error("New Password and Confirm Password not matching");
      return;
    }
    const studentData = {
      studentEmail: formState.studentEmail,
      newPassword: formState.newPassword,
      confirmPassword: formState.confirmPassword,
    };
    dispatch(resetPassword(studentData));
  };

  const renderStep = () => {
    switch (formState.step) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="studentEmail"
              value={formState.studentEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            <button
              type="button"
              onClick={handleRequestOtp}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              disabled={!formState.studentEmail}
            >
              Send OTP
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              value={formState.otp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the OTP"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              disabled={!formState.otp}
            >
              Verify OTP
            </button>
          </div>
        );

      case 3:
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type={formState.showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formState.newPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => togglePasswordVisibility("showNewPassword")}
              >
                {formState.showNewPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </span>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type={formState.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                required
              />
              <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => togglePasswordVisibility("showConfirmPassword")}
              >
                {formState.showConfirmPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-2">Forgot Password</h2>
          <p className="text-gray-500 mb-6">
            {formState.step === 1 && "Enter your email to receive an OTP"}
            {formState.step === 2 && "Enter the OTP sent to your email"}
            {formState.step === 3 && "Enter your new password"}
          </p>

          {renderStep()}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
