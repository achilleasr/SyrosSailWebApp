import "leaflet/dist/leaflet.css";
import style from "../../styles/Home.module.css";
import Image from "next/image";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Map({ items , pointList }) {
  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [20,20],
    },
  });

  let customIcon = new LeafIcon({iconUrl:"/pin1.png"});

  let pl = [];
  pl = {pointList};
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
              <Marker position={[point.lat, point.lon]} icon = {customIcon}> </Marker>
              <div>a {point.lat + "  " + point.lon}</div>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
