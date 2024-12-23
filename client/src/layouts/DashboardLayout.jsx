import React from "react";
import Sidebar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="container mx-auto mt-20">
        <Outlet /> {/* This will render the main page based on the route */}
      </main>
    </>
  );
};

export default DashboardLayout;
