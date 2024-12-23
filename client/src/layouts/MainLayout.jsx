// src/layouts/MainLayout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 120px)" }}>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
