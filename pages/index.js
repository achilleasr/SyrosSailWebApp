import React from "react";
import Head from "next/head";
import styles from "../styles/Index.module.css";
import Link from "next/link";

export default function App() {
  return (
    <div className="wrapper">
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="SplashLogo.png" className="image" />
      <div className={styles.title}>Login</div>

      <form action="/menu" method="post">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        {/* <button type="submit" className={styles.button}>
          Log In
        </button> */}

        <div className={styles.button}>
          <Link href="/menu">Log In</Link>
        </div>
      </form>
      <div className={styles.registerWrapper}>
        <div className={styles.noAccount}>Don't have an account?</div>
        {/* <form action="/loadingscreen" method="post">
          <button className={styles.button}>Register</button>
          </form> */}
        <div className={styles.button}>
          <Link href="/register">Register</Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <Link href="/debug">d</Link>
      </footer>
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

          .login {
            margin-top: 26px;
            margin-bottom: 40px;
          }

          .image {
            margin-top: 4%;
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
        form {
          display: flex;
          width: 60%;
          flex-direction: column;
        }
        input {
          color: black;
          font-family: ConcertOne;
          padding: 10px;
          padding-left: 20px;
          border: 0px;
          margin: 5px;
          height: 2rem;
          border-radius: 100px;
          font-size: 24px;
          box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.16);
        }
        input::placeholder {
          font-family: ConcertOne;
          font-size: 24px;
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
