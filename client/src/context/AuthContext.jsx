import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("adminToken");
    if (saved) setToken(saved);
  }, []);

  const login = (data) => {
    setToken(data.accessToken);
    localStorage.setItem("adminToken", data.accessToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
