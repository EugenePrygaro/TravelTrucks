"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import css from "./CamperGallery.module.css";
import { type CamperGalleryObject } from "@/types/camper";

interface CamperGalleryProps {
  gallery?: CamperGalleryObject[];
}

export default function CamperGallery({ gallery = [] }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  if (!gallery || gallery.length === 0) {
    return (
      <div className={css.galleryContainer}>
        <div className={css.mainSwiper}>
          <div className={css.imageWrapper}>
            <Image
              src="/images/notrucks.webp"
              alt="No image available"
              width={488}
              height={463}
              className={css.imagePlaceholder}
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.galleryContainer}>
      <Swiper
        spaceBetween={12}
        navigation={false}
        pagination={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Thumbs]}
        className={css.mainSwiper}
      >
        {gallery.map((item) => (
          <SwiperSlide key={item.id || item.original} className={css.slide}>
            <div className={css.imageWrapper}>
              <Image
                src={item.original || item.thumb}
                alt="Camper photo"
                width={638}
                height={505}
                className={css.image}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {gallery.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={32}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={css.thumbsSwiper}
        >
          {gallery.map((item) => (
            <SwiperSlide
              key={`thumb-${item.id || item.original}`}
              className={css.thumbSlide}
            >
              <div className={css.thumbWrapper}>
                <Image
                  src={item.thumb || item.original}
                  alt="Camper thumbnail"
                  width={136}
                  height={144}
                  className={css.image}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
