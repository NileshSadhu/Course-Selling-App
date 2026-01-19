import { createContext, useEffect, useState } from "react";
import { loginCall, registerCall } from "../api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    const response = await loginCall(email, password);
    setIsLoading(false);

    if (response.success) {
      setIsLoggedIn(true);
    }

    return response;
  };

  const register = async (username, email, password) => {
    isLoggedIn(true);

    const response = await registerCall(username, email, password);
    setIsLoading(false);

    if (response.success) {
      setIsLoggedIn(true);
    }

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ login, register, logout, isLoggedIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
