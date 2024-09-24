import React, { useEffect } from "react";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";
import { useContext } from "react";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const CoffeePlaceMenu = ({ placeInfo }) => {
  const { coffeePlaceClicked, setCoffeePlaceClicked } =
    useContext(PlaceMenuContext);

  const [beverages, setBeverages] = useState([{}]);
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(false);
  const [foodtab, setFoodTab] = useState(false);
  //   const [coldDrinks, setColdDrinks] = useState([{}]);

  useEffect(() => {
    getHotDrinksMenu();
  }, []);

  const getHotDrinksMenu = async () => {
    const data = await fetch("https://api.sampleapis.com/coffee/hot");
    const result = await data.json();
    setBeverages(result);
    setFoodTab(false);
    // console.log(result);
  };
  const getColdDrinksMenu = async () => {
    const data = await fetch("https://api.sampleapis.com/coffee/iced");
    const result = await data.json();
    setBeverages(result);
    setFoodTab(false);

    // console.log(result);
  };

  const getFoodMenu = async () => {
    const data = await fetch("https://api.sampleapis.com/recipes/recipes");
    const result = await data.json();

    setFoodTab(!foodtab);
    setFood(result);
  };

  return (
    <div className=" placeInfo">
      <div className="placeInfo-navbar navbar-light">
        <div className="placeInfo-wrapper">
          <div className="container">
            <h1>{placeInfo.name}</h1>
            <h6 className="placeInfo-rating">
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
              {placeInfo.rating}
            </h6>
            <div>{placeInfo.address}</div>
            <div>{placeInfo.phone}</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-square close-btn"
            onClick={() => setCoffeePlaceClicked(!coffeePlaceClicked)}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link onClick={getHotDrinksMenu} className="nav-view-tab">
              Hot Beverages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={getColdDrinksMenu} className="nav-view-tab">
              Cold Beverages
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={getFoodMenu} className="nav-view-tab">
              Food Menu
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="coffeePlaces-wrapper">
        <Container>
          <Row className="coffeePlaces-wrapper">
            {!foodtab
              ? beverages.map((data) => (
                  <Col md={4} key={data.id} className="beverages-wrapper">
                    <Card style={{ width: "18rem", border: "none" }}>
                      <Card.Img
                        variant="top"
                        src={data.image}
                        height={200}
                        width={100}
                        className="coffeePlaces-card-img"
                      />
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontWeight: "900",
                            color: "#6a704c",
                          }}
                        >
                          {data.title}
                        </Card.Title>

                        <Card.Text className="beverages-ingredients">
                          <span>Ingredients:</span>
                          {data &&
                          Array.isArray(data.ingredients) &&
                          data.ingredients.length > 0 ? (
                            data.ingredients.map((ingredient, index) => (
                              <span
                                key={index}
                                className="beverages-ingredients-ingredient"
                              >
                                {" "}
                                {ingredient}
                                {index < data.ingredients.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ))
                          ) : (
                            <span>No ingredients available</span>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              : food.map((data) => (
                  <Col md={4} key={data.id} className="beverages-wrapper">
                    <Card style={{ width: "18rem", border: "none" }}>
                      <Card.Img
                        variant="top"
                        src={data.photoUrl}
                        height={200}
                        width={100}
                        className="coffeePlaces-card-img"
                      />
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontWeight: "900",
                            color: "#6a704c !important",
                          }}
                        >
                          {data.title}
                        </Card.Title>

                        <Card.Text className="beverages-ingredients">
                          <span>
                            Cuisine: {""}
                            {data.cuisine === "" ? "Continental" : data.cuisine}
                          </span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CoffeePlaceMenu;
