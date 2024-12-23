import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allcourses: [], // Changed to store the list of all courses
  loading: false, // Track loading state
  error: null, // Track any errors
  success: false, // Track success status
  selectedCourse: null, // For specific course details, if needed
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Load all courses actions
    loadCoursesRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loadCoursesSuccess: (state, action) => {
      state.loading = false;
      state.allcourses = action.payload; // Updated to allcourses
      state.error = null;
      state.success = true;
    },
    loadCoursesFail: (state, action) => {
      state.loading = false;
      state.allcourses = action.payload;
      state.error = action.payload;
      state.success = false;
    },

    // Add a new course actions
    addCourseRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    addCourseSuccess: (state, action) => {
      state.loading = false;
      state.allcourses.push(action.payload); // Updated to allcourses
      state.error = null;
      state.success = true;
    },
    addCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Update a course actions
    updateCourseRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateCourseSuccess: (state, action) => {
      state.loading = false;
      const updatedCourse = action.payload;
      state.allcourses = state.allcourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      ); // Updated to allcourses
      state.error = null;
      state.success = true;
    },
    updateCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Delete a course actions
    deleteCourseRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      const courseId = action.payload;
      state.allcourses = state.allcourses.filter(
        (course) => course._id !== courseId
      ); // Updated to allcourses
      state.error = null;
      state.success = true;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    // Clear specific error or success states
    clearCourseError: (state) => {
      state.error = null;
    },
    clearCourseSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  loadCoursesRequest,
  loadCoursesSuccess,
  loadCoursesFail,
  addCourseRequest,
  addCourseSuccess,
  addCourseFail,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFail,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFail,
  clearCourseError,
  clearCourseSuccess,
} = coursesSlice.actions;

export default coursesSlice.reducer;
