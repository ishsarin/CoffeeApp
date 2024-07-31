import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { Navigate, useNavigate } from "react-router-dom";
const AddLocation = () => {
  const [rating, setRating] = useState(0);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const [locationClicked, setLocationClicked] = useState(false);

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    const res = await fetch(
      "https://coffeeapp-a1t9.onrender.com/api/new-location",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rating,
          long,
          lat,
          img,
          address,
          phone,
        }),
      }
    );
    // e.preventDefault();
    // console.log("submit");
    // console.log(img);
  };

  const imgOnChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
  };
  const getLocationClick = () => {
    const location = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        const longitude = crd.longitude;
        setLong(longitude);
        const latitide = crd.latitude;
        setLat(latitide);
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
      },
      () => {
        console.log("Error getting location");
      },
      { timeout: 10000 }
    );

    // console.log(location);
  };
  const homepageClick = () => {
    navigate("/");
  };
  return (
    <div className="addlocation">
      <div className="addlocation-header">
        <form
          className="addlocation-form"
          action="/"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <div className="addlocation-wrapper">
            <h2>Welcome</h2>
            <h4 class="">Add new Location</h4>
            <div class="addlocation-info">
              <div className="addlocation-name">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Name of the Place"
                  required={true}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="addlocation-rating">
                <label htmlFor="">Rating</label>
                <Rating onClick={handleRating} />
              </div>

              <div className="addlocation-address">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="Address of the Place"
                  required={true}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="addlocation-number">
                <label htmlFor="">Number</label>
                <input
                  type="text"
                  placeholder="Number of the Place"
                  required={true}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="addlocation-img">
                <label htmlFor="">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  required={true}
                  onChange={imgOnChange}
                />
              </div>
            </div>
          </div>
          <div className="addlocation-location" required>
            <button
              // disabled={!locationClicked ? true : false}
              className="btn"
              onClick={(e) => {
                getLocationClick(e);
                // setLocationClicked(!locationClicked);
              }}
            >
              Get current Location and Submit
            </button>
          </div>
          {/* <div className="addlocation-submit">
            <button
              type="text"
              className="btn"
             
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
      <div className="homepage-link" onClick={homepageClick}>
        Back to Homepage
      </div>
    </div>
  );
};

export default AddLocation;
