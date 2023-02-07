import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

const navbar = ({active}) => {
  // console.log(active);
  return (
    <div className={styles.mainnav}>
      <div className={styles.item}>
          <Link className={styles.navLink} href="/sessions" >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4286 9.59844H18.8571V18.3575L26.1943 22.8072L27.4286 20.6875L21.4286 17.0437V9.59844ZM20.5714 0.839355C16.4795 0.839355 12.5552 2.50045 9.66178 5.45722C6.76836 8.41398 5.14286 12.4242 5.14286 16.6057H0L6.78857 23.6655L13.7143 16.6057H8.57143C8.57143 13.3534 9.83571 10.2344 12.0861 7.93466C14.3366 5.63495 17.3888 4.34299 20.5714 4.34299C23.754 4.34299 26.8063 5.63495 29.0567 7.93466C31.3071 10.2344 32.5714 13.3534 32.5714 16.6057C32.5714 19.858 31.3071 22.9771 29.0567 25.2768C26.8063 27.5765 23.754 28.8684 20.5714 28.8684C17.2629 28.8684 14.2629 27.4845 12.1029 25.2597L9.66857 27.7473C11.094 29.2199 12.7923 30.3874 14.6643 31.1814C16.5364 31.9755 18.5445 32.3803 20.5714 32.3721C24.6633 32.3721 28.5877 30.711 31.4811 27.7542C34.3745 24.7974 36 20.7872 36 16.6057C36 12.4242 34.3745 8.41398 31.4811 5.45722C28.5877 2.50045 24.6633 0.839355 20.5714 0.839355"
                fill={active == "sessions" ? ("#3FAEFF") : ("black")}
              />
            </svg>
          </Link>
      </div>

      <div className={styles.item}>
          <Link className={styles.navLink} href="/menu">
            <svg
              width="36"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.75 4.5L30.51 4.545L22.5 7.65L13.5 4.5L5.04 7.35C4.725 7.455 4.5 7.725 4.5 8.07V30.75C4.5 31.17 4.83 31.5 5.25 31.5L5.49 31.455L13.5 28.35L22.5 31.5L30.96 28.65C31.275 28.545 31.5 28.275 31.5 27.93V5.25C31.5 4.83 31.17 4.5 30.75 4.5ZM15 8.205L21 10.305V27.795L15 25.695V8.205ZM7.5 9.69L12 8.175V25.725L7.5 27.465V9.69ZM28.5 26.31L24 27.825V10.29L28.5 8.55V26.31Z"
                fill={active == "live" ? ("#3FAEFF") : ("black")}
              />
              <path
                d="M35.5452 6.33694C35.5452 8.43648 33.7642 10.1739 31.5226 10.1739C29.281 10.1739 27.5 8.43648 27.5 6.33694C27.5 4.2374 29.281 2.5 31.5226 2.5C33.7642 2.5 35.5452 4.2374 35.5452 6.33694Z"
                stroke="#3FAEFF"
              />
              <path
                d="M31.5227 10.3131C33.7809 10.3131 35.6477 8.55242 35.6477 6.33689C35.6477 4.12137 33.7809 2.36072 31.5227 2.36072C29.2645 2.36072 27.3977 4.12137 27.3977 6.33689C27.3977 8.55242 29.2645 10.3131 31.5227 10.3131Z"
                fill="#73EF78"
                stroke="#0B7789"
              />
            </svg>
          </Link>
      </div>

      <div className={styles.item}>
        <Link className={styles.navLink} href="/setup">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="16.5" stroke={active == "setup" ? ("#3FAEFF") : ("black")} strokeWidth="3" />
            <path
              d="M27 19.7143H19.7143V27H17.2857V19.7143H10V17.2857H17.2857V10H19.7143V17.2857H27V19.7143Z"
              fill={active == "setup" ? ("#3FAEFF") : ("black")}
            />
          </svg>
        </Link>
      </div>
      <style jsx global>{`
        a {
          text-decoration: none;
          color: white;
          display: block;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default navbar;
