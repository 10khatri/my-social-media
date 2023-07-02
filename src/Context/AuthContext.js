import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const logout = () => {
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
