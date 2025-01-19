import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const Gmap = ({ apiKey, positions, markdata }) => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  // Handle Delivered Button click
  const handleDelivered = (orderId) => {
    alert(`Order ${orderId} marked as delivered`);
    // You can add logic to handle the "Delivered" state update here
  };

  // Handle Return Button click
  const handleReturn = (orderId) => {
    alert(`Order ${orderId} marked as returned`);
    // You can add logic to handle the "Return" state update here
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: positions[0], lng: positions[1] }} // Center the map on user's location
        zoom={12}
      >
        {/* Current Location Marker */}
        <Marker
          position={{ lat: positions[0], lng: positions[1] }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green icon for source
          }}
          onClick={() => {
            setSelectedOrder({ orderId: "Current Location" });
          }}
        />
        
        {/* Order Markers */}
        {markdata.map((order) => (
          <Marker
            key={order.orderId}
            position={{ lat: order.coords.latitude, lng: order.coords.longitude }}
            icon={{
              url: order.isReturned
                ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png" // Orange icon for returned orders
                : "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red icon for normal orders
            }}
            onClick={() => {
              setSelectedOrder(order);
            }}
          />
        ))}

        {/* InfoWindow for order */}
        {selectedOrder && (
          <InfoWindow
            position={{
              lat: selectedOrder.coords?.latitude || positions[0],
              lng: selectedOrder.coords?.longitude || positions[1],
            }}
            onCloseClick={() => {
              setSelectedOrder(null);
            }}
          >
            <div>
              <p>Order: {selectedOrder.orderId}</p>
              <button
                className="bg-green-500 text-white px-4 py-1 rounded-md mr-2"
                onClick={() => handleDelivered(selectedOrder.orderId)}
              >
                Delivered
              </button>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded-md"
                onClick={() => handleReturn(selectedOrder.orderId)}
              >
                Return
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Gmap;
