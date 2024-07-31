import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import axios from "axios";
import { PlaceMenuContext } from "../context/PlaceClickedContextProvider";

import InputGroup from "react-bootstrap/InputGroup";
const LikedPlaces = ({ coffeePlaces }) => {
  const [likePlacesCheckBox, setLikePlacesCheckBox] = useState(false);

  const [likedPlaces, setLikedPlaces] = useState([]);

  const [likeBtn, setLikeBtn] = useState(true);

  const { user } = useContext(PlaceMenuContext);

  //   const data = await result.json();
  //   console.log(data);
  // };

  const removeLikedPlaces = async () => {
    await removeLikedPlacesClickHandler();

    window.location.href = "/";
    // navigate("/");
  };

  const removeLikedPlacesClickHandler = async () => {
    // console.log(likedPlaces);
    const placesRemoved = likedPlaces.filter((place) => {
      return place.liked != true;
    });
    console.log(placesRemoved);

    try {
      const res = await fetch(
        "https://coffeeapp-a1t9.onrender.com/api/user/removed/places",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ placesRemoved }),
        }
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const checkBoxClickHandler = () => {
    setLikePlacesCheckBox(!likePlacesCheckBox);
  };

  const likedBtnClickHandler = (data) => {
    setLikeBtn(!likeBtn);
    data.liked = !data.liked;
    console.log(data);
  };

  useEffect(() => {
    try {
      axios
        .get(`https://coffeeapp-a1t9.onrender.com/api/user/liked-places`, {
          params: {
            user: user,
          },
        })
        .then((response) => {
          const newLikedPlaces = response.data.map((place) => {
            return { ...place, liked: true };
          });
          console.log(newLikedPlaces);
          setLikedPlaces(newLikedPlaces);
          // navigate("/liked-places");
        });
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  return (
    <>
      {likedPlaces.length > 0 ? (
        <Container>
          <Row className="coffeePlaces-wrapper">
            <div className="like-places-checkbox-header">
              <h5 className="like-places-checkbox-wrapper">
                <InputGroup.Checkbox
                  className="like-places-checkbox"
                  onClick={checkBoxClickHandler}
                />
                Remove Liked Places
              </h5>
              {likePlacesCheckBox ? (
                <button className="btn" onClick={removeLikedPlaces}>
                  remove liked places
                </button>
              ) : (
                ""
              )}
            </div>
            {likedPlaces.map((data) =>
              data.detail === "0" ? null : (
                <Col md={4} className="coffeePlaces-card-wrapper" key={data.id}>
                  <Card style={{ width: "18rem", border: "none" }}>
                    {likePlacesCheckBox ? (
                      <div
                        className="coffeePlaces-like-btn"
                        onClick={() => likedBtnClickHandler(data)}
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
                    ) : (
                      ""
                    )}
                    <div>
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
                          {/* <span className="coffeePlaces-card-reviews">
                            0 reviews
                          </span> */}
                        </Card.Text>
                        <address className="coffeePlaces-address">
                          {data.address}
                        </address>
                        <Card.Text>
                          Phone: {data.phone === "" ? "No Number" : data.phone}
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Container>
      ) : (
        <div>No Places Liked</div>
      )}
    </>
  );
};

export default LikedPlaces;
