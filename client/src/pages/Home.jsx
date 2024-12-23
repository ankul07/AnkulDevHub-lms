// src/pages/Home.jsx
import React from "react";
import MainLayout from "../layouts/MainLayout";

import FeatureSection from "../components/FeatureSection";
import About from "./About";
import CompanieRelay from "../components/CompanieRelay";
import ContactForm from "./ContactForm";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <FeatureSection />
      <About />
      <CompanieRelay />
      <ContactForm />
      <FAQ />
    </MainLayout>
  );
};

export default Home;
