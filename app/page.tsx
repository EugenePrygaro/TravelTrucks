"use client";

import styles from "./Home.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

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
