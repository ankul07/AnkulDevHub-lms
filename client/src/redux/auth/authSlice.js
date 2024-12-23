import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  student: {},
  error: null,
  success: false,
  message: null,
};

const authSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    // Load user actions
    loadStudentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    loadStudentSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.student = action.payload.student;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    loadStudentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isAuthenticated = false;
      state.student = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Registration actions
    registerStudentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    registerStudentSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      // state.student = action.payload.data;
      state.message = action.payload.message;
      state.isAuthenticated = false;
    },
    registerStudentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isAuthenticated = false;
      state.student = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Activation actions
    activationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    activationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    activationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Login actions
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.student = action.payload.student;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isAuthenticated = false;
      state.student = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Update student actions
    updateStudentRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
      state.success = false;
    },
    updateStudentSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload.student;
      state.error = null;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    updateStudentFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },

    // Logout action
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.student = null;
      state.error = null;
      state.success = true;
      state.message = action.payload.message;
    },

    // Error and Success management
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = null;
    },

    // Change Password actions
    changePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    changePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Forgot Password actions
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    forgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Verify OTP actions
    verifyOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    verifyOtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },

    // Reset Password actions
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

export const {
  loadStudentRequest,
  loadStudentSuccess,
  loadStudentFail,
  registerStudentRequest,
  registerStudentSuccess,
  registerStudentFail,
  activationRequest,
  activationSuccess,
  activationFail,
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFail,
  clearError,
  clearSuccess,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
