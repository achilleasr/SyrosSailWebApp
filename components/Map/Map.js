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
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  Tooltip,
} from "react-leaflet";
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

function Map({ pointList, play, lastSpeed }) {
  const [loc1, setLoc1] = useState([37.389571, 24.881624]);
  const [heading, setHeading] = useState(0);
  const [heading2, setHeading2] = useState(0);

  const [ler, setLer] = useState(0);
  const [ler2, setLer2] = useState(0);
  // const mapRef = useRef(null);
  let poly = [];
  if (pointList.length > 0) {
    pointList.forEach((point) => {
      let r = [point.lat, point.lon];
      poly.push(r);
    });
  }

  function calculateAngle(p1, p2) {
    // θ = atan2(Math.sin(p2.lon) * Math.cos(p1.lat+p2.lat), Math.cos(p1.lat) * Math.sin(p1.lat+p2.lat) -
    // Math.sin(p1.lat) * Math.cos(p1.lat+p2.lat) * Math.cos(p2.lon));
    if (p1 != null && p2 != null) {
      const y = Math.sin(p2.lon) * Math.cos(p1.lat + p2.lat);
      const x =
        Math.cos(p1.lat) * Math.sin(p1.lat + p2.lat) -
        Math.sin(p1.lat) * Math.cos(p1.lat + p2.lat) * Math.cos(p2.lon);
      const th = Math.atan2(y, x);
      const brng = ((th * 180.0) / Math.PI + 360) % 360; // in degrees
      // console.log(brng);

      return brng;
    } else {
      return 0;
    }
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
    let c = calculateAngle(pointList[0], lastSpeed);
    setHeading2(c);
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

  let LeafIcon3 = L.Icon.extend({
    options: {
      iconSize: [55, 55],
      iconAnchor: [10, 52],
    },
  });

  let nodeIcon = new LeafIcon({ iconUrl: "assets/circleSmall2.png" });
  let pinIcon = new LeafIcon3({ iconUrl: "assets/pin1.png" });

  let LeafIcon2 = L.Icon.extend({
    options: {
      iconSize: [40, 10],
    },
  });

  let LeafIcon4 = L.Icon.extend({
    options: {
      iconSize: [30, 11],
    },
  });
  let boatIcon1 = new LeafIcon2({ iconUrl: "assets/sailboat1tiny.png" });
  let boatIcon2 = new LeafIcon4({ iconUrl: "assets/boat2.png" });
  let boatIcon3 = new LeafIcon4({ iconUrl: "assets/boat3w.png" });
  const polyOptions = { color: "white", weight: 0.07 };
  const polyOptions2 = { color: "red", weight: 10.17 };
  //console.log(ler);

  return (
    <center className={style.mapContainer}>
      <MapContainer
        className={style.map}
        center={[37.389571, 24.881624]}
        zoom={11}
        maxZoom={17}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          // url= 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png'
          // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

          // url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
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
            icon={pinIcon}
          ></Marker>
        )}

        {/* <RotatedMarker
          position={[loc1[0], loc1[1]]}
          icon={boatIcon1}
          rotationAngle={-heading}
          rotationOrigin="center"
        ></RotatedMarker> */}

        {pointList.length == 1 ? (
          <div key={pointList[0].time}>
            {/* <Marker
              position={[pointList[0].lat, pointList[0].lon]}
              icon={boatIcon2}
            >
              <Tooltip
                direction="bottom"
                offset={[2, 30]}
                opacity={1}
                permanent
              >
                <div className={style.tooltipNames}>Lat: </div>
                {pointList[0].lat}°N
                <br />
                <div className={style.tooltipNames}>Lon: </div>
                {pointList[0].lon}°E
                <br />
                <div className={style.tooltipNames}>Humidity: </div>
                {pointList[0].humidity}%<br />
                <div className={style.tooltipNames}>Temperature: </div>
                {pointList[0].temperature}°C
                <br />
                <div className={style.tooltipNames}>Time: </div>
                {new Date(Date.parse(pointList[0].time)).toLocaleTimeString(
                  "it-IT"
                )}
              </Tooltip>
            </Marker> */}

            <RotatedMarker
              position={[pointList[0].lat, pointList[0].lon]}
              icon={boatIcon3}
              rotationAngle={heading2}
              rotationOrigin="center"
              className = {style.tooltip}
            >
              <Tooltip
                direction="bottom"
                offset={[2, 30]}
                opacity={1}
                permanent
              >
                <div className={style.tooltipNames}>Lat: </div>
                {pointList[0].lat}°N
                <br />
                <div className={style.tooltipNames}>Lon: </div>
                {pointList[0].lon}°E
                <br />
                <div className={style.tooltipNames}>Humidity: </div>
                {pointList[0].humidity}%<br />
                <div className={style.tooltipNames}>Temperature: </div>
                {pointList[0].temperature}°C
                <br />
                <div className={style.tooltipNames}>Time: </div>
                {new Date(Date.parse(pointList[0].time)).toLocaleTimeString(
                  "it-IT"
                )}
              </Tooltip>
            </RotatedMarker>

            {/* <Marker
              position={[lastSpeed.lat, lastSpeed.lon]}
              icon={pinIcon}
            ></Marker> */}
            {/* <Polyline
              pathOptions={polyOptions2}
              positions={[
                [lastSpeed.lat, lastSpeed.lon],
                [pointList[0].lat, pointList[0].lon],
              ]}
            /> */}
          </div>
        ) : (
          pointList.map((point) => {
            return (
              <div key={point.time}>
                {/* <Marker
                  position={[point.lat, point.lon]}
                  icon={nodeIcon}
                  isActive
                >
                  <Popup>
                    Lat : {point.lat}°N
                    <br />
                    Lon: {point.lon}°E
                    <br />
                    Humidity: {point.humidity}%<br />
                    Temperature: {point.temperature}°C
                    <br />
                    Time: {point.time}
                  </Popup>
                </Marker> */}
                <Polyline pathOptions={polyOptions} positions={poly} />
              </div>
            );
          })
        )}

        {/* <AirplaneMarker data={currentTrack ?? {}} /> */}
      </MapContainer>
    </center>
  );
}

export default Map;
