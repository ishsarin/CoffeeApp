import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Rating } from "react-simple-star-rating";

const AddLocation = () => {
  const [rating, setRating] = useState(0);
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };

  const handleFormSubmit = async (e) => {
    window.location.href = "/";

    const res = await fetch("/api/new-location", {
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
      }),
    });
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
  return (
    <div className="addlocation">
      <form>
        <div className="addlocation-wrapper">
          <div>Welcome</div>
          <div class="">Add the new Location</div>
          <div class="">
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
            <div class="cut"></div>
            <div className="addlocation-rating">
              <label htmlFor="">Rating</label>
              <Rating onClick={handleRating} />
              <div class="cut"></div>
            </div>
            <div class="cut"></div>
            <div className="addlocation-img">
              <label htmlFor="">Image</label>
              <input
                type="file"
                accept="image/*"
                required={true}
                onChange={imgOnChange}
              />
            </div>
            <div class="cut"></div>
          </div>
        </div>
      </form>
      <div className="addlocation-location">
        <button onClick={(e) => getLocationClick(e)}>
          Get current Location
        </button>
      </div>
      <button type="text" onClick={(e) => handleFormSubmit(e)}>
        Submit
      </button>
    </div>
  );
};

export default AddLocation;
