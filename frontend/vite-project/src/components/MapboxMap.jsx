import React, { useMemo } from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import { useState } from "react";
import { Popup } from "react-map-gl";
import pin from "../media/pin.png";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
const MapboxMap = ({ coffeePlaces }) => {
  const [markers, setMarkers] = useState([{}]);
  const [showPopup, setShowPopup] = useState(true);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // const newMarkers = coffeePlaces.filter(
    //   (place) => place.detail !== 0 && place.latitude && place.longitude
    // );
    // setMarkers(newMarkers);
    setMarkers(coffeePlaces);
  }, []);

  return (
    <div>
      <div className="map"></div>
      <Map
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: 100.87808,
          latitude: 12.91283,
          zoom: 1.5,
        }}
        mapboxAccessToken="pk.eyJ1IjoiaXNoc2FyaW4iLCJhIjoiY2x4a25oY2JrMDJ6YzJrcXV4cWEybjgyZSJ9.Ig4XsyEO50Op7hojgrY03Q"
        projection="globe"
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: 700 }}
        center={[100.87808, 12.91283]}
      >
        {markers.map((place) => (
          <>
            <Marker
              longitude={place.long}
              latitude={place.lat}
              className="marker"
              onClick={() => setShow(!show)}
            ></Marker>
            {show ? (
              <Popup
                longitude={place.long}
                latitude={place.lat}
                anchor="top"
                onClose={() => setShowPopup(showPopup)}
                closeOnClick={false}
              >
                <div className="popup-wrapper">
                  <h5 className="popup-name">{place.name}</h5>
                  {/* <address className="popup-address">{place.address}</address> */}
                </div>
              </Popup>
            ) : (
              ""
            )}
          </>
        ))}
      </Map>
    </div>
  );
};

export default MapboxMap;
