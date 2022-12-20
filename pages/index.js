import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { InfluxDB, FluxTableMetaData } from "@influxdata/influxdb-client";
import ListItem1 from "../components/List";
import ListItem2 from "../components/Point";
import Map from "../components/Map";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";

export default function Home({ token, org, url }) {
  const [points, setPoints] = useState([]);

  const [positions, setPositions] = useState([
    { lon: 143.26488, lat: 57.51103 },
    { lon: -144.91623, lat: -17.93533 },
    { lon: -151.64971, lat: -49.99727 },
  ]);

  const [time1, setTime1] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime1(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);
  let fluxQuery =
    'from(bucket:"SailData") |> range(start: -100d) |> filter(fn: (r) => r._measurement == "m1")';

  async function collectRows() {
    const data = await queryApi.collectRows(fluxQuery); // you can also specify a row mapper as a second argument
    //data.forEach((x) => console.log(JSON.stringify(x)));
    console.log("\nCollect ROWS SUCCESS");
    const numAscending = [...data].sort(
      (a, b) => new Date(a._time) - new Date(b._time)
    );
    //console.log(numAscending);

    let p = [];
    for (let i = 0; i < numAscending.length; i += 2) {
      if (numAscending[i]._field == "lon") {
        let newp = {
          lon: numAscending[i]._value,
          lat: numAscending[i + 1]._value,
          time: numAscending[i]._time,
        };
        p.push(newp);
      } else {
        let newp = {
          lon: numAscending[i + 1]._value,
          lat: numAscending[i]._value,
          time: numAscending[i]._time,
        };
        p.push(newp);
      }
    }

    //console.log(p);
    setPoints(p);
  }

  function BtnPressed() {
    collectRows();
  }

  function BtnPressed2() {
    collectRows();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SAIL APP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Ας δοκιμάσουμε INFLUXDB Cloud με next.js{" "}
          <a href="/first">
            <img className={styles.danibtn} src="d.jpg" />{" "}
          </a>
        </h1>

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
              {/* <button
                style={{
                  width: "60%",
                }}
                onClick={BtnPressed2}
              >
                Route 2
              </button> */}

              {points.map((point) => {
                return (
                  <div
                    key={point.time}
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
          <Map style={{ align: "center" }} pointList={points} />
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

  return {
    props: {
      org: org1,
      token: token1,
      url: url1,
    },
  };
}
