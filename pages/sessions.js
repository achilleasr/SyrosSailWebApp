import styles from "../styles/Sessions.module.css";
import Navbar from "../components/navbar";


export default function Sessions() {
    return (
        <div>
        <center className={styles.title}>
      Sessions</center>
      <Navbar active="sessions" />
      <style jsx global>{`
        body {
          background: #09a1c8;
        }
      `}</style>
    </div>
    );
  }