import React, { useState, useEffect } from "react";
import Head from "next/head";
// import "@fontsource/concert-one";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import useSWR from "swr";
// import ttn from "ttn";
// import mqtt from "mqtt";

// const fetcher = (url) => fetch(url).then((r) => r.json());

// function Profile() {
//   const { data, error, isLoading } = useSWR("/api/ttn3", fetcher);

//   if (error) return <div>failed to load</div>;
//   if (isLoading) return <div>loading...</div>;
//   return <div>hello {JSON.stringify(data)}!</div>;
// }

export default function App({ appId, accessKey }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  // const client = mqtt.connect(
  //   "wss://" +
  //     appId +
  //     ":" +
  //     accessKey +
  //     "@eu1.cloud.thethings.network:8883"
  // );
  // client.subscribe("#");
  // client.on("message", (topic, message) => {
  //   console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // });
  // const client = new ttn.Client(
  //   'staging',
  //   appId,
  //   accessKey
  // );

  // client.on("uplink", (devId, payload) => {
  //   console.log(payload);
  // });

  // client.on('error', (err) => {
  //   console.log(err);
  // });

  // client.on('connect', (connack) => {
  //   console.log('Connect:', connack);
  // });

  // const requestBody = useSelector((state) => state.requestBody);
  // console.log(requestBody);

  // useEffect(() => {
  //   if (requestBody) {
  //     console.log(requestBody);
  //   }
  // }, [requestBody]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="assets/SplashLogo.png" className={styles.image} />
      <div className={styles.title}>Login</div>

      <form action="/menu" method="post">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className={styles.input1}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={styles.input1}
          required
        />

        <button
          className={styles.button}
          type="button"
          onClick={() => router.push("/menu")}
        >
          
          Log In
        </button>

      </form>
      <div className={styles.registerWrapper}>
        <div className={styles.noAccount}>Don't have an account?</div>
        <button
          className={styles.button}
          type="button"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
      <footer className={styles.footer}>
        <Link href="/debug">d</Link>
      </footer>

      <style jsx global>{`
        html {
          // height: 100%;
          font-family: "Comfortaa";
        }
        body {
          height: 100%;
          background: #09a1c8;
          background-attachment: fixed;
          font-family: "Comfortaa";
        }
        form {
          display: flex;
          // width: 60%;
          text-align: center;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        input:hover {
          box-shadow: 0 0 15px 4px rgba(222, 222, 222, 0.2);
        }
        a {
          text-decoration: none;
          color: white;
          display: block;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const appId1 = process.env.APP_ID;
  const accessKey1 = process.env.ACCESS_KEY;

  return {
    props: {
      appId: appId1,
      accessKey: accessKey1,
    },
  };
}
