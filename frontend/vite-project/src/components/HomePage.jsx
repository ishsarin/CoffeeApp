import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CoffeePlaceMenu from "./CoffeePlaceMenu";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";

const HomePage = () => {
  //usestate
  const [coffeePlaces, setCoffeePlaces] = useState([{}]);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);

  const [placeInfo, setPlaceInfo] = useState({});

  const { coffeePlaceCLicked, setCOffeePlaceCLicked } =
    useContext(PlaceMenuContext);

  //useeffect
  useEffect(() => {
    getCoffeePlaces();
  }, []);

  //functions

  // const searchChange = () => {
  //   // console.log(e.target.value);
  //   // console.log(val);

  //   // if (val === "") setCoffeePlaces(coffeePlaces);

  //   const filteredResults = coffeePlaces.filter((place) => {
  //     if (place.detail != "0") {
  //       console.log(place.name);
  //       if (place.name.toLowerCase().includes(val.toLowerCase())) return place;
  //     } else return null;
  //   });
  //   setCoffeePlaces(filteredResults);
  //   setVal("");
  //   // console.log(coffeePlaces);
  // };

  const getCoffeePlaces = async () => {
    axios.get("/api/homepage").then((response) => {
      setLoading(!loading);

      setCoffeePlaces(response.data);
      // console.log(response.data);
    });
  };

  const coffeePlacesClickHandler = (data) => {
    // console.log(data);

    setPlaceInfo({ name: data.name, rating: data.rating });
    setCOffeePlaceCLicked(!coffeePlaceCLicked);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-wrapper">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="#">COFFEE PLACE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navbar-searchtabs">
            <Form className="d-flex searchbar mx-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setVal(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search"
                // onClick={searchChange}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Form>
            <Nav
              className=" my-2 my-lg-0  navbar-righttabs"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1" className="navbar-righttabs-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </Nav.Link>
              <Nav.Link href="#action2" className="navbar-righttabs-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Liked
              </Nav.Link>
              <Nav.Link href="#action2" className="navbar-righttabs-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-plus-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Location
              </Nav.Link>
              <Nav.Link href="#action2" className="navbar-righttabs-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="coffeePlaces-wrapper">
        {!coffeePlaceCLicked ? (
          <Container>
            <Row className="coffeePlaces-wrapper">
              {!loading
                ? "Loading..."
                : coffeePlaces.map((data) =>
                    data.detail === "0" ? null : (
                      <Col
                        md={3}
                        className="coffeePlaces-card-wrapper"
                        key={data.id}
                        onClick={() => coffeePlacesClickHandler(data)}
                      >
                        <Card style={{ width: "18rem", border: "none" }}>
                          <Card.Img
                            variant="top"
                            src={
                              data.photo
                                ? data.photo.images.large.url
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
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
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
                        </Card>
                      </Col>
                    )
                  )}
            </Row>
          </Container>
        ) : (
          <CoffeePlaceMenu placeInfo={placeInfo} />
        )}
      </div>
    </>
  );
};

export default HomePage;
