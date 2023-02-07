import styles from "../styles/Setup.module.css";
import Navbar from "../components/navbar";

export default function Setup() {
  return (
    <div>
        <center className={styles.title}>
      Setup</center>
      <Navbar active="setup" />
      <style jsx global>{`
        body {
          background: #09a1c8;
        }
      `}</style>
    </div>
  );
}
