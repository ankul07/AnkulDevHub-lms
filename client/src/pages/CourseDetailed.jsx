import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaUsers,
  FaLanguage,
  FaCheckCircle,
  FaList,
  FaQuestionCircle,
  FaComments,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaFilePdf,
  FaVideo,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";

const ModuleSection = ({ module, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-medium text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaBook className="mr-3 text-indigo-600" />
          <span>
            Module {index + 1}: {module.moduleTitle}
          </span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-white">
          <div className="space-y-4">
            {/* Topics Section */}
            {module.topics?.map((topic, idx) => (
              <div key={idx} className="ml-8">
                <h4 className="font-medium text-gray-800 mb-2">
                  {topic?.title}
                </h4>
                <p className="text-gray-600 ml-4">{topic?.description}</p>
              </div>
            ))}

            {/* Resources Section */}
            {module.resources && module.resources.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FaFilePdf className="mr-2 text-red-500" />
                  Resources:
                </h4>
                <ul className="list-disc ml-8 text-indigo-600">
                  {module.resources.map((resource, idx) => (
                    <li key={idx}>
                      <a href={resource.url} className="hover:text-indigo-800">
                        {resource.type} Resource
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Videos Section */}
            {module.videos && module.videos.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <FaVideo className="mr-2 text-indigo-500" />
                  Videos:
                </h4>
                <div className="space-y-3">
                  {module.videos.map((video, idx) => (
                    <div key={idx} className="ml-4">
                      <h5 className="font-medium">{video.title}</h5>
                      <p className="text-gray-600 text-sm">
                        {video.description}
                      </p>
                      <span className="text-gray-500 text-sm">
                        Duration: {video.duration} minutes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-medium text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaQuestionCircle className="mr-3 text-indigo-600" />
          <span>{faq.question}</span>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-white">
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const WeekSection = ({ week, index }) => (
  <div className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
    <div className="flex items-center">
      <span className="font-medium text-indigo-600 mr-2">
        Week {index + 1}:
      </span>
      <span>{week}</span>
    </div>
  </div>
);

const RatingStars = ({ rating, reviews }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    <span className="ml-2 text-gray-600">({reviews} reviews)</span>
  </div>
);

const CourseDetailed = () => {
  const { id } = useParams();
  const { allcourses, loading } = useSelector((state) => state.courses);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!loading && allcourses.length > 0) {
      const foundCourse = allcourses.find((course) => course._id === id);
      if (foundCourse) {
        setCourse(foundCourse);
      }
    }
  }, [id, allcourses, loading]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!course)
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
        <p className="mt-2 text-gray-600">
          The course you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  {course.category} • {course.level}
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {course.title}
                </h1>
                <p className="mt-4 text-gray-600">{course.description}</p>

                <div className="mt-4 flex items-center">
                  <FaUserGraduate className="text-gray-500 mr-2" />
                  <span className="font-medium">{course.instructor.name}</span>
                </div>

                <div className="mt-2">
                  <RatingStars
                    rating={course.rating}
                    reviews={course.reviews}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLanguage className="text-gray-500 mr-2" />
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-500 mr-2" />
                    <span>{course.enrollments} students</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                  <button className="ml-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Details Sections */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2">
              {/* Syllabus Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaList className="mr-3 text-indigo-600" />
                  Course Syllabus
                </h2>
                <div className="space-y-4">
                  {course.syllabus?.map((week, index) => (
                    <WeekSection key={index} week={week} index={index} />
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaGraduationCap className="mr-3 text-indigo-600" />
                  Learning Objectives
                </h2>
                <ul className="space-y-4">
                  {course.learningObjectives?.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum Details */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaBook className="mr-3 text-indigo-600" />
                  Course Modules
                </h2>

                {/* Check if modules exist */}
                {course.modules && course.modules.length > 0 ? (
                  <div className="space-y-2">
                    {course.modules.map((module, index) => (
                      <ModuleSection
                        key={module._id || index}
                        module={module}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No modules available for this course yet.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-1">
              {/* Instructor Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Instructor</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={course.instructor.imageUrl}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">
                        {course.instructor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {course.instructor.credentials}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>

              {/* Course Preview Video */}
              {course.previewVideoUrl && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Course Preview</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <video
                      src={course.previewVideoUrl}
                      controls
                      className="w-full"
                      poster={course.imageUrl}
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              {/* Course Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Course Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p>{course.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p>{course.duration}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prerequisites</p>
                    <p className="mt-1">{course.prerequisites}</p>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FaQuestionCircle className="mr-3 text-indigo-600" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {course.FAQs?.map((faq, index) => (
                    <FAQSection key={index} faq={faq} index={index} />
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <FaComments className="mr-3 text-indigo-600" />
                  Student Testimonials
                </h2>
                <div className="space-y-6">
                  {course.testimonials?.map((testimonial, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <p className="italic text-gray-600 mb-3">
                        "{testimonial.review}"
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {testimonial.student}
                        </span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="ml-1">{testimonial.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetailed;
