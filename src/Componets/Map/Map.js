


  // Map.js
  import React, { useEffect } from 'react';
  import { MapContainer, TileLayer, useMap } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet-routing-machine';
  import L from 'leaflet';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
  
  
  const currentLocationIcon = L.icon({
    iconUrl: "https://img.icons8.com/?size=48&id=dWq8B4mn8B08&format=png"
  });

  const returnedOrderIcon = L.icon({
    iconUrl: "   https://cdn-icons-png.flaticon.com/32/8776/8776364.png "
  });
  
  const orderLocationIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/32/2203/2203124.png"
  });
  
  
  const RoutingMachine = ({ positions, markdata }) => {
    const map = useMap();
  
    useEffect(() => {
      if (positions) {
        const waypoints = [
          L.latLng(positions[0], positions[1]), 
          ...markdata.map((loc) => L.latLng(loc.coords.latitude, loc.coords.longitude)), 
        ];
  
        
        L.Routing.control({
          waypoints,
          addWaypoints: false, // Disable adding waypoints by clicking on the map
          draggableWaypoints: false, // Disable dragging the waypoints
          routeWhileDragging: false, // Disable recalculating route while dragging
      
          lineOptions: {
            styles: [{ color: 'blue', weight: 4 }],
          },
          createMarker: function (i, wp, nWps) {
            if (i === 0) {
              // Marker for the source (current location)
              return L.marker(wp.latLng, { icon: currentLocationIcon }).bindPopup(`My Location`);
            } else {
              // Markers for order locations: differentiate between regular and returned/cancelled orders
              const order = markdata[i - 1]; // Adjusted to skip the source
              if (order.isReturned) {
                console.log(order.orderId)
                return L.marker(wp.latLng, { icon: returnedOrderIcon }).bindPopup(`OrderId:${order.orderId}`); // Returned/Cancelled Order Icon
              } else {
                return L.marker(wp.latLng, { icon: orderLocationIcon }).bindPopup(`OrderId:${order.orderId}`); // Regular Order Icon
              }
            }
          },
        }).addTo(map);
      }
    }, [map, positions, markdata]);
  
    return null;
  };
  
  const Map = ({ positions, markdata }) => {
    console.log(positions, markdata);
    
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        {positions && (
          <MapContainer center={positions} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Marker position={positions} zIndexOffset={100} icon={startIcon} title='MAIN'></Marker> */}
          
            <RoutingMachine positions={positions} markdata={markdata} />
          </MapContainer>
        )}
      </div>
    );
  };
  
  export default Map;
  

