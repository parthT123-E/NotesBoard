import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import api from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Make sure cookies are sent
  axios.defaults.withCredentials = true;

  // Fetch logged-in user (if cookie is valid)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile" , { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  useEffect(() => {
  console.log("AuthProvider user changed:", user);
}, [user]);
  // Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
    setUser(res.data);
    navigate("/");
    
  };

  // Register
  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password }, { withCredentials: true });
    setUser(res.data);
    navigate("/");
    
  };

  // Logout
  const logout = async () => {
    await api.post("/auth/logout" , {}, { withCredentials: true });
    setUser(null);
    // navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);