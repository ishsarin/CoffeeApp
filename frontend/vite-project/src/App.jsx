import "./styles/style.scss";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import axios from "axios";
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LikedPlaces from "./components/LikedPlaces";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import AddLocation from "./components/AddLocation";
import NavBar from "./components/NavBar";
function App() {
  const [loading, setLoading] = useState(false);
  const [coffeePlaces, setCoffeePlaces] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [navLikeClicked, setNavLikeClicked] = useState(false);
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const filteredPlaces = useMemo(() => {
    return coffeePlaces.filter((place) =>
      place?.name?.toLowerCase().includes(searchVal)
    );
  }, [coffeePlaces, searchVal]);

  useEffect(() => {
    getCoffeePlaces();
  }, []);
  const getCoffeePlaces = async () => {
    axios
      .get("https://coffeeapp-a1t9.onrender.com/api/homepage")
      // .get("/api/homepage")
      .then((response) => {
        setLoading(!loading);

        console.log(response.data);
        const newData = response.data.map((place) => {
          const newObj = { ...place, liked: false };
          return newObj;
        });
        setCoffeePlaces(newData);
      });
  };

  return (
    <>
      {" "}
      <BrowserRouter>
        <NavBar
          setNavLikeClicked={setNavLikeClicked}
          navLikeClicked={navLikeClicked}
          coffeePlaces={filteredPlaces}
          onSearch={setSearchTerm}
          setSearchBtnClicked={setSearchBtnClicked}
          setCoffeePlaces={setCoffeePlaces}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                coffeePlaces={filteredPlaces}
                loading={loading}
                navLikeClicked={navLikeClicked}
                searchTerm={searchTerm}
                searchBtnClicked={searchBtnClicked}
              />
            }
          />
          <Route path="/liked-places" element={<LikedPlaces />} />
          <Route path="/user/sign-up" element={<UserSignUp />} />
          <Route path="/user/sign-in" element={<UserSignIn />} />
          <Route path="/new/add-location" element={<AddLocation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
