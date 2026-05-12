import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import AdminDashboard from "./AdminDashboard";

const AdminPage = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/google",
        {
          credential: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", data.accessToken);
      setToken(data.accessToken);
    } catch (err) {
      console.log(err);
      alert("Access denied");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#07111C]">
        <h1 className="text-white mb-6 text-2xl">Admin access</h1>

        <GoogleLogin onSuccess={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-[#0F0B00] border-b border-[#FFC400]/30">
        <h1 className="text-[#FFC400] font-bold">Admin Panel</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded text-white"
        >
          Logout
        </button>
      </div>

      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
