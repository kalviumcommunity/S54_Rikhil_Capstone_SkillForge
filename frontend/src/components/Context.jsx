import React, { createContext, useState } from "react";
import { loginCheck, typeCheck } from "../utils/loginCheck";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [userType, setUserType] = useState(typeCheck());
  const [login, setLogin] = useState(loginCheck());

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        login,
        setLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;
