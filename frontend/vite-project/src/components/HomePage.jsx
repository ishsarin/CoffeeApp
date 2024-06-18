import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import stores from "../data/data";
const HomePage = () => {
  //usestate
  const [coffeePlaces, setCoffeePlaces] = useState([{}]);

  //useeffect
  useEffect(() => {
    // getCoffePlaceData();
    // getCoffeePlaces();
  }, []);

  //functions
  //   const getCoffePlaceData = async () => {
  //     try {
  //       const data = await fetch("https://api.sampleapis.com/coffee/hot");
  //       const res = await data.json();
  //       setCoffeeData(res);
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const getCoffeePlaces = async () => {
    const url =
      "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e37de9475cmshc91754dee8d657cp1f9b19jsnf9309833a34a",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setCoffeePlaces(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="coffeePlaces-wrapper">
      <Container>
        <Row className="coffeePlaces-wrapper">
          {coffeePlaces.map((data) =>
            data.detail === "0" ? null : (
              <Col md={4} className="coffeePlaces-card-wrapper" key={data.id}>
                <Card style={{ width: "18rem" }}>
                  {/* <Card.Img variant="top" src={data.photo.images.} /> */}
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.rating}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
