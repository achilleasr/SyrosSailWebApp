import React, { useState } from "react";
import Head from "next/head";
import "@fontsource/concert-one";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  console.log(checked);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="SplashLogo.png" className={styles.image} />
      <div className={checked ? styles.title2 : styles.title}>Login</div>
      <input
        onClick={handleClick}
        name="fontBox"
        type="checkbox"
        id="fontBox"
        className={styles.checkbox}
      />

      <form action="/menu" method="post">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className={checked ? styles.input2 : styles.input1}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={checked ? styles.input2 : styles.input1}
          required
        />
        {/* <button type="submit" className={styles.button}>
          Log In
        </button> */}
        <button
          className={styles.button}
          type="button"
          onClick={() => router.push("/menu")}
        >
          Log In
        </button>
        {/* <div className={styles.button}>
          <Link href="/menu">Log In</Link>
        </div> */}
      </form>
      <div className={styles.registerWrapper}>
        <div className={styles.noAccount}>Don't have an account?</div>
        {/* <form action="/loadingscreen" method="post">
          <button className={styles.button}>Register</button>
          </form> */}
        {/* <div className={styles.button}>
          <Link href="/register">Register</Link>
        </div> */}
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
          height: 100%;
          font-family: "Concert One";
        }
        body {
          height: 100%;
          background: linear-gradient(
            0deg,
            rgba(40, 151, 222, 1) 0%,
            rgba(0, 212, 255, 1) 100%
          );
          background-attachment: fixed;
          font-family: "Concert One";
        }
        form {
          display: flex;
          width: 60%;
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
