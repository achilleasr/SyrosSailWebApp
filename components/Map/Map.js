import "leaflet/dist/leaflet.css";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import "leaflet-rotatedmarker";

const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();

  const { rotationAngle, rotationOrigin } = props;
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
      marker.setRotationOrigin(rotationOrigin);
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );
});

function Map({ pointList }) {
  const [loc1, setLoc1] = useState([37.389571, 24.881624]);
  const [heading, setHeading] = useState(300);

  let poly = [];
  if (pointList.length > 0) {
    pointList.forEach((point) => {
      let r = [point.lat, point.lon];
      poly.push(r);
    });
    //console.log("calc poly list " + poly);
  }

  const cbFunc = useCallback(() => {
    setLoc1([
      37.389471 + 0.001 * Math.sin(Date.now() * 0.001),
      24.870624 + 0.001 * Math.cos(Date.now() * 0.001),
    ]);
    setHeading((heading) => heading + 5);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      cbFunc();
    }, 50);

    return () => clearInterval(interval);
  }, []);

  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [6, 6],
      // iconAnchor: [5,30],
    },
  });

  let nodeIcon = new LeafIcon({ iconUrl: "/circleSmall2.png" });

  let LeafIcon2 = L.Icon.extend({
    options: {
      iconSize: [40, 10],
    },
  });
  let boatIcon1 = new LeafIcon2({ iconUrl: "/sailboat1tiny.png" });

  const limeOptions = { color: "lime" };

  return (
    <center>
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

        <RotatedMarker
          position={[loc1[0], loc1[1]]}
          icon={boatIcon1}
          rotationAngle={heading}
          rotationOrigin="center"
        ></RotatedMarker>

        {pointList.map((point) => {
          return (
            <div key={point.time}>
              <Marker
                position={[point.lat, point.lon]}
                icon={nodeIcon}
              ></Marker>
              <Polyline pathOptions={limeOptions} positions={poly} />
            </div>
          );
        })}
      </MapContainer>
    </center>
  );
}

export default Map;
