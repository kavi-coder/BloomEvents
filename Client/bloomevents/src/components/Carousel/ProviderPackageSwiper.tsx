import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "styles/PackageSwiper.css";
import "styles/review.css";

// import required modules
import { Navigation } from "swiper";
import PackageDetailCard from "components/Cards/PackageDetailCard";

function ProviderPackageSwiper({ packages, image }: any) {
  // console.log(packages);
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {packages?.map((p: any, i: number) => (
          <div key={i}>
            <SwiperSlide className="!w-full bg-transparent">
              <PackageDetailCard pckage={p} image={image} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}

export default ProviderPackageSwiper;
