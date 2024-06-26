import "./styles/style.scss";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LikedPlaces from "./components/LikedPlaces";

function App() {
  const [loading, setLoading] = useState(false);
  const [coffeePlaces, setCoffeePlaces] = useState([{}]);
  useEffect(() => {
    getCoffeePlaces();
  }, []);
  const getCoffeePlaces = async () => {
    axios.get("/api/homepage").then((response) => {
      setLoading(!loading);

      // console.log(response.data);
      const newData = response.data.map((place) => {
        const newObj = { ...place, liked: false };
        return newObj;
      });
      setCoffeePlaces(newData);
    });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage coffeePlaces={coffeePlaces} loading={loading} />}
          />
          <Route path="/liked-places" element={<LikedPlaces />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
