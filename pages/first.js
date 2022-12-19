import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../styles/Home.module.css";

export default function First() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });

  return (
    <div className="container">
      <center style={{backgroundImage: `url("d.jpg")`,
          width: '100%',
          height: '100%',}}>
        <div className={styles.bg}>
          <a href="./">Go Back</a>
        </div>
        <Unity
          style={{ width: "600px", height: "600px" }}
          unityProvider={unityProvider}
        />
      </center>

      <style jsx>{`
        .container {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: black;
          color:white;
          
        }
        `}</style>

    </div>
  );
}
