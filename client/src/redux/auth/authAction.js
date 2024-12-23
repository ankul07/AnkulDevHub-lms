import axiosInstance from "../../api/axiosInstance";
import { updateCourseFail, updateCourseSuccess } from "../course/coursesSlice";

import {
  registerStudentRequest,
  registerStudentSuccess,
  registerStudentFail,
  activationRequest,
  activationSuccess,
  activationFail,
  loginRequest,
  loginSuccess,
  loginFail,
  loadStudentRequest,
  loadStudentFail,
  loadStudentSuccess,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFail,
  logout,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  verifyOtpFail,
  verifyOtpRequest,
  verifyOtpSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} from "./authSlice";

export const createStudent = (studentData, config) => async (dispatch) => {
  dispatch(registerStudentRequest());
  try {
    const { data } = await axiosInstance.post(
      "/user/register",
      studentData,
      config
    );
    console.log("this is create student response", data);
    dispatch(
      registerStudentSuccess({ message: data.message, success: data.success })
    );
  } catch (error) {
    console.log("this is an error", error.response.data.message);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    dispatch(
      registerStudentFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    );
  }
};
export const activateAccount = (emailVerificationToken) => async (dispatch) => {
  dispatch(activationRequest());
  try {
    const { data } = await axiosInstance.post("/user/verify-email", {
      emailVerificationToken,
    });
    dispatch(
      activationSuccess({ message: data.message, success: data.success })
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    dispatch(
      activationFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    );
  }
};
export const loginStudent = (studentData, config) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axiosInstance.post(
      "/user/login",
      studentData,
      config
    );
    console.log(data.student);
    dispatch(
      loginSuccess({
        student: data.data,
        message: data.message,
        success: data.success,
      })
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    console.log(errorMessage);
    dispatch(
      loginFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    );
  }
};
export const loadStudent = () => async (dispatch) => {
  dispatch(loadStudentRequest());
  try {
    const { data } = await axiosInstance.get("/user/profile");
    dispatch(
      loadStudentSuccess({
        student: data.data,
        success: data.success,
        message: data.message,
      })
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    dispatch(
      loadStudentFail({
        error: error,
        message: errorMessage,
      })
    );
  }
};
export const updateStudent = (formData, config) => async (dispatch) => {
  dispatch(updateStudentRequest());
  try {
    const { data } = await axiosInstance.put("/user/profile", formData, config);
    // console.log(data.data.student);
    dispatch(
      updateStudentSuccess({
        student: data.data,
        message: data.message,
        success: data.success,
      })
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    dispatch(
      updateStudentFail({
        error: error,
        success: error.response.data.success,
        message: errorMessage,
      })
    );
  }
};

export const updateStudentImage = (formData) => async (dispatch) => {
  dispatch(updateStudentRequest());
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axiosInstance.put(
      "/user/profile-image",
      formData,
      config
    );
    console.log(data);
    dispatch(
      updateStudentSuccess({ student: data.data, message: data.message })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      updateStudentFail({
        error: error,
        message: error?.response?.data?.message,
      })
    );
  }
};
export const logoutStudent = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get("/user/logout");
    console.log("data", data);
    console.log("data message", data.message);
    dispatch(logout({ message: data.message }));
  } catch (error) {
    console.log(error);
  }
};
export const changePassword = (formData) => async (dispatch) => {
  dispatch(changePasswordRequest());
  try {
    const { data } = await axiosInstance.put("/user/change-password", formData);
    console.log(data);
    dispatch(
      changePasswordSuccess({ message: data.message, success: data.success })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      changePasswordFail({
        error: error,
        message: error.response.data.message,
      })
    );
  }
};

export const otpGenerate = (studentEmail) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest()); // Dispatch request reducer
    const { data } = await axiosInstance.post(
      "/user/forgot-password",
      studentEmail
    ); // Call the API
    dispatch(
      forgotPasswordSuccess({ message: data.message, success: data.success })
    ); // Dispatch success reducer
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    dispatch(
      forgotPasswordFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    );
  }
};

export const verifyOtp = (studentEmail, otp) => async (dispatch) => {
  try {
    dispatch(verifyOtpRequest()); // Dispatch request reducer
    const { data } = await axiosInstance.post("/user/verify-otp", {
      studentEmail,
      otp,
    }); // Call the API
    dispatch(
      verifyOtpSuccess({ message: data.message, success: data.success })
    ); // Dispatch success reducer
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Invalid OTP";
    dispatch(
      verifyOtpFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    ); // Dispatch fail reducer with error message
  }
};

export const resetPassword = (studentData) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest()); // Dispatch request reducer
    const { data } = await axiosInstance.put(
      "/user/reset-password",
      studentData
    ); // Call the API
    dispatch(
      resetPasswordSuccess({
        message: data.message,
        success: data.success,
      })
    ); // Dispatch success reducer
    console.log(data);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to reset password";
    console.log(errorMessage);
    console.log(error);
    dispatch(
      resetPasswordFail({
        error: error,
        message: errorMessage,
        success: error.response.data.success,
      })
    ); // Dispatch fail reducer with error message
  }
};
