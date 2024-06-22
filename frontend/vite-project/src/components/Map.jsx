import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef } from "react";
const CoffeeMap = ({ coffeePlaces }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const newMarkers = coffeePlaces
      .filter(
        (place) => place.detail !== 0 && place.latitude && place.longitude
      )
      .map((place) => ({
        geocode: [place.latitude, place.longitude],
        mark: place.address,
      }));

    setMarkers(newMarkers);
  }, [coffeePlaces]);

  const mapRef = useRef();

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[100.87808, 12.91283]}
        zoom={16}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode}>
            <Popup>{marker.mark}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoffeeMap;
