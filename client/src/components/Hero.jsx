import React from "react";
import profileImage from "../assets/heroimg.png";

const Hero = () => {
  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#A6C1EE] to-[#FBC2EB]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between p-8">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 text-left mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">
              Studying Online is Now Much Easier
            </h1>
            <p className="text-lg md:text-2xl">
              Ankul Technologies is an interesting platform that will teach you
              in a more interactive way
            </p>
            <button className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-all duration-300 ease-in-out group">
              Explore Course
              <span className="ml-2 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
          {/* Circular Image - Right Side */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 md:w-64 md:h-64 lg:w-full lg:h-full object-cover rounded-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
