import React from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";

const PlaceMenuContext = createContext();

const PlaceClickedContextProvider = ({ children }) => {
  const [coffeePlaceClicked, setCoffeePlaceClicked] = useState(false);

  // const [user, setUser] = useState("");
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <PlaceMenuContext.Provider
      value={{
        coffeePlaceClicked,
        setCoffeePlaceClicked,
        user,
        setUser,
      }}
    >
      {children}
    </PlaceMenuContext.Provider>
  );
};

export { PlaceClickedContextProvider, PlaceMenuContext };
