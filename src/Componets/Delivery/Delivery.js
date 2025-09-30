import React, { useState, useEffect, useRef } from "react";
import Map from "../Map/Map";
import { LuScanLine } from "react-icons/lu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUndoAlt } from 'react-icons/fa';

const deliveryLocations = [
  { orderId: "3", coords: { latitude: 19.1259844, longitude: 73.0074273 }, isReturned: false },
  { orderId: "1", coords: { latitude: 19.1249134, longitude: 73.0042275 }, isReturned: true },
  { orderId: "2", coords: { latitude: 19.1269574, longitude: 73.0011271 }, isReturned: false },
  { orderId: "4", coords: { latitude: 19.1261574, longitude: 73.0011271 }, isReturned: false },
  { orderId: "6", coords: { latitude: 19.1269574, longitude: 73.0061271 }, isReturned: true },
];

const Delivery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const navigate = useNavigate();
  const [orderids, setOrderids] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [ws, setWs] = useState(null);
  const [checkflag, setCheckflag] = useState(true);
  const Orderidtext = useRef();
  const [Sorteddistance, setSortedDistance] = useState([]);
  const intervalRef = useRef(null);

  const handleModalSubmit = () => {
    console.log(modalInput);
    setModalInput('');
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setCurrentLocation(position.coords),
      (error) => console.error("Error getting location: ", error)
    );
  }, []);

  const Acceptepickup = () => {
    const Arrayformat = Orderidtext.current.value.split(",").map(id => id.trim()).filter(Boolean);
    setOrderids(Arrayformat);

    const sortedData = Arrayformat.map((orderId) => {
      const deliveryLocation = deliveryLocations.find(item => item.orderId === orderId);
      if (deliveryLocation && currentLocation) {
        const { latitude, longitude } = deliveryLocation.coords;
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          latitude,
          longitude
        );
        return { orderId, distance, isReturned: deliveryLocation.isReturned };
      }
      return null;
    }).filter(Boolean).sort((a, b) => a.distance - b.distance);

    setSortedDistance(sortedData);
    setCheckflag(false);

    // Connect WebSocket
    const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`); // ws://localhost:8000
    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket.send(JSON.stringify({ type: "register_delivery_guy", orders: Arrayformat }));

      // Start sending GPS updates every 2s
      intervalRef.current = setInterval(() => {
        if (currentLocation) {
          socket.send(JSON.stringify({ type: "gpsupdate", gps: currentLocation }));
        }
      }, 2000);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      clearInterval(intervalRef.current);
    };

    socket.onerror = (err) => console.error("WebSocket error:", err);
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (ws) ws.close();
      clearInterval(intervalRef.current);
    };
  }, [ws]);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rider Tracker</h1>
        </div>
      </header>

      {checkflag ? (
        <main className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">Rider Dashboard</h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <input
                ref={Orderidtext}
                placeholder="Enter Order IDs separated by commas"
                className="flex-grow w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
              />
            </motion.div>

            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                onClick={Acceptepickup}
              >
                Accept Pickup
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -10 }}
                className="focus:outline-none"
                onClick={Acceptepickup}
              >
                <LuScanLine size={30} className="text-purple-700" />
              </motion.button>
            </div>
          </motion.div>
        </main>
      ) : (
        <main className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg  flex flex-row">
          <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md z-0">
            <Map
              positions={currentLocation ? [currentLocation.latitude, currentLocation.longitude] : []}
              markdata={deliveryLocations}
            />
          </div>
          <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Drop / Pickup</h1>

            {Sorteddistance && Sorteddistance.map((data, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md shadow-sm flex flex-row justify-between">
                <div>
                  <h2 className="font-bold">{data.isReturned ? "Return ID" : "Order ID"}: {data.orderId}</h2>
                  <p>Distance: {data.distance} km</p>
                </div>
                <div className="flex flex-row gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-row focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                    onClick={openModal}
                  >
                    <FaCheckCircle className="mr-2" size={20} /> {data.isReturned ? "Pickup Confirm" : "Delivered"}
                  </motion.button>
                  { !data.isReturned && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-row focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                      onClick={openModal}
                    >
                      <FaUndoAlt className="mr-2" size={20} /> Return
                    </motion.button>
                  )}
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg z-10">
                      <div className="flex flex-row justify-between">
                        <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
                        <button className="text-gray-500 mb-4" onClick={() => setIsModalOpen(false)}>✖️</button>
                      </div>
                      <input
                        type="text"
                        value={modalInput}
                        onChange={(e) => setModalInput(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                        placeholder="Enter your OTP"
                      />
                      <div className="flex justify-end">
                        <button onClick={handleModalSubmit} className="bg-purple-700 text-white px-4 py-2 rounded-lg">Submit</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Order Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Delivery;
