import React, { createContext, useState } from "react";
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}
