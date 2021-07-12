import React, { createContext, useState, useContext } from "react";

const GeneralContext = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <GeneralContext.Provider value={{ loading, setLoading }}>
      {children}
    </GeneralContext.Provider>
  );
};

function useContextProvider() {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error(
      "useContextProvider must be used within an ContextProvider."
    );
  }

  return context;
}

export { ContextProvider, useContextProvider };
