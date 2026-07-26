"use client";

import css from "./CamperDetails.module.css";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import styles from "@/components/LoadingModal/LoadingModal.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { formatLabel } from "@/lib/utils";

import { getCamperById, getReviews } from "@/lib/api/clientApi";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import BookingForm from "@/components/BookingForm/BookingForm";

export default function CamperDetails() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: camper,
    isLoading: isCamperLoading,
    isError: isCamperError,
  } = useQuery({
    queryKey: ["camper", id],
    queryFn: () => getCamperById(id),
    enabled: Boolean(id),
  });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
    enabled: Boolean(id),
  });

  const isLoading = isCamperLoading || isReviewsLoading;

  if (isLoading)
    return (
      <LoadingModal>
        <p className={styles.textModal}>Loading track details...</p>
        <p className={styles.subtextModal}>
          Please wait while we fetch track details for you
        </p>
      </LoadingModal>
    );
  return (
    <div className={css.container}>
      <div className={css.contentSection}>
        <div className={css.gallery}>
          <CamperGallery gallery={camper?.gallery} />
        </div>
        <div className={css.mainInfo}>
          <div className={css.titlesBlock}>
            <h2 className={css.title}>{camper?.name}</h2>
            <div className={css.subHeader}>
              <span className={css.rating}>
                <Image
                  src="/icons/star.svg"
                  alt="rating star icon"
                  width={16}
                  height={16}
                  className={css.icon}
                />
                {camper?.rating}({camper?.totalReviews} Reviews)
              </span>
              <span className={css.location}>
                <Image
                  src="/icons/map.svg"
                  alt="location map icon"
                  width={16}
                  height={16}
                  className={css.icon}
                />
                {camper?.location}
              </span>
            </div>
            <span className={css.price}>€{camper?.price}</span>
            <p className={css.description}>{camper?.description}</p>
          </div>
          <div className={css.vehicleDetailsBlock}>
            <h2 className={css.title}>Vehicle details</h2>
            <ul className={css.badges}>
              <li className={css.badge}>
                {formatLabel(camper?.transmission as string)}
              </li>
              <li className={css.badge}>
                {formatLabel(camper?.engine as string)}
              </li>
              <li className={css.badge}>
                {formatLabel(camper?.form as string)}
              </li>
              {camper?.amenities?.map((amenty) => (
                <li className={css.badge} key={amenty}>
                  {formatLabel(amenty as string)}
                </li>
              ))}
            </ul>
            <div className={css.grayline}></div>
            <ul className={css.subDetailsList}>
              <li className={css.row}>
                <span className={css.label}>Form</span>
                <span className={css.value}>
                  {formatLabel(camper?.form as string)}
                </span>
              </li>
              <li className={css.row}>
                <span className={css.label}>Length</span>
                <span className={css.value}>
                  {formatLabel(camper?.length as string)}
                </span>
              </li>
              <li className={css.row}>
                <span className={css.label}>Width</span>
                <span className={css.value}>
                  {formatLabel(camper?.width as string)}
                </span>
              </li>
              <li className={css.row}>
                <span className={css.label}>Height</span>
                <span className={css.value}>
                  {formatLabel(camper?.height as string)}
                </span>
              </li>
              <li className={css.row}>
                <span className={css.label}>Tank</span>
                <span className={css.value}>
                  {formatLabel(camper?.tank as string)}
                </span>
              </li>
              <li className={css.row}>
                <span className={css.label}>Consumption</span>
                <span className={css.value}>
                  {formatLabel(camper?.consumption as string)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={css.overviewSection}>
        <div className={css.reviewsBlock}>
          <h2 className={css.title}>Reviews</h2>
          {isReviewsError ? (
            <p>Failed to load reviews.</p>
          ) : reviews && reviews.length > 0 ? (
            <ul className={css.reviewsList}>
              {reviews.slice(0, 2).map((review, index) => (
                <li key={review.id || index} className={css.review}>
                  <div className={css.reviewer}>
                    <Image
                      src="/images/avatar.webp"
                      alt="avatar placeholder"
                      width={60}
                      height={60}
                      className={css.avatar}
                    />
                    <div>
                      <p className={css.reviewerName}>{review.reviewer_name}</p>
                      <div className={css.starsRating}>
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                          <div key={starIndex} className={css.starWrapper}>
                            <Image
                              src="/icons/star.svg"
                              alt="rating star"
                              fill
                              sizes="16px"
                              className={
                                starIndex <= review.reviewer_rating
                                  ? css.starGold
                                  : css.starGray
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <div className={css.bookBlock}>
          <h3 className={css.bookingTitle}>Book your campervan now</h3>
          <p className={css.bookingText}>
            Stay connected! We are always ready to help you.
          </p>
          <BookingForm camperId={id} />
        </div>
      </div>
    </div>
  );
}
