import { useState } from "react";
import { topLinks, bottomLinks } from "./SidebarLinks"; // Import link data
import SidebarItem from "./SidebarItem";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the close icon
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { student } = useSelector((state) => state.student);
  // console.log(studen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center bg-white  shadow-sm px-6 justify-between z-50">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar} // Changed this line
            className="text-2xl focus:outline-none mr-4"
            aria-label="Menu"
          >
            <FaBars />
          </button>
          <Link className="font-bold text-lg" to="/">
            {student.studentName}
          </Link>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
        style={{ width: "250px" }}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none mb-4 absolute top-4 right-4"
        >
          <FaTimes />
        </button>

        {/* Top Links */}
        <div className="flex flex-col mt-8 mb-4">
          {topLinks.map((link, index) => (
            <SidebarItem
              key={index}
              name={link.name}
              icon={link.icon}
              path={link.path}
            />
          ))}
        </div>

        {/* Spacer to push bottom links to the bottom */}
        <div className="flex-grow" />

        {/* Bottom Links */}
        <div>
          {bottomLinks.map((link, index) => (
            <SidebarItem
              key={index}
              name={link.name}
              icon={link.icon}
              path={link.path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
