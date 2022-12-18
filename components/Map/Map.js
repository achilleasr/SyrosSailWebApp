import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import style from '../../styles/Home.module.css'

function Map() {
  return (
    <MapContainer className={style.map} center={[37.389571, 24.881624]} zoom={11} scrollWheelZoom={true}>
      <TileLayer 
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
