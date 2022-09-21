import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({
    // userName: "Jake",
    // password: 123,
    // roles: ["User"],
  });
  const [submittedDeals, setSubmittedDeals] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        submittedDeals,
        setSubmittedDeals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
