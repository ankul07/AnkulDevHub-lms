// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between px-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Ankul Technologies</h2>
          </div>
          <nav className="flex flex-col md:flex-row">
            <a href="#about" className="text-gray-300 hover:text-white mx-2">
              About
            </a>
            <a href="#features" className="text-gray-300 hover:text-white mx-2">
              Features
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white mx-2">
              Contact
            </a>
          </nav>
          <div className="flex mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-white mx-2"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white mx-2"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white mx-2"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 w-full pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Ankul Technologies. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
