import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const User = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tracking_id = queryParams.get('tracking_id');
  const [position, setPosition] = useState(null); // null initially

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}`); // e.g., ws://localhost:8000

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      if (tracking_id) {
        ws.send(JSON.stringify({ type: 'register_user', order_id: tracking_id }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'gps_user_recive') {
          const latlng = [data.gps.latitude, data.gps.longitude];
          console.log("GPS Update:", latlng);
          setPosition(latlng);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [tracking_id]);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order Tracker</h1>
          <nav></nav>
        </div>
      </header>

      <main className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg flex-grow">
        <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>

        {position === null ? (
          <h1>No Data Received</h1>
        ) : (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-96">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Current location: {position[0]}, {position[1]}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Order Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default User;
