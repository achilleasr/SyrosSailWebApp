import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/First.module.css";
import { useRouter } from "next/router";
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import Navbar from "../components/navbar";
import Map from "../components/Map";
// import ListItem2 from "../components/Point";

export default function Menu({ token, org, url }) {
  const [points, setPoints] = useState([]);
  const [lastSpeed, setLastSpeed] = useState({});
  const [play, setPlay] = useState(false);
  const [liveRepeat, setLiveRepeat] = useState(true);
  const [recording, setRecording] = useState(false);

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  // let fluxQuery =
  //   'from(bucket:"SailData") |> range(start: -1000d) |> filter(fn: (r) => r._measurement == "m1")';

  // let fluxQueryTTN =
  //   'from(bucket:"TTN_SailData") |> range(start: -1000d) |> filter(fn: (r) => r["_measurement"] == "sensor_data")';

  let fluxQueryLatest = `from(bucket: "TTN_SailData")
  |> range(start: -30m)
  |> filter(fn: (r) => r["_measurement"] == "sensor_data")
  |> last()`;

  let fluxQueryDifference = `from(bucket: "TTN_SailData")
  |> range(start: -30m)
  |> filter(fn: (r) => r["_measurement"] == "sensor_data")
  |> difference()
  |> last()`;

  async function getCurrent(fluxQ) {
    let data = await queryApi.collectRows(fluxQ);
    let diff = await queryApi.collectRows(fluxQueryDifference);
    // console.log("\nCollect LIVE SUCCESS");
    data = [...data].sort((a, b) => a._field.localeCompare(b._field));
    diff = [...diff].sort((a, b) => a._field.localeCompare(b._field));
    let p = [];
    let speed = {};
    setPoints([]);
    setLastSpeed({});

    if (data.length > 3 && diff.length > 3) {
      let n = {
        humidity: data[0]._value,
        lat: data[1]._value,
        lon: data[2]._value,
        temperature: data[3]._value,
        time: data[0]._time,
        key: 0,
      };
      let s = {
        lat: data[1]._value + diff[1]._value,
        lon: data[2]._value + diff[2]._value,
      };

      p.push(n);
      setPoints(p);
      setLastSpeed(s);
    }
  }

  if (liveRepeat) {
    const timer = setTimeout(() => {
      getCurrent(fluxQueryLatest);
    }, 2000);
  }
  async function collectRows(fluxQ) {
    let data = await queryApi.collectRows(fluxQ);
    //data.forEach((x) => console.log(JSON.stringify(x)));
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

  function BtnPressed3() {
    setPoints([]);
    if (liveRepeat == false) {
      console.log("live enabled");
      setLiveRepeat(true);
    } else {
      console.log("live stopped");
      setLiveRepeat(false);
      setPoints([]);
    }
  }

  function BtnPressedRecord() {
    if (recording == false) {
      console.log("recording start");
      setRecording(true);
    } else {
      console.log("recording stopped");
      setRecording(false);
    }
  }

  return (
    <div>
      <Head>
        <title>SAIL APP</title>
      </Head>
      <main>
        <Map pointList={points} play={play} lastSpeed={lastSpeed} />
        {/* <div className={styles.buttons}>
          <center style={{ padding: "20px 0px" }}>
            <button
              style={{
                width: "60%",
              }}
              onClick={BtnPressed3}
            >
              Live
            </button>
          </center>
        </div> */}

        <div onClick={BtnPressedRecord} className={styles.recordButton}>
          {recording == false ? (
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="34"
                cy="34"
                r="32"
                fill="#F05757"
                stroke="#BA4040"
                strokeWidth="4"
              />
            </svg>
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 3.5H14C8.20104 3.5 3.50003 8.20101 3.50003 14V50C3.50003 55.799 8.20104 60.5 14 60.5H50C55.799 60.5 60.5 55.799 60.5 50V14C60.5 8.20101 55.799 3.5 50 3.5Z"
                fill="#5C5C5C"
                stroke="black"
                strokeWidth="7"
              />
            </svg>
          )}
        </div>
      </main>

      <Navbar active="live"/>

      <style jsx global>{`
        html {
          // height: 100%;
          width: 100%;
        }
        body {
          height: 100%;
          width: 100%;
          margin: 0px;
          // background: linear-gradient(
          //   0deg,
          //   rgba(40, 151, 222, 1) 0%,
          //   rgba(0, 212, 255, 1) 100%
          // );
          //   background-attachment: fixed;
          //   font-family: ConcertOne;
        }

        button {
          border-radius: 20px;
          height: 2rem;
          border: 2px solid white;
          margin: 2px;
          // position: absolute;
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
