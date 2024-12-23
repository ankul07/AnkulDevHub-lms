import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    institution,
    price,
    rating,
    reviews,
    imageUrl,
    id,
    category,
    level,
    language,
  } = course;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-full hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 relative">
        <img
          src={imageUrl}
          alt={`Image of ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{institution}</p>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {category}
          </span>
          <span className="px-2 py-1 border border-gray-200 rounded-full text-xs">
            {level}
          </span>
          <span className="px-2 py-1 border border-gray-200 rounded-full text-xs">
            {language}
          </span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-lg font-bold">₹{price}</span>
        </div>

        <div className="flex items-center mt-auto">
          <span className="mr-1 font-medium">{rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-1">({reviews})</span>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(`/course/detailed/${_id}`)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
