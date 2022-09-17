import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({ userName: "Jake", password: 123 });
  const [dealId, setDealId] = useState("6325adea092ce7a855a5e6f9");

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, user, setUser, dealId, setDealId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
