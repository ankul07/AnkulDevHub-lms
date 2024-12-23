import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaThLarge,
  FaList,
  FaStar,
  FaBook,
  FaUsers,
  FaGraduationCap,
  FaPlus,
} from "react-icons/fa";
import { courses } from "../../data";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearSuccess } from "../../redux/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

const DashboardHome = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 -z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Courses
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center flex-1 sm:flex-none">
            <FaFilter className="absolute left-3 text-gray-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer w-full sm:w-auto"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaSearch className="text-gray-500" />
          <span>Search</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "border border-gray-300 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "border border-gray-300 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {course.category}
                </span>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({course.reviews})
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{course.institution}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 border border-gray-200 rounded-full text-xs">
                    {course.level}
                  </span>
                  <span className="px-2 py-1 border border-gray-200 rounded-full text-xs">
                    {course.language}
                  </span>
                </div>
                {/* Hide Price for enrolled users */}
                <span className="font-semibold text-green-500">Enrolled</span>
              </div>

              <div className="mt-4 flex justify-between items-center text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <FaBook />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers />
                  <span>{course.enrollments} students</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaGraduationCap />
                    <span className="text-sm">Progress</span>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
