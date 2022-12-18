import L from 'leaflet';

const iconPerson = L.Icon.extend({
  options: {
    iconUrl: require('/public/pin1.png'),
    iconRetinaUrl: require('/public/pin1.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  }
});

export { iconPerson };