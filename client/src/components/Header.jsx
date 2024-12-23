import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaBars, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutStudent } from "../redux/auth/authAction";
import { toast, ToastContainer } from "react-toastify";
import { clearError, clearSuccess } from "../redux/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, message, success, error } = useSelector(
    (state) => state.student
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(message || "An error occurred!");
      dispatch(clearError());
    }
    if (success) {
      toast.success(message || "User Load Succesfully");
      dispatch(clearSuccess());
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [error, success]);

  const handleLoginLogout = () => {
    dispatch(logoutStudent());
    // alert("even click");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <header className="w-full">
        <ToastContainer />
        <div className="lg:container mx-auto bg-white flex justify-between items-center p-4">
          <div className="flex justify-center items-center">
            <Link to="/">
              <img src={logo} width={50} height={50} alt="Logo" />
            </Link>
          </div>
          <nav className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/course"
                className="no-underline text-black hover:text-gray-700 transition"
              >
                Course
              </Link>
              <Link
                to="/contact"
                className="no-underline text-black hover:text-gray-700 transition"
              >
                Contact Us
              </Link>
            </div>
            <div className="hidden lg:flex gap-3 relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    className="border border-black bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition flex items-center"
                    onClick={toggleDropdown}
                  >
                    My Account <FaCaretDown className="ml-1" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                      <Link
                        to="/dashboard/home"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                        onClick={handleLoginLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="border border-black bg-white text-black py-2 px-4 rounded hover:bg-gray-100 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-white bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
            <div className="lg:hidden" onClick={toggleMenu}>
              <FaBars className="text-black cursor-pointer" />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden bg-white transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-[-100%] overflow-hidden"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 p-4 w-full">
          <Link
            to="/course"
            className="no-underline text-black hover:text-gray-700 transition"
          >
            Course
          </Link>
          <Link
            to="/contact"
            className="no-underline text-black hover:text-gray-700 transition"
          >
            Contact Us
          </Link>
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            {isAuthenticated ? (
              <div className="lg:flex gap-3 relative justify-center">
                <button
                  className="border border-black bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition flex items-center w-auto text-center"
                  onClick={toggleDropdown}
                >
                  My Account <FaCaretDown className="ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 w-full">
                    <Link
                      to="/dashboard/home"
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                      onClick={handleLoginLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-black bg-white text-black py-2 px-4 rounded hover:bg-gray-100 transition w-full text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-white bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-full text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
