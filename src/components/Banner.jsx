import { Link } from "react-router-dom";

import axios from "axios";
import "./banner.style.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Constant from "../constants";
import { imgurl } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState();
  const [isCategoryActiveTwo, setIsCategoryActiveTwo] = useState();
  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [sellerPathname, setSellerPathname] = useState(pathname);

  const fetchCategories = async () => {
    const response = await axios.get(Constant.getUrls.getAllCategories);
    setCategoriesData(response.data.category.docs);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(Constant.getUrls.getAllBanners);
      setBannerData(response.data.banner.docs);
      setIsLoading(false);
    };

    fetchData();
    fetchCategories();
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

  const RightIntro = () => {
    return (
      <div className="intro-right mob-intro-right">
        <h2>What vehicle do you want to sell?</h2>
        <div className="categories">
          <div className="row-one">
            {categoriesData.slice(0, 2).map((category, index) => (
              <div className="category-item" key={category._id}>
                {/* <Link to={`/sellerform/${category._id}`}> */}
                <div
                  className={
                    isCategoryActive === index ? "category active" : "category"
                  }
                  onClick={() => {
                    setIsCategoryActive(index);
                    if (!userToken) {
                      toast.error("Login First !");
                    } else {
                      navigate(`/sellerform/${category._id}`);
                    }
                  }}
                >
                  <img src={imgurl + category.icon} alt={category.title} />
                </div>
                {/* </Link> */}
                <span>{category.title}</span>
              </div>
            ))}
          </div>
          <div className="row-two">
            {categoriesData.slice(2, 4).map((category, index) => (
              <div className="category-item" key={category._id}>
                <Link to={`/sellerform/${category._id}`}>
                  <div
                    className={
                      isCategoryActiveTwo === index
                        ? "category active"
                        : "category"
                    }
                    onClick={() => {
                      setIsCategoryActiveTwo(index);
                    }}
                  >
                    <img src={imgurl + category.icon} alt={category.title} />
                  </div>
                </Link>
                <span>{category.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const bannerHomeFilter = bannerData.filter(
    (bannerHome) => bannerHome.banner_type === "buyer"
  );

  const bannerSellerFilter = bannerData.filter(
    (bannerSeller) => bannerSeller.banner_type === "seller"
  );

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
        {pathname === "/" &&
          bannerHomeFilter.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="intro-left">
                <h1>{banner.title}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: banner.description.substring(0, 100),
                  }}
                ></p>
              </div>
              <a href={banner.url} target="_blank" rel="noreferrer">
                <img
                  src={`https://gaddideals.brokerinvoice.co.in${banner.poster}`}
                  alt={banner.title}
                />
              </a>
            </SwiperSlide>
          ))}

        {pathname === "/sellerhome" &&
          bannerSellerFilter.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="intro-left">
                <h1>{banner.title}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: banner.description.substring(0, 100),
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

      {pathname === "/sellerhome" ? <RightIntro /> : ""}
    </div>
  );
};

export default Banner;

//  <div className="intro-right">
//         <h2>What vehicle do you want to sell?</h2>
//         <div className="categories">
//           <div className="row-one">
//             <div className="category-item">
//               <div className="category">
//                 <a href="SellerForm">
//                   {/* <img src={cargoTruckIcon} alt="cargo truck icon" /> */}
//                 </a>
//               </div>
//               <span>Trucks</span>
//             </div>
//             <div className="category-item">
//               <div className="category">
//                 {/* <img src={tractorIcon} alt="tractor icon" /> */}
//               </div>
//               <span>Tractors</span>
//             </div>
//           </div>
//           <div className="row-two">
//             <div className="category-item">
//               <div className="category">
//                 {/* <img src={busIcon} alt="bus icon" /> */}
//               </div>
//               <span>Buses</span>
//             </div>
//             <div className="category-item">
//               <div className="category construction">
//                 {/* <img src={craneIcon} alt="crane icon" /> */}
//               </div>
//               <div>
//                 <span>Construction Equipment</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
