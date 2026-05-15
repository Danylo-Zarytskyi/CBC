import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Power, Shield } from "lucide-react";

import Header from "../components/Header";
import AdminHero from "./AdminHero";
import Footer from "../components/Footer";
import AdminPopularServices from "./AdminPopularServices";
import AdminServices from "./AdminServices";
import AdminWorks from "./AdminWorks";
import AdminOrders from "./AdminOrders";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <div className="p-16 bg-[#07111C] min-h-screen text-white relative">
      {/* TOP ADMIN BAR - тепер ліворуч, щоб не перекривати сайдбар */}
      <div className="fixed top-4 left-4 z-40 flex gap-2 items-center">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-3 py-1.5">
          <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
            <Shield size={12} className="text-yellow-400" />
          </div>

          <span className="text-xs text-gray-300 hidden sm:inline">Admin</span>

          <div className="w-px h-4 bg-white/10" />

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Вийти</span>
            <Power size={12} className="opacity-60" />
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-[#0A0700] border border-yellow-400/30 rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-3">Вийти?</h3>

            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-xl"
              >
                Так
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-white/10 py-2 rounded-xl"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10">
        <Header />

        <main className="border border-yellow-400/20 rounded-xl p-3 mt-6 bg-black/20">
          <AdminHero />
          <AdminOrders />
          <AdminPopularServices />
          <AdminServices />
          <AdminWorks />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
