import axios from "axios";
import "./banner.style.css";
import { useState, useEffect } from "react";
import Constant from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(Constant.getUrls.getAllBanners);
      setBannerData(response.data.banner.docs);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + " " + "</span>";
    },
  };

  return (
    <div className="carousel-container">
      <Swiper
        pagination={pagination}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {bannerData.slice(0, 3).map((bannerImg) => (
          <SwiperSlide key={bannerImg._id}>
            <img
              src={`https://gaddideals.brokerinvoice.co.in${bannerImg.poster}`}
              alt={bannerImg.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
