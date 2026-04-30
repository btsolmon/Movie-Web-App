import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

export const Slides = () => {
  return (
    <Swiper
      autoplay={{ delay: 5000 }}
      spaceBetween={50}
      pagination={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Autoplay]}
    >
      <SwiperSlide>
        <div className="h-[600px] flex items-center relative">
          <img className="absolute left-0 top-0 w-full h-full object-cover" src="https://4kwallpapers.com/images/walls/thumbs_3t/18391.jpeg" alt="" />
          <div className="container pl-15 relative bg-transparent">
            <p className="text-white">Now Playing:</p>
            <h3 className="font-bold text-4xl text-white">Wicked 3</h3>
            <div className="py-2 flex items-center font-semibold text-white text-lg">
              <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.9997 10.3335L17.6047 17.6368L25.6663 18.8152L19.833 24.4968L21.2097 32.5235L13.9997 28.7318L6.78967 32.5235L8.16634 24.4968L2.33301 18.8152L10.3947 17.6368L13.9997 10.3335Z"
                  fill="#FDE047"
                  stroke="#FDE047"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              6.9<span className="text-base text-[#71717A] font-normal">/10</span>
            </div>
            <p className="w-[300px] text-[#FAFAFA] text-xs">
              Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the
              Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.{" "}
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[600px] flex items-center relative">
          <img className="absolute left-0 top-0 w-full h-full object-cover" src="https://4kwallpapers.com/images/walls/thumbs_3t/18391.jpeg" alt="" />
          <div className="container pl-15 relative bg-transparent">
            <p className="text-white">Now Playing:</p>
            <h3 className="font-bold text-4xl text-white">Wicked 1</h3>
            <div className="py-2 flex items-center font-semibold text-white text-lg">
              <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.9997 10.3335L17.6047 17.6368L25.6663 18.8152L19.833 24.4968L21.2097 32.5235L13.9997 28.7318L6.78967 32.5235L8.16634 24.4968L2.33301 18.8152L10.3947 17.6368L13.9997 10.3335Z"
                  fill="#FDE047"
                  stroke="#FDE047"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              6.9<span className="text-base text-[#71717A] font-normal">/10</span>
            </div>
            <p className="w-[300px] text-[#FAFAFA] text-xs">
              Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the
              Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.{" "}
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[600px] flex items-center relative">
          <img className="absolute left-0 top-0 w-full h-full object-cover" src="https://4kwallpapers.com/images/walls/thumbs_3t/18391.jpeg" alt="" />
          <div className="container pl-15 relative bg-transparent">
            <p className="text-white">Now Playing:</p>
            <h3 className="font-bold text-4xl text-white">Wicked</h3>
            <div className="py-2 flex items-center font-semibold text-white text-lg">
              <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.9997 10.3335L17.6047 17.6368L25.6663 18.8152L19.833 24.4968L21.2097 32.5235L13.9997 28.7318L6.78967 32.5235L8.16634 24.4968L2.33301 18.8152L10.3947 17.6368L13.9997 10.3335Z"
                  fill="#FDE047"
                  stroke="#FDE047"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              6.9<span className="text-base text-[#71717A] font-normal">/10</span>
            </div>
            <p className="w-[300px] text-[#FAFAFA] text-xs">
              Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the
              Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.{" "}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};