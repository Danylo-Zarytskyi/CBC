import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/google`,
        {
          credential: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", data.accessToken);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#07111C] relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[#FFC400]/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 w-[90%] max-w-md">
        <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
          <h1 className="text-white text-3xl font-semibold text-center">
            Admin Access
          </h1>

          <p className="text-white/40 text-sm text-center mt-2">
            Secure authentication required
          </p>

          <div className="my-6 h-px bg-white/10" />

          <div className="flex justify-center scale-[1.05]">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => navigate("/")}
              theme="filled_black"
              shape="pill"
              text="signin_with"
            />
          </div>

          <p className="text-white/30 text-xs text-center mt-6">
            Unauthorized access will be redirected
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
