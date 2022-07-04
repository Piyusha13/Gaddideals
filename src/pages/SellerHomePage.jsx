import { useState, useEffect } from "react";

import axios from "axios";

import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import FAQToggle from "../components/FAQToggle";
import Footer from "../components/Footer";
import Constant from "../constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

import girlImage from "../assets/girl_image.png";
import locationIcon from "../assets/location-home.png";
import truckHomeImage from "../assets/truck-home.png";

import "./sellerhomepage.style.css";

const SellerHomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [categoriesData, setCategoriesData] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [latestTrucksData, setLatestTrucksData] = useState([]);
  const [latestBusesData, setLatestBusesData] = useState([]);
  const [latestTractorsData, setLatestTractorsData] = useState([]);
  const [latestConstructionData, setLatestConstructionData] = useState([]);
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

  const fetchLatestTrucks = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        "?category=62a981c7a81db2038300ae60&sort=true&limit=10"
      }`
    );
    setLatestTrucksData(response.data.vehicle.docs);
  };

  const fetchLatestBuses = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        "?category=62a9825aa81db2038300ae7e&sort=true&limit=10"
      }`
    );
    setLatestBusesData(response.data.vehicle.docs);
  };

  const fetchLatestTractors = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        "?category=62a98203a81db2038300ae73&sort=true&limit=10"
      }`
    );
    setLatestTractorsData(response.data.vehicle.docs);
  };

  const fetchLatestContruction = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        "?category=62a9829ba81db2038300ae83&sort=true&limit=10"
      }`
    );
    setLatestConstructionData(response.data.vehicle.docs);
  };

  useEffect(() => {
    fetchCategories();
    fetchTestimonials();
    fetchBrands();
    fetchLatestTrucks();
    fetchLatestBuses();
    fetchLatestTractors();
    fetchLatestContruction();
    fetchFaqs();
  }, []);

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

            <div className="how-card-img">
              <img src={girlImage} alt="girl" />
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
              <h5>Select the vehicle of your choice</h5>
            </div>

            <div className="how-card-img">
              <img src={girlImage} alt="girl" />
            </div>

            <div className="how-card-text">
              <p>
                Once the buyer selects the vehicle of their choice, they will
                get the seller details lorem ipsum
              </p>
            </div>
          </div>

          <div className="how-card">
            <div className="how-card-title">
              <h5>Select the vehicle of your choice</h5>
            </div>

            <div className="how-card-img">
              <img src={girlImage} alt="girl" />
            </div>

            <div className="how-card-text">
              <p>
                The buyer can directly negotiate with the seller of the vehicle
                and there will be NO COMMISSION charged.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="latest-vehicle-section">
        <div className="latest-vehicle-header">
          <h1>Latest Vehicle</h1>
        </div>

        <div className="latest-vehicles-container">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="tablist-container">
              <Tab>Truck</Tab>
              <span
                className={tabIndex === 0 ? "active-bar" : "active-bar-close"}
              ></span>
              <Tab>Buses</Tab>
              <span
                className={
                  tabIndex === 1 ? "active-bar buses" : "active-bar-close"
                }
              ></span>
              <Tab>Tractors</Tab>
              <span
                className={
                  tabIndex === 2 ? "active-bar tractors" : "active-bar-close"
                }
              ></span>
              <Tab>Construction Equipments</Tab>
              <span
                className={
                  tabIndex === 3
                    ? "active-bar construction"
                    : "active-bar-close"
                }
              ></span>
            </TabList>

            <TabPanel className="tab-panel">
              <Swiper
                className="swiper-latest"
                spaceBetween={20}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1368: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
              >
                {latestTrucksData.map((latestTruck) => (
                  <SwiperSlide
                    className="swiper-slide-latest"
                    key={latestTruck._id}
                  >
                    <div key={latestTruck._id} className="latest-card">
                      <div className="latest-img-wrapper">
                        <img
                          src={`https://gaddideals.brokerinvoice.co.in${latestTruck.front_side_pic}`}
                          alt={latestTruck.brand.title}
                        />
                      </div>
                      <div className="latest-info">
                        <div className="latest-header">
                          <h5>{latestTruck.brand.title}</h5>

                          <div className="latest-location">
                            <img src={locationIcon} alt="location icon" />
                            <span>{latestTruck.city}</span>
                          </div>
                        </div>

                        <button>Get Seller Details</button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPanel>
            <TabPanel className="tab-panel">
              <Swiper
                className="swiper-latest"
                spaceBetween={20}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1368: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
              >
                {latestBusesData.map((latestBuses) => (
                  <SwiperSlide
                    className="swiper-slide-latest"
                    key={latestBuses._id}
                  >
                    <div key={latestBuses._id} className="latest-card">
                      <div className="latest-img-wrapper">
                        <img
                          src={`https://gaddideals.brokerinvoice.co.in${latestBuses.front_side_pic}`}
                          alt={latestBuses.brand.title}
                        />
                      </div>
                      <div className="latest-info">
                        <div className="latest-header">
                          <h5>{latestBuses.brand.title}</h5>

                          <div className="latest-location">
                            <img src={locationIcon} alt="location icon" />
                            <span>{latestBuses.city}</span>
                          </div>
                        </div>

                        <button>Get Seller Details</button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPanel>
            <TabPanel className="tab-panel">
              <Swiper
                className="swiper-latest"
                spaceBetween={20}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1368: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
              >
                {latestTractorsData.map((latestTractor) => (
                  <SwiperSlide
                    className="swiper-slide-latest"
                    key={latestTractor._id}
                  >
                    <div key={latestTractor._id} className="latest-card">
                      <div className="latest-img-wrapper">
                        <img
                          src={`https://gaddideals.brokerinvoice.co.in${latestTractor.front_side_pic}`}
                          alt={latestTractor.brand.title}
                        />
                      </div>
                      <div className="latest-info">
                        <div className="latest-header">
                          <h5>{latestTractor.brand.title}</h5>

                          <div className="latest-location">
                            <img src={locationIcon} alt="location icon" />
                            <span>{latestTractor.city}</span>
                          </div>
                        </div>

                        <button>Get Seller Details</button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPanel>
            <TabPanel className="tab-panel">
              <Swiper
                className="swiper-latest"
                spaceBetween={20}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                  1368: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
              >
                {latestConstructionData.map((latestConstruction) => (
                  <SwiperSlide
                    className="swiper-slide-latest"
                    key={latestConstruction._id}
                  >
                    <div key={latestConstruction._id} className="latest-card">
                      <div className="latest-img-wrapper">
                        <img
                          src={`https://gaddideals.brokerinvoice.co.in${latestConstruction.front_side_pic}`}
                          alt={latestConstruction.brand.title}
                        />
                      </div>
                      <div className="latest-info">
                        <div className="latest-header">
                          <h5>{latestConstruction.brand.title}</h5>

                          <div className="latest-location">
                            <img src={locationIcon} alt="location icon" />
                            <span>{latestConstruction.city}</span>
                          </div>
                        </div>

                        <button>Get Seller Details</button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </TabPanel>
          </Tabs>
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

export default SellerHomePage;
