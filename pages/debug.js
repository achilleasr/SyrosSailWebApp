import Head from "next/head";
import styles from "../styles/Debug.module.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import ListItem1 from "../components/List";
import ListItem2 from "../components/Point";
import Map from "../components/Map";
// import Map2 from "../components/Map2";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home({ token, org, url, api }) {
  const [points, setPoints] = useState([]);
  const [lastSpeed, setLastSpeed] = useState({});
  const [play, setPlay] = useState(false);
  const router = useRouter();
  const [liveRepeat, setLiveRepeat] = useState(false);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("✅ Checkbox is checked");
    } else {
      console.log("⛔️ Checkbox is NOT checked");
    }
    setIsSubscribed((current) => !current);
  };

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  let fluxQuery =
    'from(bucket:"SailData") |> range(start: -1000d) |> filter(fn: (r) => r._measurement == "m1")';

  let fluxQueryTTN =
    'from(bucket:"TTN_SailData") |> range(start: -1000d) |> filter(fn: (r) => r["_measurement"] == "sensor_data")';

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

    // console.log(data.length);
    
    if (data.length > 3) {
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

  function BtnPressed() {
    collectRows(fluxQuery);
    setLiveRepeat(false);
  }

  function BtnPressed2() {
    collectRows(fluxQueryTTN);
    setLiveRepeat(false);
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

  const handleClick = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: "/nextpage",
        query: { noom: "NOOMMMM" },
      },
      "/nextpage"
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SAIL APP</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <main>
        {/* <h1 className={styles.title}>
          INFLUXDB Cloud με next.js
          <a href="/d">
            <img className={styles.danibtn} src="/assets/d.jpg" />
          </a>
        </h1>

        <a href="/nextpage"> NNNNNN </a>
        <button type="button" onClick={handleClick}>
          NextPage
        </button> */}
        {/* 
        <h3>3D <input type="checkbox" id="myCheck" onChange={handleChange}/> </h3> 
        {isSubscribed == true && (

          // <Map2 api={api} pointList={points}/>

        ) }
         */}
        <div className={styles.wrapper}>
          <Map pointList={points} play={play} lastSpeed={lastSpeed} />
          <div className={styles.buttons}>
            <center style={{ padding: "20px 0px" }}>
              <button
                style={{
                  width: "60%",
                }}
                onClick={BtnPressed}
              >
                Route 1
              </button>
              <button
                style={{
                  width: "60%",
                }}
                onClick={BtnPressed2}
              >
                Route 2
              </button>

              <button
                style={{
                  width: "60%",
                }}
                onClick={BtnPressed3}
              >
                Live
              </button>

              {points.map((point) => {
                return (
                  <div
                    key={point.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60%",
                      margin: "2px",
                      backgroundColor: "darkred",
                      fontSize: "10px",
                      color: "white",
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <ListItem2
                      lon={point.lon}
                      lat={point.lat}
                      time={point.time}
                    />
                  </div>
                );
              })}
            </center>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html {
          width: 100%;
          // background-image: url("assets/ocean-bg.jpg");
          height: 100%;
          background: linear-gradient(
            0deg,
            rgba(0, 4, 78, 1) 0%,
            rgba(75, 77, 194, 1) 44%,
            rgba(0, 198, 255, 1) 77%,
            rgba(99, 226, 255, 1) 88%,
            rgba(207, 254, 255, 1) 95%,
            rgba(238, 255, 255, 1) 100%
          );
          background-attachment: fixed;
        }
        button {
          border-radius: 20px;
          height: 2rem;
          border: 2px solid white;
          margin: 2px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const org1 = process.env.INFLUX_ORG;
  const token1 = process.env.INFLUX_TOKEN;
  const url1 = process.env.INFLUX_URL;
  // const api1 = process.env.WRLD_TOKEN;

  return {
    props: {
      org: org1,
      token: token1,
      url: url1,
      // api: api1,
    },
  };
}
