// src/components/FeatureSection.jsx
import React from "react";
import MentorImg from "../assets/mentor.png";
import LibImg from "../assets/lib.png";
import ContentImg from "../assets/content.png";
import RibbonImg from "../assets/ribbon.png";

const FeatureSection = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center p-8">
      <div className="bg-white shadow-lg p-6 rounded">
        <img src={MentorImg} alt="feature-img" className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Industry Mentors</h3>
        <p>Learn from professionals with years of industry experience.</p>
      </div>
      <div className="bg-white shadow-lg p-6 rounded">
        <img src={LibImg} alt="feature-img" className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Recognitions</h3>
        <p>Our excellence is backed by numerous awards and recognitions.</p>
      </div>
      <div className="bg-white shadow-lg p-6 rounded">
        <img src={ContentImg} alt="feature-img" className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Curated Programs</h3>
        <p>Learn from professionals with years of industry experience.</p>
      </div>
      <div className="bg-white shadow-lg p-6 rounded">
        <img src={RibbonImg} alt="feature-img" className="mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
        <p>Access an extensive library of materials to aid your learning.</p>
      </div>
    </section>
  );
};

export default FeatureSection;
