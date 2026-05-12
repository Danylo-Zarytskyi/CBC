import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/google",
        {
          credential: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", data.accessToken);

      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      alert("Access denied");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#07111C]">
      <GoogleLogin onSuccess={handleLogin} />
    </div>
  );
};

export default AdminLogin;
