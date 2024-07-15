import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import axios from "axios";

const LikedPlaces = ({ coffeePlaces }) => {
  const [likedPlaces, setLikedPlaces] = useState([{}]);

  useEffect(() => {
    const allLikedPlaces = coffeePlaces.filter((place) => {
      return place.liked === true;
    });
    setLikedPlaces(allLikedPlaces);
  }, []);

  const serverPostAllLikedPlacees = async () => {
    const result = await fetch("/api/places/liked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likedPlaces),
    });

    const data = await result.json();
    console.log(data);

    // const res = await result.json();
    // console.log(res);

    // axios
    //   .post("/api/places/liked", {
    //     name: "ish",
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     console.log("hi");
    //   });
  };

  const click = () => {
    serverPostAllLikedPlacees();
  };

  return (
    <>
      <Container>
        <Row className="coffeePlaces-wrapper">
          {likedPlaces.map((data) =>
            data.detail === "0" ? null : (
              <Col md={3} className="coffeePlaces-card-wrapper" key={data.id}>
                <Card style={{ width: "18rem", border: "none" }}>
                  <div
                    className="coffeePlaces-like-btn"
                    onClick={() => likeClickHandler(data)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={data.liked ? "rgb(0, 59, 64)" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <div onClick={() => coffeePlacesClickHandler(data)}>
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

      <button onClick={click}>click</button>
    </>
  );
};

export default LikedPlaces;
