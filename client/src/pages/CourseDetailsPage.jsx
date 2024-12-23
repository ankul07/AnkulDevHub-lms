import {
  FaChalkboardTeacher,
  FaSchool,
  FaCertificate,
  FaStar,
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
} from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import { useState, useEffect } from "react";

function CourseDetailsPage() {
  const course = {
    id: 3,
    title: "Web Development Bootcamp",
    description:
      "A full-stack web development course that covers HTML, CSS, JavaScript, and more.",
    instructor: {
      name: "Ms. Sneha Desai",
      bio: "A web developer with extensive experience in building dynamic websites and applications.",
      credentials: "MTech in Web Technologies",
    },
    institution: "Digital Skills Academy",
    price: 750,
    rating: 4.7,
    reviews: 60,
    imageUrl: "/api/placeholder/400/302",
    category: "Web Development",
    level: "Intermediate",
    language: "English",
    duration: "8 weeks",
    contentFormat: ["live lectures", "hands-on coding", "projects"],
    prerequisites: "Basic knowledge of programming.",
    enrollments: 150,
    startDate: "2024-11-15",
    endDate: "2025-01-10",
    status: "open",
    certification: true,
    syllabus: [
      "Module 1: HTML Basics",
      "Module 2: CSS Styling",
      "Module 3: JavaScript Fundamentals",
      "Module 4: Responsive Design",
      "Module 5: Backend Development",
    ],
    learningObjectives: [
      "Build responsive websites.",
      "Understand client-server architecture.",
      "Create full-stack applications.",
    ],
    assessmentMethods: ["weekly projects", "final presentation"],
    discussionForum: "/forums/web-dev-bootcamp",
    courseMaterials: [
      "/materials/web_dev_guide.pdf",
      "/materials/web_dev_projects.pdf",
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>

        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-2" />
          <span className="text-lg font-semibold">{course.rating}</span>
          <span className="text-gray-600 ml-2">({course.reviews} reviews)</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Instructor</h2>
          <div className="flex items-center mb-2">
            <FaChalkboardTeacher className="text-gray-500 mr-2" />
            <span className="font-semibold">{course.instructor.name}</span>
          </div>
          <p className="text-gray-700">{course.instructor.bio}</p>
          <p className="text-gray-500 italic">
            {course.instructor.credentials}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Course Information</h2>
          <div className="flex items-center mb-2">
            <FaSchool className="text-gray-500 mr-2" />
            <span>{course.institution}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaLanguage className="text-gray-500 mr-2" />
            <span>{course.language}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span>Start Date: {course.startDate}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span>End Date: {course.endDate}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaClock className="text-gray-500 mr-2" />
            <span>Duration: {course.duration}</span>
          </div>
          <div className="flex items-center mb-2">
            <MdOutlinePriceCheck className="text-gray-500 mr-2" />
            <span>Price: ${course.price}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaCertificate className="text-gray-500 mr-2" />
            <span>Certification: {course.certification ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {course.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
          <ul className="list-decimal ml-5 text-gray-700">
            {course.syllabus.map((module, index) => (
              <li key={index}>{module}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content Format</h2>
          <p className="text-gray-700">{course.contentFormat.join(", ")}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
          <p className="text-gray-700">{course.prerequisites}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Assessment Methods</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {course.assessmentMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Enrollments</h2>
          <p className="text-gray-700">
            Current Enrollments: {course.enrollments}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Course Materials</h2>
          <ul className="list-disc ml-5 text-blue-500">
            {course.courseMaterials.map((material, index) => (
              <li key={index}>
                <a href={material} target="_blank" rel="noopener noreferrer">
                  {material.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Discussion Forum</h2>
          <a
            href={course.discussionForum}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Forum
          </a>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
