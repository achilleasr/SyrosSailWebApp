import styles from "../styles/Sessions.module.css";
import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import ListItem2 from "../components/Point";
import Map from "../components/Map";
import Link from "next/link";

export default function Sessions({ token, org, url }) {
  const [points, setPoints] = useState([]);
  const [isOnMap, setIsOnMap] = useState(false);


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

  function backPressed() {
    setIsOnMap(false);
  }

  return (
    <div>
      {isOnMap == true ? (
        <div>
          <div className={styles.wrapper}>
            <Map pointList={points} />
            <Link className={styles.backButton} href="/sessions"  onClick={backPressed} >
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.8438 28.9917L1.19383 16.3417C1.00216 16.15 0.866081 15.9424 0.785581 15.7187C0.706359 15.4951 0.666748 15.2556 0.666748 15C0.666748 14.7444 0.706359 14.5049 0.785581 14.2812C0.866081 14.0576 1.00216 13.85 1.19383 13.6583L13.8438 1.00833C14.1952 0.656939 14.6341 0.47294 15.1606 0.456329C15.6883 0.440996 16.1438 0.624995 16.5272 1.00833C16.9105 1.35972 17.1105 1.79863 17.1271 2.32508C17.1424 2.8528 16.9584 3.30833 16.5751 3.69166L7.18341 13.0833H28.6022C29.1452 13.0833 29.6007 13.2667 29.9688 13.6334C30.3355 14.0014 30.5188 14.4569 30.5188 15C30.5188 15.5431 30.3355 15.9979 29.9688 16.3647C29.6007 16.7327 29.1452 16.9167 28.6022 16.9167H7.18341L16.5751 26.3083C16.9265 26.6597 17.1105 27.1069 17.1271 27.65C17.1424 28.1931 16.9584 28.6403 16.5751 28.9917C16.2237 29.375 15.7765 29.5667 15.2334 29.5667C14.6904 29.5667 14.2272 29.375 13.8438 28.9917Z" fill="black"/>
</svg>
</Link>

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
