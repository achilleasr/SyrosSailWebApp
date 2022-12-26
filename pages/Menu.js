import React from "react";
import Head from "next/head";
import styles from "../styles/Register2.module.css";
import { useRouter } from "next/router";


export default function Menu() {
  return (
      <div className="wrapper">
        <Head>
          <title>SAIL APP</title>
        </Head>
        <img src="duckBoat.png" className="image" />
        
        
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
              margin-top: 6%;
              height: 160px;
              filter: drop-shadow(3px 3px 5px #747474);
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
        `}</style>
        
      </div>
  );
}
