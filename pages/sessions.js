import styles from "../styles/Sessions.module.css";
import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import ListItem2 from "../components/Point";
import Map from "../components/Map";
// import { useRouter } from "next/navigation";

export default function Sessions({ token, org, url }) {
  const [points, setPoints] = useState([]);
  const [isOnMap, setIsOnMap] = useState(false);

  // const router = useRouter();

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  let fluxQuery =
    'from(bucket:"SailData") |> range(start: -1000d) |> filter(fn: (r) => r._measurement == "m1")';

  let fluxQueryTTN =
    'from(bucket:"TTN_SailData") |> range(start: -1000d) |> filter(fn: (r) => r["_measurement"] == "sensor_data")';

  async function collectRows(fluxQ) {
    let data = await queryApi.collectRows(fluxQ);
    console.log("\nCollect ROWS SUCCESS");

    data = [...data].sort((a, b) => a._field.localeCompare(b._field));
    data = [...data].sort((a, b) => new Date(a._time) - new Date(b._time));

    let p = [];
    setPoints([]);
    let newp = {};
    if (fluxQ == fluxQuery) {
      for (let i = 0; i < data.length; i += 2) {
        if (data[i]._field == "lon") {
          newp = {
            lon: data[i]._value,
            lat: data[i + 1]._value,
            time: data[i]._time,
            key: data[i]._time,
          };
          p.push(newp);
        } else {
          newp = {
            lon: data[i + 1]._value,
            lat: data[i]._value,
            time: data[i]._time,
            key: data[i]._time,
          };
          p.push(newp);
        }
      }

      setPoints(p);
    } else {
      let ptime = 0;
      if (data.length > 3) {
        for (let i = 0; i < data.length; i += 4) {
          let n = {
            humidity: data[i]._value,
            lat: data[i + 1]._value,
            lon: data[i + 2]._value,
            temperature: data[i + 3]._value,
            time: data[i]._time,
            key: i / 4,
          };

          p.push(n);
        }

        console.log(p);
        setPoints(p);
      }
    }
  }

  function BtnPressed() {
    collectRows(fluxQuery);
    setIsOnMap(true);
  }

  function BtnPressed2() {
    collectRows(fluxQueryTTN);
    setIsOnMap(true);
  }

  return (
    <div>
      {isOnMap == true ? (
        <div>
          <div className={styles.wrapper}>
            <Map pointList={points} />
          </div>
        </div>
      ) : (
        <div>
          <center className={styles.title}>Sessions</center>
          <div className={styles.grid}>
            <figure>
              <img
                src="assets/ses1.png"
                onClick={BtnPressed}
                className={styles.image}
              />
              <figcaption className={styles.text}>8/8/23</figcaption>
            </figure>
            <figure>
              <img
                src="assets/ses2.png"
                onClick={BtnPressed2}
                className={styles.image}
              />
              <figcaption className={styles.text}>7/2/23</figcaption>
            </figure>
          </div>
        </div>
      )}

      <Navbar active="sessions" />
      <style jsx global>{`
        body {
          background: #09a1c8;
        }
        button {
          backfround: rgba(0, 0, 0, 0);
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const org1 = process.env.INFLUX_ORG;
  const token1 = process.env.INFLUX_TOKEN;
  const url1 = process.env.INFLUX_URL;

  return {
    props: {
      org: org1,
      token: token1,
      url: url1,
    },
  };
}
