import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CoffeePlaceMenu from "./CoffeePlaceMenu";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";
// import Map from "./Map";
import MapboxMap from "./MapboxMap";
import LikedPlaces from "./LikedPlaces";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import NavBar from "./NavBar";
const HomePage = ({ coffeePlaces, loading }) => {
  let { user, setUser } = useContext(PlaceMenuContext);

  //usestate

  const [val, setVal] = useState("");
  const [likedPlaces, setLikedPlaces] = useState([{}]);
  const [likeClicked, setLikeClicked] = useState(false);
  const [navLikeClicked, setNavLikeClicked] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({});
  const [mapView, setMapView] = useState(false);
  const [likePlacesCheckBox, setLikePlacesCheckBox] = useState(false);
  const [duplicatePlaces, setDuplicatePlaces] = useState([]);

  const { coffeePlaceClicked, setCoffeePlaceClicked } =
    useContext(PlaceMenuContext);

  const navigate = useNavigate();

  //useeffect

  //functions

  const coffeePlacesClickHandler = (data) => {
    console.log(data);

    setPlaceInfo({ name: data.name, rating: data.rating });
    setCoffeePlaceClicked(!coffeePlaceClicked);
  };

  const getTabView = () => {
    // getCoffeePlaces();
    setMapView(false);
  };

  const getMapView = () => {
    setMapView(true);
  };

  const likeClickHandler = (data) => {
    // console.log(data);
    setLikeClicked(!likeClicked);
    data.liked = !data.liked;
  };

  const likedPlacesClickHandler = async () => {
    const liked = coffeePlaces.filter((place) => {
      return place.liked === true;
    });
    console.log(liked);

    if (liked.length > 0) {
      fetchLikedPlaces(liked);
      window.location.href = "/";
    }
  };
  const fetchLikedPlaces = async (liked) => {
    const result = await fetch("/api/places/liked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ liked, user }),
    });
    // navigate("/liked-places");
    const data = await result.json();
    // console.log(data);
  };

  const getLikedPlacesFromDB = async () => {
    try {
      axios
        .get(`/api/user/liked-places`, {
          params: {
            user: user,
          },
        })
        .then((response) => {
          // console.log(response.data);
          const res = response.data;

          console.log(res);

          const likedPlaceNames = res.map((likedplace) => likedplace.name);

          const filteredPlaces = coffeePlaces.filter((place) => {
            return !likedPlaceNames.includes(place.name);
          });

          console.log(filteredPlaces);
          setDuplicatePlaces(filteredPlaces);
          // for (let i = 0; i < likedplaces.length; i++) {
          //   likedplaces[i].liked = true;
          // }
          // console.log(likedplaces);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <NavBar
        setNavLikeClicked={setNavLikeClicked}
        navLikeClicked={navLikeClicked}
        coffeePlaces={coffeePlaces}
      />
      {!navLikeClicked ? (
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={getTabView}>View in Tabular Form</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={getMapView}>View All Places in Map</Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
        ""
      )}
      {navLikeClicked ? (
        <LikedPlaces coffeePlaces={coffeePlaces} />
      ) : !mapView ? (
        <div className="coffeePlaces-wrapper">
          {!coffeePlaceClicked ? (
            <div>
              <div className="like-places-checkbox-header">
                <h5 className="like-places-checkbox-wrapper">
                  <InputGroup.Checkbox
                    className="like-places-checkbox"
                    onClick={() => {
                      setLikePlacesCheckBox(!likePlacesCheckBox);
                      getLikedPlacesFromDB();
                    }}
                  />
                  Like Places
                </h5>
                {likePlacesCheckBox ? (
                  <button
                    className="btn btn-primary"
                    onClick={likedPlacesClickHandler}
                  >
                    submit liked places
                  </button>
                ) : (
                  ""
                )}
              </div>

              <Container>
                <Row className="coffeePlaces-wrapper">
                  {!loading
                    ? "Loading..."
                    : likePlacesCheckBox
                    ? duplicatePlaces.map((data) =>
                        data.detail === "0" ? null : (
                          <Col
                            md={3}
                            className="coffeePlaces-card-wrapper"
                            key={data.id}
                          >
                            <Card style={{ width: "18rem", border: "none" }}>
                              {likePlacesCheckBox ? (
                                <div
                                  className="coffeePlaces-like-btn"
                                  onClick={() => likeClickHandler(data)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={
                                      data.liked ? "rgb(0, 59, 64)" : "none"
                                    }
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-heart"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                  </svg>
                                </div>
                              ) : (
                                ""
                              )}
                              <div
                                onClick={() => coffeePlacesClickHandler(data)}
                                // style={{ opacity: data.liked ? "0.3" : "1" }}
                              >
                                <Card.Img
                                  variant="top"
                                  src={
                                    data.image
                                      ? data.image
                                      : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY="
                                  }
                                  height={200}
                                  width={100}
                                  className="coffeePlaces-card-img"
                                />
                                <Card.Body>
                                  <Card.Title
                                    style={{
                                      fontWeight: "900",
                                      color: "rgb(0, 59,64)",
                                    }}
                                  >
                                    {data.name}
                                  </Card.Title>
                                  <Card.Text style={{ color: "rgb(0, 59,64)" }}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="rgb(253,203,110)"
                                      stroke="rgb(253,203,110)"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-star"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    {data.rating}
                                    <span className="coffeePlaces-card-reviews">
                                      0 reviews
                                    </span>
                                  </Card.Text>
                                </Card.Body>
                              </div>
                            </Card>
                          </Col>
                        )
                      )
                    : coffeePlaces.map((data) =>
                        data.detail === "0" ? null : (
                          <Col
                            md={3}
                            className="coffeePlaces-card-wrapper"
                            key={data.id}
                          >
                            <Card style={{ width: "18rem", border: "none" }}>
                              {likePlacesCheckBox ? (
                                <div
                                  className="coffeePlaces-like-btn"
                                  onClick={() => likeClickHandler(data)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={
                                      data.liked ? "rgb(0, 59, 64)" : "none"
                                    }
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-heart"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                  </svg>
                                </div>
                              ) : (
                                ""
                              )}
                              <div
                                onClick={() => coffeePlacesClickHandler(data)}
                                // style={{ opacity: data.liked ? "0.3" : "1" }}
                              >
                                <Card.Img
                                  variant="top"
                                  src={
                                    data.image
                                      ? data.image
                                      : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY="
                                  }
                                  height={200}
                                  width={100}
                                  className="coffeePlaces-card-img"
                                />
                                <Card.Body>
                                  <Card.Title
                                    style={{
                                      fontWeight: "900",
                                      color: "rgb(0, 59,64)",
                                    }}
                                  >
                                    {data.name}
                                  </Card.Title>
                                  <Card.Text style={{ color: "rgb(0, 59,64)" }}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="rgb(253,203,110)"
                                      stroke="rgb(253,203,110)"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-star"
                                    >
                                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    {data.rating}
                                    <span className="coffeePlaces-card-reviews">
                                      0 reviews
                                    </span>
                                  </Card.Text>
                                </Card.Body>
                              </div>
                            </Card>
                          </Col>
                        )
                      )}
                </Row>
              </Container>
            </div>
          ) : (
            <CoffeePlaceMenu placeInfo={placeInfo} />
          )}
        </div>
      ) : (
        <MapboxMap coffeePlaces={coffeePlaces} />
      )}
    </>
  );
};

export default HomePage;
