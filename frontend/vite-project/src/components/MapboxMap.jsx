import React, { useMemo } from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import { useState } from "react";
import { Popup } from "react-map-gl";
import { useRef } from "react";
import pin from "../media/pin.png";
import dot from "../media/dot.png";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
const MapboxMap = ({ coffeePlaces }) => {
  const [markers, setMarkers] = useState([{}]);
  const [showPopup, setShowPopup] = useState(true);

  const [dist, setDist] = useState(0);

  const [mode, setMode] = useState(0);

  const [show, setShow] = useState(false);

  const [currentLong, setCurrentLong] = useState(0);
  const [currentLat, setCurrentLat] = useState(0);

  const [popupLat, setPopUpLat] = useState(0);
  const [popupLong, setPopUpLong] = useState(0);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    // const newMarkers = coffeePlaces.filter(
    //   (place) => place.detail !== 0 && place.latitude && place.longitude
    // );
    // setMarkers(newMarkers);
    setMarkers(coffeePlaces);
    const location = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setCurrentLong(crd.longitude);
        setCurrentLat(crd.latitude);
      },
      () => {
        console.log("Error getting location");
      },
      { timeout: 10000 }
    );
  }, []);

  const markerClickHandle = (e, place) => {
    setShow(!show);
    console.log(e.target);
    console.log(place);
    setPopUpLat(e.target._lngLat.lat);
    setPopUpLong(e.target._lngLat.lng);
    setName(place.name);
    setRating(place.rating);
    setNumber(place.phone);
    setAddress(place.address);
    calcCrow(
      currentLat,
      currentLong,
      e.target._lngLat.lat,
      e.target._lngLat.lng
    );
  };
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    setDist(d);
  }

  return (
    <div>
      <div className="map"></div>
      <Map
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: currentLong,
          latitude: currentLat,
          zoom: 1.5,
        }}
        mapboxAccessToken="pk.eyJ1IjoiaXNoc2FyaW4iLCJhIjoiY2x4a25oY2JrMDJ6YzJrcXV4cWEybjgyZSJ9.Ig4XsyEO50Op7hojgrY03Q"
        projection="globe"
        mapStyle={
          mode % 2 === 0
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/light-v11"
        }
        style={{ width: "100%", height: 700 }}
        // center={[currentLong, currentLat]}
      >
        <Marker longitude={currentLong} latitude={currentLat}>
          <img src={dot} className="curr-marker" />
        </Marker>
        {show ? (
          <Popup
            longitude={currentLong}
            latitude={currentLat}
            anchor="top"
            onClose={() => {
              setShowPopup(showPopup);
              setShow(!show);
            }}
            className="popup-header"
            closeOnClick={false}
          >
            <div>current location</div>
          </Popup>
        ) : (
          ""
        )}
        {markers.map((place) => (
          <>
            <Marker
              longitude={place.long}
              latitude={place.lat}
              className="marker"
              onClick={(e) => markerClickHandle(e, place)}
            ></Marker>
          </>
        ))}
        {show ? (
          <Popup
            longitude={popupLong}
            latitude={popupLat}
            anchor="top"
            onClose={() => {
              setShowPopup(showPopup);
              setShow(!show);
            }}
            className="popup-header"
            closeOnClick={false}
          >
            <div className="popup-wrapper">
              <h5 className="popup-name">{name}</h5>
              <h6 className="popup-rating">
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
                {rating}
              </h6>
              <h6>
                <address>{address}</address>
              </h6>
              <h6>{number}</h6>
              <h7 className="popup-dist">Distance: {dist} km</h7>
              {/* <address className="popup-address">{place.address}</address> */}
            </div>
          </Popup>
        ) : (
          ""
        )}
      </Map>
      <button className="btn" onClick={() => setMode(mode + 1)}>
        {mode % 2 === 0 ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default MapboxMap;
