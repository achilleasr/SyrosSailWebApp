import Head from "next/head";
import styles from "../styles/First.module.css";
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
  const [play, setPlay] = useState(false);
  const router = useRouter();

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
      for (let i = 0; i < data.length; i += 4) {
        let n = {
          humidity: data[i]._value,
          lat: data[i + 1]._value,
          lon: data[i + 2]._value,
          temperature: data[i + 3]._value,
          time: data[i]._time,
          key: i/4,
        };

        p.push(n);
      }

      console.log(p);
      setPoints(p);
    }
  }

  function BtnPressed() {
    collectRows(fluxQuery);
  }

  function BtnPressed2() {
    collectRows(fluxQueryTTN);
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
        <h1 className={styles.title}>
          INFLUXDB Cloud με next.js
          <a href="/d">
            <img className={styles.danibtn} src="/assets/d.jpg" />
          </a>
        </h1>

        <a href="/nextpage"> NNNNNN </a>
        <button type="button" onClick={handleClick}>
          NextPage
        </button>
        {/* 
        <h3>3D <input type="checkbox" id="myCheck" onChange={handleChange}/> </h3> 
        {isSubscribed == true && (

          // <Map2 api={api} pointList={points}/>

        ) }
         */}
        <div
          className="Wrapper"
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              float: "left",
              width: "40%",
            }}
          >
            <center>
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

          <div
            style={{
              float: "right",
              width: "50%",
              textAlign: "center",
            }}
          >
            Map
          </div>
          <Map style={{ align: "center" }} pointList={points} play={play} />
        </div>
      </main>

      <footer></footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
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
