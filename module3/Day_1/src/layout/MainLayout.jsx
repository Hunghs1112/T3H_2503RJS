import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 w-full">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default MainLayout;