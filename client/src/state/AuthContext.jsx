import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import http from "../api/http.js";

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("edutrack_user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const persistSession = (payload) => {
    localStorage.setItem("edutrack_token", payload.token);
    localStorage.setItem("edutrack_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await http.post("/auth/login", credentials);
      persistSession(data);
      toast.success(`Welcome back, ${data.user.name}`);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await http.post("/auth/register", payload);
      persistSession(data);
      toast.success("Your EDUTRACK account is ready");
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("edutrack_token");
    localStorage.removeItem("edutrack_user");
    setUser(null);
    toast.success("Signed out");
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
