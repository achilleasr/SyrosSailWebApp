import "leaflet/dist/leaflet.css";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import React, { useState, useEffect } from 'react';


function Map({ items, pointList }) {
  const [loc1,setLoc1] = useState([10*Math.random(),10*Math.random()]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoc1([0.01*Math.random(),0.01*Math.random()]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
    },
  });

  let customIcon = new LeafIcon({ iconUrl: "/pin1.png" });


  let LeafIcon2 = L.Icon.extend({
    options: {
      iconSize: [40, 10],
    },
  });
  let customIcon2 = new LeafIcon2({ iconUrl: "/sailboat1tiny.png" });

  let pl = [];
  pl = { pointList };
  console.log(pl);

  return (
    <div>
      <MapContainer
        className={style.map}
        center={[37.389571, 24.881624]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map((point) => {
          return (
            <div>
              <Marker position={[point.lat, point.lon]} icon={customIcon}>
              </Marker>
              <div>a {point.lat + "  " + point.lon}</div>
            </div>
          );
        })}
        
        <Marker position={[37.389571 + loc1[0], 24.881624 + loc1[1]]} icon={customIcon2}>
              </Marker>
        
      </MapContainer>
      {/* <p>location: {loc1[0] + "\n" + loc1[1]}
  </p> */}
    </div>
  );
}

export default Map;
