import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Map from "../Map/Map";
import { LuScanLine } from "react-icons/lu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUndoAlt } from 'react-icons/fa'
import Gmap from "../Map/Gmap";

const deliveryLocations = [
  {
    orderId: "3",
    coords: { latitude: 19.1259844, longitude: 73.0074273 },
    isReturned: false,
  },
  {
    orderId: "1",
    coords: { latitude: 19.1249134, longitude: 73.0042275 },
    isReturned: true,
  },
  {
    orderId: "2",
    coords: { latitude: 19.1269574, longitude: 73.0011271 },
    isReturned: false,
  },
  {
    orderId: "4",
    coords: { latitude: 19.1261574, longitude: 73.0011271 },
    isReturned: false,
  },
  {
    orderId: "6",
    coords: { latitude: 19.1269574, longitude: 73.0061271 },
    isReturned: true,
  },
];

const Delivery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');
  const navigate = useNavigate();
  const [orderids, SetOrderids] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [checkflag, setcheckflag] = useState(true);
  const Orderidtext = useRef();
  const [Sorteddistance, SetSortedDistance] = useState();
  let interval;

  const handleModalSubmit = () => {
    // Handle the input submission logic
    console.log(modalInput);
    setModalInput(''); // Clear the input
    setIsModalOpen(false); // Close the modal
  };
  
  // Function to open the modal with specific context if needed
  const openModal = () => {
    setIsModalOpen(true);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {}, [navigate]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, []);

  function Acceptepickup() {
    const Arrayformat = Orderidtext.current.value.split(",");
    SetOrderids(Arrayformat);
    const sortedData = Arrayformat.map((orderId) => {
      console.log("deliveryLocation", { orderId });
      const deliveryLocation = deliveryLocations.find(
        (item) => item.orderId === orderId
      );

      if (deliveryLocation && currentLocation) {
        const { latitude, longitude } = deliveryLocation.coords;
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          latitude,
          longitude
        );
        const { isReturned } = deliveryLocation;
        return { orderId, distance, isReturned };
      }
      return null;
    })
      .filter((data) => data !== null)
      .sort((a, b) => a.distance - b.distance);

    SetSortedDistance(sortedData);
    setcheckflag(false);

    const newSocket = io(`{process.env.REACT_APP_URL}`);
    setSocket(newSocket);

    console.log("Connecting to WebSocket");

    newSocket.emit("register_delivery_guy", Arrayformat);

    interval = setInterval(() => {
      if (currentLocation) {
        console.log(currentLocation);
        newSocket.emit("gpsupdate", { gps: currentLocation });
      }
    }, 2000);

    return () => {
      console.log("disconnet");
      clearInterval(interval);
      socket.disconnect();
    };
  }

  return (
    <>
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
              <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">
                Rider Dashboard
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <input
                  ref={Orderidtext}
                  placeholder="Enter Order ID"
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

            {/* Optional background or animation here if needed */}
          </main>
        ) : (
          <>
            <main className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg  flex flex-row">
              <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md z-0">
                
                  <Map
                    positions={Object.values(currentLocation)}
                    markdata={deliveryLocations}
                  />
                

              </div>
              <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Drop / Pickup</h1>

                {Sorteddistance &&
                  Sorteddistance.map((data, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="mb-4 p-4 border rounded-md shadow-sm flex flex-row justify-between"
                        >
                          <div>
                            <h2 className="font-bold">
                              {data.isReturned ? "Return ID" : "Order ID"}:{" "}
                              {data.orderId}
                            </h2>
                            <p>Distance: {data.distance} km</p>
                          </div>
                          <div className="flex flex-row gap-2">
                          {data.isReturned ?<><motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-row focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                  onClick={openModal} 
                >
  <FaCheckCircle className="mr-2" size={20} />
  Pickup Confirm                </motion.button> </> : <><motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-row focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                  onClick={openModal} 
                >
  <FaCheckCircle className="mr-2" size={20} />
  Delivered                </motion.button> <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-row  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition duration-300 ease-in-out"
                  onClick={openModal} 
                >
                  <FaUndoAlt className="mr-2" size={20} />
                  Return
                </motion.button></>}
                           
                          </div>
                         

                        </div> {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 shadow-lg z-1">
      <div className="flex flex-row justify-between"><h2 className="text-lg font-bold mb-4">Enter OTP</h2>
        <button
          className=" text-gray-500 mb-4"
          onClick={() => setIsModalOpen(false)}
        >
          ✖️ 
        </button></div>
      <input
        type="text"
        value={modalInput}
        onChange={(e) => setModalInput(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        placeholder="Enter your OTP"
      />
      <div className="flex justify-end">
       
        <button
          onClick={handleModalSubmit}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          Submit
          {console.log(orderids)
          }
        </button>
      </div>
    </div>
  </div>
)}
                        
                      </>
                    );
                  })}
              </div>
            </main>
          </>
        )}

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Order Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Delivery;
