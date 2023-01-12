import React, { useState , useEffect} from "react";
import Head from "next/head";
// import "@fontsource/concert-one";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useSWR from 'swr';



const fetcher = (url) => fetch(url).then(r => r.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/ttn2', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {JSON.stringify(data)}!</div>
}

export default function App() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  const requestBody = useSelector((state) => state.requestBody);
  console.log(requestBody);

  useEffect(() => {
    if (requestBody) {
      console.log(requestBody);
    }
  }, [requestBody]);

  // console.log(checked);


  return (
    <div className={styles.wrapper}>
      <Head>
        <title>SAIL APP</title>
      </Head>
      <img src="assets/SplashLogo.png" className={styles.image} />
      <div className={checked ? styles.title2 : styles.title}>Login</div>
      <Profile />
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
          className={checked ? styles.button2 : styles.button}
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
          className={checked ? styles.button2 : styles.button}
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
          background: #09a1c8;
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
