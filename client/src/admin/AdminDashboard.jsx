import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Advantages from "../components/Advantages";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import HowToOrder from "../components/HowToOrder";
import AdminPopularServices from "./AdminPopularServices";
import Works from "../components/Works";
import AdminServices from "./AdminServices";
import AdminWorks from "./AdminWorks";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="p-6 bg-[#07111C] min-h-screen text-white relative">
      {/* ADMIN PANEL UI */}
      <div className="fixed top-4 right-4 z-950 flex gap-2 items-center">
        {/* badge */}
        <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ADMIN MODE
        </div>

        {/* logout */}
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-red-600 transition px-4 py-2 rounded-full text-sm"
        >
          Logout
        </button>
      </div>

      {/* WATERMARK */}
      <div className="fixed bottom-4 right-4 text-white/10 text-6xl font-bold pointer-events-none select-none">
        ADMIN
      </div>

      {/* CONTENT */}
      <Header />

      <main className="border border-red-500/20 p-3 rounded-xl">
        <Hero />
        <AdminPopularServices />
        <AdminServices />
        <HowToOrder />
        <Advantages />
        <AdminWorks />
        <ContactInfo />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
