import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
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
    const [position, setPosition] = useState("null"); 
    console.log(position);
    
    
    useEffect(() => {
        const socket = io("https://backend-product-tracking.vercel.app");

        console.log("Tracking ID:", tracking_id);
        
        if (tracking_id) {
          
            socket.emit('register_user', tracking_id);

           
            socket.on('gps_user_recive', (data) => {
                console.log("From server to client:", data);
                const latlng = [data.latitude, data.longitude];
                setPosition(latlng);
             
            });
        }

        return () => {
            socket.disconnect();
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

               {position==="null" ? <h1>No Data Recived</h1> :<MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-96">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            Current location: {position[0]}, {position[1]}
                        </Popup>
                    </Marker>
                </MapContainer>}
               
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
