import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount } from "../redux/auth/authAction";
import { clearError, clearSuccess } from "../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivationPage = () => {
  const { emailVerificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, message } = useSelector((state) => state.student);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(message || "An error occurred!");
      dispatch(clearError());
    }
    if (success) {
      toast.success(message || "Email Verification successful!");
      dispatch(clearSuccess());

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [error, success, message, dispatch, navigate]);

  useEffect(() => {
    if (emailVerificationToken && !isActivated) {
      console.log("Activating account with token:", emailVerificationToken);
      dispatch(activateAccount(emailVerificationToken));
      setIsActivated(true); // Mark as activated
    }
  }, [emailVerificationToken, dispatch, isActivated]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Account Activation</h2>
        {error && (
          <p className="text-red-500">Verification Failed. Please try again.</p>
        )}
        {success && (
          <p className="text-green-500">Account activated successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
