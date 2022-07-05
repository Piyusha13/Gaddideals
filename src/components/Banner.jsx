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
        {bannerData.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="intro-left">
              <h1>{banner.title}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: banner.description,
                }}
              ></p>
            </div>
            <img
              src={`https://gaddideals.brokerinvoice.co.in${banner.poster}`}
              alt={banner.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
