import React from "react";
import Head from "next/head";
import styles from "../styles/Register2.module.css";
import { useRouter } from "next/router";

const submitContact = async (event) => {
  event.preventDefault();
  alert(`So your name is ${event.target.username.value}?`);
};

export default function Register2() {
  let router = useRouter();
  let name = router.query["name"];


  return (
    <div className="wrapper">
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="SplashLogo.png" className="image" />
      <div className={styles.title}>New {name} Account</div>

      <form action="/menu" onSubmit={submitContact}>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="email"
          id="mail"
          name="mail"
          placeholder="YourEmail@gmail.com"
          required
        />
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>

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
            margin-top: 5rem;
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
          padding-left: 17px;
          border: 0px;
          margin: 6px;
          height: 2rem;
          border-radius: 100px;
          font-size: 1.1rem;
          box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.16);
        }
        input::placeholder {
          font-family: ConcertOne;
        }

        input:hover {
          box-shadow: 0 0 15px 4px rgba(222, 222, 222, 0.2);
        }
      `}</style>
    </div>
  );
}
