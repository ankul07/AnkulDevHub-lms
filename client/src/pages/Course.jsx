import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import CourseCard from "../components/CourseCard";
import { loadCourses } from "../redux/course/coursesAction";
import Loader from "../components/Loader";
import { filterOptions } from "../data";

const Course = () => {
  const dispatch = useDispatch();
  const { allcourses, loading } = useSelector((state) => state.courses);

  // State for filters
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    language: [],
    priceRange: [],
  });

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(loadCourses({ filters, searchQuery }));
  }, [dispatch, filters, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }

      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      level: [],
      language: [],
      priceRange: [],
    });
    setSearchQuery("");
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      Object.values(filters).some((arr) => arr.length > 0) ||
      searchQuery.trim() !== ""
    );
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, arr) => count + arr.length, 0);
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No courses found
      </h3>
      <p className="text-gray-500 text-center mb-6">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : "No courses match your selected filters"}
      </p>
      {hasActiveFilters() && (
        <button
          onClick={clearFilters}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  // Filter section component
  const FilterSection = ({ title, options, filterType, isPrice = false }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const value = isPrice ? option.label : option;
          return (
            <label key={value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters[filterType].includes(value)}
                onChange={() => handleFilterChange(filterType, value)}
              />
              <span className="text-gray-600">{value}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  // Active filters summary
  const ActiveFiltersSummary = () => {
    const activeCount = getActiveFilterCount();
    if (!hasActiveFilters()) return null;

    return (
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {activeCount > 0 && (
            <span>
              {activeCount} active filter{activeCount !== 1 ? "s" : ""}
            </span>
          )}
          {searchQuery && (
            <span>
              {activeCount > 0 ? " • " : ""}Search: "{searchQuery}"
            </span>
          )}
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>
    );
  };

  return (
    <MainLayout>
      <section>
        <div className="w-full bg-slate-800 px-4 pt-8 pb-16 relative">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore Courses
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Authentic and high-quality courses, specially curated by <br />
                experienced teachers for deep study.
              </p>
              <div className="relative max-w-2xl">
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for courses"
                    className="w-full pl-12 pr-32 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() =>
                      dispatch(loadCourses({ filters, searchQuery }))
                    }
                    className="absolute right-2 bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex my-4">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0 pr-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Filters
                </h2>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <FilterSection
                title="Category"
                options={filterOptions.category}
                filterType="category"
              />

              <FilterSection
                title="Level"
                options={filterOptions.level}
                filterType="level"
              />

              <FilterSection
                title="Language"
                options={filterOptions.language}
                filterType="language"
              />

              <FilterSection
                title="Price Range"
                options={filterOptions.priceRanges}
                filterType="priceRange"
                isPrice={true}
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {loading ? (
              <Loader />
            ) : (
              <>
                <ActiveFiltersSummary />
                {Array.isArray(allcourses) && allcourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allcourses?.map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Course;
