import React from "react";
import AboutImg from "../assets/pngegg.png";

const About = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto py-12 flex flex-col lg:flex-row gap-12 items-center">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img
              src={AboutImg}
              alt="Students studying"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="lg:w-1/2 space-y-12">
          <div>
            <h1 className="text-5xl font-bold text-blue-700 mb-6">
              Welcome to Ankul Technologies
            </h1>

            <p className="text-2xl text-gray-600 mb-8">
              80 days around the world, we'll find a pot of gold just sitting
              where the rainbow's ending. Time — we'll fight against the time,
              and we'll fly on the white wings of the wind. 80 days around the
              world, no we won't say a word before the ship is really back.
              Round, round, all around the world. Round, all around the world.
              Round, all around the world.
            </p>
          </div>

          <div className="space-y-8">
            {/* Mission Section */}
            <div className="flex gap-4 items-start">
              <div className="bg-red-200 p-4 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">
                  Mission
                </h2>
                <p className="text-gray-600 text-xl">
                  Empowering learners with tailored education to excel,
                  innovate, and positively impact their chosen fields
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div className="flex gap-4 items-start">
              <div className="bg-red-200 p-4 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">
                  Vision
                </h2>
                <p className="text-gray-600 text-xl">
                  Leading the future of learning with innovative programs,
                  fostering excellence, and shaping tomorrow's industry leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
