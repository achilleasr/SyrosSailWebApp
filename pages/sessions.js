import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../styles/First.module.css";
import Navbar from "../components/navbar";

export default function Sessions() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build2/Build.loader.js",
    dataUrl: "Build2/Build.data",
    frameworkUrl: "Build2/Build.framework.js",
    codeUrl: "Build2/Build.wasm",
  });

  return (
    <div className="container">
      <center
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={styles.bg}>
          <a href="./">Go Back</a>
        </div>
        <Unity
          style={{ width: "100%", height: "500px" }}
          unityProvider={unityProvider}
        />
      </center>
      <Navbar />
      <style jsx>{`
        .container {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
        }
      `}</style>

      <style jsx global>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  );
}
