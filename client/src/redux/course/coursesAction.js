import axiosInstance from "../../api/axiosInstance";
import {
  loadCoursesRequest,
  loadCoursesSuccess,
  loadCoursesFail,
} from "./coursesSlice";

export const loadCourses =
  ({ filters, searchQuery } = {}) =>
  async (dispatch) => {
    dispatch(loadCoursesRequest());
    try {
      // Create query parameters
      const queryParams = new URLSearchParams();

      // Add search query if exists
      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }

      // Add filter parameters if they exist and have values
      if (filters) {
        Object.entries(filters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            queryParams.append(key, values.join(","));
          }
        });
      }

      // Construct the URL with query parameters
      const url = `/courses${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      // Make the API call with filters
      const response = await axiosInstance.get(url);
      dispatch(loadCoursesSuccess(response.data.data.courses));
    } catch (error) {
      dispatch(loadCoursesFail(error.response?.data || "An error occurred"));
    }
  };
