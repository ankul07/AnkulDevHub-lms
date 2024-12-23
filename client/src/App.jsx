import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Page imports
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Course from "./pages/Course";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseDetailed from "./pages/CourseDetailed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivationPage from "./pages/ActivationPage";

// Dashboard imports
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardPages/DashboardHome";
import DashboardProfile from "./pages/DashboardPages/DashboardProfile";
import DashboardSetting from "./pages/DashboardPages/DashboardSetting";
import Test from "./pages/DashboardPages/Test";

// Components
import Loader from "./components/Loader";

// Redux actions
import { loadStudent } from "./redux/auth/authAction";
import { clearError, clearSuccess } from "./redux/auth/authSlice";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.student);

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirects if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.student);

  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, success, error } = useSelector(
    (state) => state.student
  );

  useEffect(() => {
    if (error) {
      // toast.error(message || "An error occurred!", { autoClose: 5000 }); // 5-second auto-dismiss
      dispatch(clearError());
    }
    if (success) {
      // toast.success(message || "Success!", { autoClose: 5000 });
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadStudent());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/course/detailed/:id" element={<CourseDetailed />} />
        <Route
          path="/activation/:emailVerificationToken"
          element={<ActivationPage />}
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/home" element={<DashboardHome />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/settings" element={<DashboardSetting />} />
          <Route path="/dashboard/test" element={<Test />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
