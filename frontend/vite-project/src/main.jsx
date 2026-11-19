import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { PlaceClickedContextProvider } from "./context/PlaceClickedContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlaceClickedContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlaceClickedContextProvider>
  </React.StrictMode>
);