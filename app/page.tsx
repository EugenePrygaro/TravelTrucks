"use client";

import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={`${styles["home-container"]} container`}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.text}>
          You can find everything you want in our catalog
        </p>
        <Link className={styles.button} href="/catalog">
          View Now
        </Link>
      </div>
    </section>
  );
}
