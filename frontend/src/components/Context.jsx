import React, { createContext, useState } from "react";

export const AppContext = createContext();

const ParentContext = ({ children }) => {

  return (
    <AppContext.Provider
      value={{
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext
