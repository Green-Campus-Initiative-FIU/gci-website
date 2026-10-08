"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MySwiper() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView="auto"
      className="size-full overflow-hidden" // Controls the width of the entire Swiper container
    >
      <SwiperSlide className="bg-light-green">
        <div className="flex h-full w-full items-center justify-center">
          Project 1
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-light-green">
        <div className="flex h-full w-full items-center justify-center">
          Project 2
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-light-green justify-center">
        <div className="flex h-full w-full items-center justify-center">
          Project 3
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-light-green">
        <div className="flex h-full w-full items-center justify-center">
          Project 4
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-light-green">
        <div className="flex h-full w-full items-center justify-center">
          Project 5
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
