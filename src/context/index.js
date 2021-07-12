import React, { createContext, useState, useContext, useEffect } from "react";

const GeneralContext = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <GeneralContext.Provider value={{ loading, setLoading, isAuth, setIsAuth }}>
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
