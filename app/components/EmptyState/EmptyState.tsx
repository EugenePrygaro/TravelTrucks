import css from "./EmptyState.module.css";
import Image from "next/image";

interface EmptyStateProps {
  onClearFilters: () => void;
  onViewAll: () => void;
}

export default function EmptyState({
  onClearFilters,
  onViewAll,
}: EmptyStateProps) {
  return (
    <div className={css.container}>
      <Image
        src="/images/notrucks.webp"
        alt="track at forest"
        width={488}
        height={463}
        className={css.image}
        loading="eager"
      />
      <h3 className={css.title}>No campers found</h3>
      <p className={css.text}>
        We couldn`t find any campers that match your filters. Try adjusting your
        search or clearing some filters.
      </p>
      <div className={css.buttonsContainer}>
        <button className={css.clearFiltersButton} onClick={onClearFilters}>
          <Image
            src="/icons/ion_close-outline.svg"
            alt="close icon"
            width={24}
            height={24}
            className={css.icon}
          />
          Clear filters
        </button>
        <button className={css.viewAllButton} onClick={onViewAll}>
          View all campers
        </button>
      </div>
    </div>
  );
}
