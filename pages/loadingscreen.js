import React, {useState} from "react";
import Head from "next/head";
import styles from "../styles/LoadingScreen.module.css";
import Link from "next/link";

export default function LoadingScreen() {

  return (
    <div className="wrapper">
      <Head>
        <title>SAIL APP</title>
      </Head>
      <div className="image">
        <Link href="/register">
          <img src="SplashLogo.png" />
        </Link>
      </div>
      <div className={styles.title}>ULL SAIL</div>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            text-align: center;
            flex-direction: column;
            padding: 0 0.5rem;
            justify-content: center;
            align-items: center;
          }

          .image {
            margin-top: 12%;
          }
        `}
      </style>

      <style jsx global>{`
        html {
          height: 100%;
        }
        body {
          height: 100%;
          background: linear-gradient(
            0deg,
            rgba(40, 151, 222, 1) 0%,
            rgba(0, 212, 255, 1) 100%
          );
          background-attachment: fixed;
          font-family: ConcertOne;
        }
        img {
          height: 220px;
          filter: drop-shadow(3px 3px 5px #747474);
        }
      `}</style>
    </div>
  );
}
