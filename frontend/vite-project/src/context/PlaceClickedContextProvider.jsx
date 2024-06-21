import React from "react";
import { createContext } from "react";
import { useState } from "react";

const PlaceMenuContext = createContext();

const PlaceClickedContextProvider = ({ children }) => {
  const [coffeePlaceCLicked, setCOffeePlaceCLicked] = useState(false);
  return (
    <PlaceMenuContext.Provider
      value={{ coffeePlaceCLicked, setCOffeePlaceCLicked }}
    >
      {children}
    </PlaceMenuContext.Provider>
  );
};

export { PlaceClickedContextProvider, PlaceMenuContext };
