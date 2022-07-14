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

const SellerHome = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [categoriesData, setCategoriesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [faqs, setFAQS] = useState([]);

  const fetchFaqs = async () => {
    const response = await axios.get(Constant.getUrls.getAllFaqs);
    setFAQS(response.data.faq.docs);
  };

  const fetchCategories = async () => {
    const response = await axios.get(Constant.getUrls.getAllCategories);
    setCategoriesData(response.data.category.docs);
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

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="how-it-works-section">
        <div className="header-title">
          <h1>How It Works</h1>
        </div>

        <div className="how-cards-container container">
          <div className="how-card">
            <div className="how-card-title">
              <h5>Select the vehicle of your choice</h5>
            </div>

            <div className="how-card-img1">
              <Lottie options={defaultOptions} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text">
              <p>
                We have a variety of options available on the website and one
                can select the vehicle of their choice
              </p>
            </div>
          </div>

          <div className="how-card">
            <div className="how-card-title">
              <h5>Get the sellar details</h5>
            </div>

            <div className="how-card-img2">
              <Lottie options={defaultOptions2} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text2">
              <p>
                Once the buyer selects the vehicle of their choice, they will
                get the seller details
              </p>
            </div>
          </div>

          <div className="how-card">
            <div className="how-card-title">
              <h5>Directly negotiate with the seller of the vehicle</h5>
            </div>

            <div className="how-card-img">
              <Lottie options={defaultOptions3} height="100%" width="100%" />
              {/* <img src={girlImage} alt="girl" /> */}
            </div>

            <div className="how-card-text">
              <p>
                The buyer can directly negotiate with the seller of the vehicle
                and there will be NO COMMISSION charged to the buyer of the
                vehicle
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
            slidesPerView={3}
            grabCursor={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
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
            {testimonialsData.map((testimonial) => (
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
              768: {
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
          {faqs.map((faq) => (
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
        <div className="image-wrapper">
          <img src={truckHomeImage} alt="truck" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SellerHome;
