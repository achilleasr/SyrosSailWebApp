import styles from "../styles/Setup.module.css";
// import Navbar from "../components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function AccountCreated() {
  const router = useRouter();

  function next() {
    console.log("nextPage");
    // e.preventDefault();
    router.push("/menu");
  };

  const yourFunction = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    next();
  };

  yourFunction();
  return (
    <Link href="/menu">
      <center className={styles.title}>Account Created ! </center>
      {/* <Navbar active="setup" /> */}
      <style jsx global>{`
        body {
          background: #09a1c8;
        }
        a {
          text-decoration: none;
          color: white;
          display: block;
        }
      `}</style>
    </Link>
  );
}
