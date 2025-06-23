import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  const position = [40.748817, -73.985428]; 

  useEffect(() => {
    const map = document.querySelector('.leaflet-container')
  }, []);

  return (
    <div className="map-wrapper" style={{ padding: '40px', height: '80vh', width: '100%' }}>
      <MapContainer
        center={position}
        zoom={13}
        className="map-container"
        style={{ width: '100%',height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={new Icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}>
          <Popup>
            A random marker at {position[0]}, {position[1]}!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
  
}

export default Map;
