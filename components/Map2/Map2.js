import { Wrld, WrldMap } from "wrld-react";

class WrldIndoorControl {
  constructor(elementId, map) {
    this.elementId = elementId;
    this.map = map;
  }
}

const addCustomEntranceMarker = (event, map) => {
  let entrance = event.entrance;
  let marker = Wrld.marker([37.389571, 24.881624]).addTo(map);

  marker.on("click", function () {
    console.log("rhstdhm");
  });
};

function Map2({ api, pointList }) {
  let poly = [];
  if (pointList.length > 0) {
    pointList.forEach((point) => {
      let r = [point.lat, point.lon];
      poly.push(r);
    });
  }

  return (
    <div id="map1">
      <WrldMap
        apiKey={api}
        containerStyle={{
          width: "600px",
          height: "400px",
        }}
        mapOptions={{
          center: [
            37.389571,
            24.881624,
          ],
          zoom: 15.5,
          indoorsEnabled: true,
        }}
        onMapMount={(map) => {
          new WrldIndoorControl("wrld-indoor-control", map);
        }}
        onInitialStreamingComplete={(map) => {
          map.indoors.on("indoorentranceadd", (event) =>
            addCustomEntranceMarker(event, map)
          );
          //   map.indoors.on("indoormapenter", ({ indoorMap }) => {
          //     map.indoors.setFloor(2);
          //     map.setView([37.389571, 24.881624], 19);
          //     Wrld.polyline(poly).addTo(map);
          //     //   Wrld.marker([37.389571, 24.881624], {
          //     //     indoorMapId: indoorMap.getIndoorMapId(),
          //     //     indoorMapFloorId: 2
          //     //   }).addTo(map);
          //   });
          //   // map.indoors.enter("westport_house");
        }}
      >
        <div
          id={"wrld-indoor-control"}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            bottom: "40px",
          }}
        ></div>
      </WrldMap>
      <script>Wrld.polyline(poly).addTo(map);</script>
    </div>
  );
}

export default Map2;
