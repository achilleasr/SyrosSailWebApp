import React, { useState, useEffect } from "react";
import Head from "next/head";

import styles from "../styles/Index.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function App({ appId, accessKey }) {
  const router = useRouter();


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
