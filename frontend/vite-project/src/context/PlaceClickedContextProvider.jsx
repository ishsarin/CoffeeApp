import React from "react";
import { createContext } from "react";
import { useState } from "react";

const PlaceMenuContext = createContext();

const PlaceClickedContextProvider = ({ children }) => {
  const [coffeePlaceClicked, setCoffeePlaceClicked] = useState(false);

  return (
    <PlaceMenuContext.Provider
      value={{
        coffeePlaceClicked,
        setCoffeePlaceClicked,
      }}
    >
      {children}
    </PlaceMenuContext.Provider>
  );
};

export { PlaceClickedContextProvider, PlaceMenuContext };
