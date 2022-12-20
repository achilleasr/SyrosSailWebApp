import "leaflet/dist/leaflet.css";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import React, { useState, useEffect } from "react";
// import {forwardRef, useImperativeHandle, useRef} from 'react';


function Map({ pointList }) {
  //const [loc1,setLoc1] = useState([37.389571 + 0.001*Math.random(), 24.881624 + 0.001*Math.random()]);
  let poly = [];
  if(pointList.length>0){
    
    pointList.forEach(point => {
      let r = [point.lat, point.lon];
      poly.push(r);
    });
    console.log("calc poly list " + poly);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLoc1([37.389571 + 0.001*Math.random(), 24.881624 + 0.001*Math.random()]);
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, []);

  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      iconAnchor: [5,30],
    },
  });

  let customIcon = new LeafIcon({ iconUrl: "/pin1.png" });

  let LeafIcon2 = L.Icon.extend({
    options: {
      iconSize: [40, 10],
    },
  });
  let customIcon2 = new LeafIcon2({ iconUrl: "/sailboat1tiny.png" });

  const limeOptions = { color: 'lime' }

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

        {pointList.map((point) => {
          return (
            <div>
              <Marker
                position={[point.lat, point.lon]}
                icon={customIcon}
              ></Marker>
              <Polyline pathOptions={limeOptions} positions={poly} />
            </div>
          );
        })}
        
        {/* <Marker
          position={[loc1[0],loc1[1]]}
          icon={customIcon2}
        ></Marker> */}
        
      </MapContainer>

    </div>
  );
}

export default Map;
