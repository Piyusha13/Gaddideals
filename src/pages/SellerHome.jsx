import { useState, useEffect } from "react";

import axios from "axios";

import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import FAQToggle from "../components/FAQToggle";
import Footer from "../components/Footer";
import Constant from "../constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import locationIcon from "../assets/location-home.png";
import truckHomeImage from "../assets/truck-home.png";

import "./sellerhomepage.style.css";

import Lottie from "react-lottie";
import animationData1 from "../assets/step-1-lottie.json";
import animationData3 from "../assets/mental-therapy-lottie.json";
import animationData2 from "../assets/step-3rd-lottie.json";
import { Link } from "react-router-dom";
import { imgurl } from "../constants";

const SellerHome = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [categoriesData, setCategoriesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [advertisementData, setAdvertisementData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [faqs, setFAQS] = useState([]);
  const [isCategoryActive, setIsCategoryActive] = useState();
  const [isCategoryActiveTwo, setIsCategoryActiveTwo] = useState();

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const fetchFaqs = async () => {
    const response = await axios.get(Constant.getUrls.getAllFaqs);
    setFAQS(response.data.faq.docs);
  };

  const fetchCategories = async () => {
    const response = await axios.get(Constant.getUrls.getAllCategories);
    setCategoriesData(response.data.category.docs);
  };

  const fetchAdvertisements = async () => {
    const response = await axios.get(Constant.getUrls.getAllAdvertisments);
    setAdvertisementData(response.data.advertisment.docs);
  };

  const fetchTestimonials = async () => {
    const response = await axios.get(Constant.getUrls.getAllTestimonials);
    setTestimonialsData(response.data.testimonial.docs);
  };

  const fetchBrands = async () => {
    const response = await axios.get(Constant.getUrls.getAllBrands);
    setBrandsData(response.data.brand.docs);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
    fetchTestimonials();
    fetchAdvertisements();
    fetchBrands();
    fetchFaqs();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const testimonialSeller = testimonialsData.filter(
    (seller) => seller.type === "seller"
  );

  const filterAdvertisementSeller = advertisementData.filter(
    (buyer) => buyer.type === "seller"
  );

  const faqsSeller = faqs.filter((seller) => seller.type === "seller");

  return (
    <div>
      <Navbar />
      <Banner />
      {/* quick four options */}
      {matches && (
        <div className="intro-right">
          <h2>What Vehicle do you want to sell?</h2>
          <div className="categories">
            <div className="row-one">
              {categoriesData.slice(0, 2).map((category, index) => (
                <div className="category-item" key={category._id}>
                  <Link to={`/sellerform/${category._id}`}>
                    <div
                      className={
                        isCategoryActive === index
                          ? "category active"
                          : "category"
                      }
                      onClick={() => {
                        setIsCategoryActive(index);
                      }}
                    >
                      <img src={imgurl + category.icon} alt={category.title} />
                    </div>
                  </Link>
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
      )}
      <div className="how-it-works-section">
        <div className="header-title">
          <h1>How It Works</h1>
        </div>

        <div className="how-cards-container container">
          <div className="how-card">
            <div className="how-card-title">
              <h5>Upload the required details of the vehicle</h5>
            </div>

            <div className="how-card-img1">
              <Lottie options={defaultOptions} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text">
              <p>
                For quicker sale of the vehicle Gaddideals will ask for a few
                details which will be mandatory for the seller of the vehicle to
                fill.
              </p>
            </div>
          </div>

          <div className="how-card">
            <div className="how-card-title">
              <h5>
                The details will be verified and then will the vehicle be listed
              </h5>
            </div>

            <div className="how-card-img2">
              <Lottie options={defaultOptions2} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text2">
              <p>
                We will verify the details that is uploaded to make sure that
                there is no mistake and the documents are authenticated
              </p>
            </div>
          </div>

          <div className="how-card">
            <div className="how-card-title">
              <h5>Receive call from our buyer network</h5>
            </div>

            <div className="how-card-img">
              <Lottie options={defaultOptions3} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text">
              <p>
                As gaddideals has a Pan India buyer network the process of
                selling the vehicle will be quick. Post the sale it's the duty
                of the seller to make sure that they give us 1% service fees as
                per listing price.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="our-categories-section">
        <div className="our-categories-header">
          <h1>Our Categories</h1>
        </div>

        <div className="our-categories-container">
          {categoriesData.slice(0, 4).map((category) => (
            <div className="our-category" key={category._id}>
              <img
                src={`https://gaddideals.brokerinvoice.co.in${category.image}`}
                alt={category.title}
              />

              <div className="our-category-title">
                <h6>{category.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Review */}
      <div className="customer-review-section">
        <div className="customer-review-header">
          <h1>Customer Review</h1>
        </div>

        <div className="customer-review-container">
          <Swiper
            className="testimonial-slide"
            spaceBetween={20}
            slidesPerView={testimonialSeller.length === 1 ? "auto" : 3}
            grabCursor={true}
            breakpoints={{
              50: {
                slidesPerView: 1.8,
                spaceBetween: 10,
              },
              820: {
                slidesPerView: 2.7,
                spaceBetween: 25,
              },
              1368: {
                slidesPerView: 3,
              },
              1920: {
                slidesPerView: 4,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {testimonialSeller.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                className="customer-swiper-slide"
              >
                <div className="customer-card">
                  <div className="profile-img">
                    <img
                      src={`https://gaddideals.brokerinvoice.co.in${testimonial.image}`}
                      alt={testimonial.title}
                    />
                  </div>
                  <div className="profile-name-location">
                    <h6>{testimonial.title}</h6>
                    <div className="profile-location">
                      <img src={locationIcon} alt={testimonial.location} />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="profile-line"></div>
                  <div className="profile-review">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: testimonial.description,
                      }}
                    ></p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Trusted Brands */}
      <div className="trusted-brands-section">
        <div className="trusted-brand-header">
          <h1>Trusted Brands</h1>
        </div>

        <div className="trusted-brands-container">
          <Swiper
            slidesPerView={5}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              820: {
                slidesPerView: 3.8,
                spaceBetween: 20,
              },
              50: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              999: {
                slidesPerView: 5,
              },
              1368: {
                slidesPerView: 6,
              },
            }}
            modules={[Autoplay]}
          >
            {brandsData.map((brand) => (
              <SwiperSlide key={brand._id} className="brands-swiper-slide">
                <div className="brand-wrapper">
                  <img
                    src={`https://gaddideals.brokerinvoice.co.in${brand.image}`}
                    alt={brand.title}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-header">
          <h1>Frequently Asked Question's</h1>
        </div>

        <div className="faq-container">
          {faqsSeller.map((faq) => (
            <FAQToggle key={faq._id} question={faq.question}>
              <div className="answer">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            </FAQToggle>
          ))}
        </div>
      </div>

      {/*Truck Image  */}
      <div className="truck-section">
        <Swiper
          grabCursor={true}
          modules={[Autoplay]}
          className="advertise-swiper"
        >
          {filterAdvertisementSeller.map((advertise) => (
            <SwiperSlide key={advertise._id} className="advertise-slide">
              <div className="image-wrapper">
                <img
                  src={`https://gaddideals.brokerinvoice.co.in${advertise.image}`}
                  alt="truck"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SellerHome;
