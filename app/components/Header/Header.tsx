"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css["header-content"]}>
        <Link href="/" className={css.logo}>
          <Image
            src="/Icons/TravelTrucks.svg"
            alt="Logo"
            width={136}
            height={16}
            className={css.icon}
          />
        </Link>
        <div className={css["header-links"]}>
          <Link
            href="/"
            className={`${css.link} ${pathname === "/" ? css.active : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${css.link} ${pathname === "/catalog" ? css.active : ""}`}
          >
            Catalog
          </Link>
        </div>
      </div>
    </header>
  );
}
