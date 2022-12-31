import React from "react";
import Head from "next/head";
import styles from "../styles/Register.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <div className="wrapper">
      <Head>
        <title>SAIL APP</title>
      </Head>
      <div className={styles.title}>I am a: </div>

      <div className={styles.buttonsWrapper}>
        <div className={styles.buttone}>
          <Link
            href={{
              pathname: "/register2",
              query: { name: "Coach" },
            }}
          >
            COACH
          </Link>
        </div>

        <div className={styles.buttone}>
          <Link
            href={{
              pathname: "/register2",
              query: { name: "Sailor" },
            }}
          >
            SAILOR
          </Link>
        </div>

        <div className={styles.buttone}>
          <Link
            href={{
              pathname: "/register2",
              query: { name: "Viewer" },
              state: { nooma: "pin" },
            }}  
          >
            VIEWER
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            text-align: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
        `}
      </style>

      <style jsx global>{`
        html {
          height: 100%;
        }
        body {
          height: 100%;
          background-image: url("assets/bg6.png");
          background-size: cover;
          background-repeat: no-repeat;
          font-family: ConcertOne;
          background-position: 80% 5%;
        }
        a {
          color: #ff8a00;
          text-decoration: none;
          display: block;
          height: 3.5rem;
          width: 170px;
        }
      `}</style>
    </div>
  );
}
