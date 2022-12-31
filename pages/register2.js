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
    <div className={styles.wrapper}>
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="assets/SplashLogo.png" className={styles.image} />
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



      <style jsx global>{`
        html {
          height: 100%;
        }
        body {
          height: 100%;
          background: #09A1C8;
          background-attachment: fixed;
          font-family: Concert One;
        }
        form {
          display: flex;
          width: 60%;
          flex-direction: column;
        }
        input {
          color: black;
          font-family: Concert One;
          padding: 10px;
          padding-left: 17px;
          border: 0px;
          margin: 6px;
          height: 2rem;
          border-radius: 100px;
          font-size: 1.1rem;
          // box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.16);
        }
        input::placeholder {
          font-family: Concert One;
        }

        input:hover {
          box-shadow: 0 0 15px 4px rgba(222, 222, 222, 0.2);
        }
      `}</style>
    </div>
  );
}
