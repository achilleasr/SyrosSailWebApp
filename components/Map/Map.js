import style from "../../styles/First.module.css";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet-rotatedmarker";
// import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
// import {lerp} from "lerp";

let index = 0;

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

function Map({ pointList, play }) {
  const [loc1, setLoc1] = useState([37.389571, 24.881624]);
  const [heading, setHeading] = useState(0);
  const [ler, setLer] = useState(0);
  const [ler2, setLer2] = useState(0);

  let poly = [];
  if (pointList.length > 0) {
    pointList.forEach((point) => {
      let r = [point.lat, point.lon];
      poly.push(r);
    });
  }

  function lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  }

  function pointLerp(p1, p2, t) {
    p3 = {
      lat: lerp(p1.lat, p2.lat, t),
      lon: lerp(p1.lon, p2.lon, t),
    };
    return p3;
  }

  //console.log(Math.floor(ler2/101));
  //console.log(play);
  let cbFunc = useCallback(() => {
    setLoc1([
      37.389471 + 0.001 * Math.sin(Date.now() * 0.001),
      24.870624 + 0.001 * Math.cos(Date.now() * 0.001),
    ]);
    setHeading((heading) => heading + 5);
    //if (play) {
    setLer((ler) => (ler + 2) % 101);
    setLer2((ler2) => ler2 + 2);
    //}
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      cbFunc();
    }, 50);

    return () => clearInterval(interval);
  }, []);

  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [5, 5],
    },
  });

  let nodeIcon = new LeafIcon({ iconUrl: "assets/circleSmall2.png" });

  let LeafIcon2 = L.Icon.extend({
    options: {
      iconSize: [40, 10],
    },
  });
  let boatIcon1 = new LeafIcon2({ iconUrl: "assets/sailboat1tiny.png" });

  const polyOptions = { color: "black", weight: 0.05 };
  //console.log(ler);

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
        {pointList.length > 1 && (
          <Marker
            position={[
              lerp(
                pointList[parseInt(ler2 / 101) % (pointList.length - 1)].lat,
                pointList[(parseInt(ler2 / 101) % (pointList.length - 1)) + 1]
                  .lat,
                ler * 0.01
              ),
              lerp(
                pointList[parseInt(ler2 / 101) % (pointList.length - 1)].lon,
                pointList[(parseInt(ler2 / 101) % (pointList.length - 1)) + 1]
                  .lon,
                ler * 0.01
              ),
            ]}
            icon={nodeIcon}
          ></Marker>
        )}

        <RotatedMarker
          position={[loc1[0], loc1[1]]}
          icon={boatIcon1}
          rotationAngle={-heading}
          rotationOrigin="center"
        ></RotatedMarker>

        {pointList.map((point) => {
          return (
            <div key={point.time}>
              {/* <Marker
                position={[point.lat, point.lon]}
                icon={nodeIcon}
              ></Marker> */}
              <Polyline pathOptions={polyOptions} positions={poly} />
            </div>
          );
        })}

        {/* <AirplaneMarker data={currentTrack ?? {}} /> */}
      </MapContainer>
    </center>
  );
}

export default Map;
