import css from "./CamperCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { getCamperCoverImage } from "@/lib/utils";
import { Camper } from "@/types/camper";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const imageUrl = getCamperCoverImage(camper);

  return (
    <div className={css.card}>
      <Image
        src={imageUrl}
        alt={camper.description}
        width={219}
        height={240}
        className={css.image}
      />
      <div className={css.details}>
        <div className={css.header}>
          <h2 className={css.title}>{camper.name}</h2>
          <span className={css.price}>€{camper.price}</span>
        </div>

        <div className={css.subHeader}>
          <span className={css.rating}>
            <Image
              src="/icons/star.svg"
              alt="rating star icon"
              width={16}
              height={16}
              className={css.icon}
            />
            {camper.rating}({camper.totalReviews} Reviews)
          </span>
          <span className={css.location}>
            <Image
              src="/icons/map.svg"
              alt="location map icon"
              width={16}
              height={16}
              className={css.icon}
            />
            {camper.location}
          </span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.badges}>
          <li className={css.badge}>
            <Image
              src="/icons/engine.svg"
              alt="engine type icon"
              width={20}
              height={20}
              className={css.icon}
            />
            {camper.engine}
          </li>
          <li className={css.badge}>
            <Image
              src="/icons/transmition.svg"
              alt="transmition type icon"
              width={20}
              height={20}
              className={css.icon}
            />
            {camper.transmission}
          </li>
          <li className={css.badge}>
            <Image
              src="/icons/form.svg"
              alt="form type icon"
              width={20}
              height={20}
              className={css.icon}
            />
            {camper.form}
          </li>
        </ul>

        <Link href={`/catalog/${camper.id}`} className={css.button}>
          Show more
        </Link>
      </div>
    </div>
  );
}
