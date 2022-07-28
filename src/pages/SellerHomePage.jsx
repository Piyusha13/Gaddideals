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

// import girlImage from "../assets/girl_image.png";
import locationIcon from "../assets/location-home.png";
import truckHomeImage from "../assets/truck-home.png";

import "./sellerhomepage.style.css";

import Lottie from "react-lottie";
import animationData1 from "../assets/step-1-lottie.json";
import animationData3 from "../assets/mental-therapy-lottie.json";
import animationData2 from "../assets/step-3rd-lottie.json";
// import VehicleDetails from "./VehicleDetails";
import { Link } from "react-router-dom";
// import "http://translate.googlr.com/translate_a/elemnt.js?cb=loadGoogleTranslate";
import { FaGoogle } from "react-icons/fa";
import { log } from "util";
import { toast } from "react-toastify";

import Modal from "react-awesome-modal";
import OtpInput from "react-otp-input";
import CloseTab from "../assets/close-tab.png";
import downArrow from "../assets/down-arrow.png";
import Edit from "../assets/edit.png";

// import { useLazyTranslate } from 'react-google-translate';
// const GCP_PRIVATE_KEY=["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"];
// const GCP_CLIENT_EMAIL=["384857094071-ej4f1bi786jn698rkocn43vkhaebo157.apps.googleusercontent.com"];
// const GCP_PROJECT_ID=["AIzaSyBokh77ocsW0ene-vrX80v1Wd5QUj64pSw"];

// import { setConfig } from 'react-google-translate';

const SellerHomePage = ({ locationCity, setLocationCity }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [categoriesData, setCategoriesData] = useState([]);
  const [truckCategoryId, setTruckCategoryId] = useState("");
  const [tractorsCategoryId, setTractorsCategoryId] = useState("");
  const [busesCategoryId, setBusesCategoryId] = useState("");
  const [constructionCategoryId, setConstructionCategoryId] = useState("");
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [latestTrucksData, setLatestTrucksData] = useState([]);
  const [latestBusesData, setLatestBusesData] = useState([]);
  const [latestTractorsData, setLatestTractorsData] = useState([]);
  const [latestConstructionData, setLatestConstructionData] = useState([]);
  const [faqs, setFAQS] = useState([]);
  const [vehicleId,setvehicleId]=useState("");

  // for get seller details
  // const [loadingDetails, setLoadingDetails] = useState(false);
  const [userObj,setUserObj]=useState();
  const [BuyerInput, setBuyerInput] = useState(false);
  const [BuyerOtp, setBuyerOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [SellerDetails, setSellerDetails] = useState(false);

  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mob_no, setmob_no] = useState("");
  const [city, setcity] = useState("");
  const [user_type, setuser_type] = useState("");
  const [isTypeActive, setIsTypeActive] = useState();
  const [seller_id, setseller_id] = useState("");
  const [seller, setSeller] = useState("");

  const dealerType = [
    {
      user_type: "Company",
    },
    {
      user_type: "Sole Proprietor",
    },
    {
      user_type: "Agent/Broker/Dealer",
    },
    {
      user_type: "Other",
    },
  ];


  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  // useEffect(() => {
  //   window
  //     .matchMedia("(max-width: 1000px)")
  //     .addEventListener("change", (e) => setMatches(e.matches));
  // }, []);

  // useEffect(() => {
  //   const getSingleVehicleDetails = async () => {
  //     setLoadingDetails(true);
  //     const res = await axios.get(
  //       "https://gaddideals.brokerinvoice.co.in/api/vehicle/vehicleDetails/" +
  //       vehicleId
  //     );
  //     // console.log(res.data.vehicle.user._id);
  //     // setVehicleDetails(res.data.vehicle);
  //     // setCheckCategory(res.data?.vehicle?.category?.title);
  //     setseller_id(res.data?.vehicle?.user?._id);
  //     setSeller(res.data?.vehicle?.user);


  //     setLoadingDetails(false);
  //   };

  //   getSingleVehicleDetails();
  // }, []);

//  if buyer is not logged-in 


  // if (loadingDetails) {
  //   return "Loading...";
  // }

  // 

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
        `?category=62de7bb69291101d08b10762&status=approved&sort=true&limit=10`
      }`
    );
    setLatestTrucksData(response.data.vehicle.docs);
  };

  const fetchLatestBuses = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        `?category=62de8b709291101d08b15fb6&status=approved&sort=true&limit=10`
      }`
    );
    setLatestBusesData(response.data.vehicle.docs);
  };

  const fetchLatestTractors = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        `?category=62de8b589291101d08b15f44&status=approved&sort=true&limit=10`
      }`
    );
    setLatestTractorsData(response.data.vehicle.docs);
  };

  const fetchLatestContruction = async () => {
    const response = await axios.get(
      `${
        Constant.getUrls.getAllLatestVehicles +
        `?category=62de8ba09291101d08b15ff5&status=approved&sort=true&limit=10`
      }`
    );
    setLatestConstructionData(response.data.vehicle.docs);
  };

  const rupee_format = (str) => {
    if (str) {
      var x = str;
      x = x.toString();
      var lastThree = x.substring(x.length - 3);
      var otherNumbers = x.substring(0, x.length - 3);
      if (otherNumbers !== "") lastThree = "," + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    } else {
      return;
    }
  };

  // function loadGoogleTranslate(){
  //   FaGoogle.translate.TranslateElement("intro-title");
  // }

  function saveBuyer() {
    let payload = { name, email, mob_no, seller_id, user_type, city };
    axios
      .post(Constant.postUrls.postAllEnquiries, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((result) => {
        if (result.data.status === "failed") {
          toast.error(result.data.message);
        } else {
          if (result.data.status === "success") {
            toast.success(result.data.message);
            // setvisibleOTP(!visibleOTP);
            setmob_no(mob_no);
            // setOtp(otp);
            setBuyerOtp(!BuyerOtp);
            // setCounter(59);
          }
        }
      });
  }

  function handleChange(o) {
    setOtp(o);
    // console.log(otp);
  }

  function savePhoneOtp() {
    // console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      // console.log(res);

      if (res.data.status === "failed") {
        toast.error("incorrect otp");
      } else if (res.data.status === "Success") {
        toast.success(res.data.message);
        setSellerDetails(!SellerDetails);
        setBuyerOtp(!BuyerOtp);
      }
    });
  }

  function resendotp() {
    console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
      // console.log("result", result);
      if (mob_no === "") {
        toast.error("enter moile number");
      } else if (result.data.status === "failed") {
        toast.error(result.data.message);
      } else {
        if (result.data.status === "success") {
          toast.success(result.data.message);
          setOtp(result.data.otp);

          // setCounter(59);
        }
      }
    });
  }

  useEffect(() => {
    fetchCategories();
    fetchTestimonials();
    fetchBrands();
    fetchLatestTrucks();
    fetchLatestBuses();
    fetchLatestTractors();
    fetchLatestContruction();
    fetchFaqs();
    // languageTranslation();

    // const converted = Object.assign(
    //   {},
    //   ...categoriesData.map((category) => ({ [category.title]: category }))
    // );

    // setTruckCategoryId(converted.Trucks._id);

    window
    .matchMedia("(max-width: 1000px)")
    .addEventListener("change", (e) => setMatches(e.matches));


    // get single seller
    // const getSingleVehicleDetails = async () => {
    //   setLoadingDetails(true);
    //   const res = await axios.get(
    //     "https://gaddideals.brokerinvoice.co.in/api/vehicle/vehicleDetails/" +
    //     vehicleId
    //   );
    //   // console.log(res.data.vehicle.user._id);
    //   // setVehicleDetails(res.data.vehicle);
    //   // setCheckCategory(res.data?.vehicle?.category?.title);
    //   setseller_id(res.data?.vehicle?.user?._id);
    //   setSeller(res.data?.vehicle?.user);
    //   console.log(res.data?.vehicle?.user);

    //   setSellerDetails(true);   
    //   setLoadingDetails(false);
    // };

    // getSingleVehicleDetails();
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
  console.log(userObj);
  return (
    <div>
      <Navbar />
      {BuyerInput && (
        <div>
          <Modal
            visible={BuyerInput}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setBuyerInput(!BuyerInput);
            }}
          >
            <div className="buyer-dtails-container">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setBuyerInput(!BuyerInput);
                }}
              ></img>
              <h1>Please share your contact</h1>
              <input
                className="buyer-name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Name "
              ></input>
              <input
                className="buyer-number"
                placeholder="Phone Number "
                onChange={(e) => {
                  setmob_no(e.target.value);
                }}
                value={mob_no}
                maxLength={10}
              ></input>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email}
                type="email"
                className="buyer-email"
                placeholder="Email"
              ></input>

              <div className="buyer-location">
                <input
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                  value={city}
                  placeholder="Location"
                ></input>
                <img src={downArrow} alt=""></img>
              </div>

              <div className="dealerType">
                <div className="dealer-que">What type of user are you?</div>
                <div className="dealerTypeOption">
                  {dealerType.map((user_types, index) => (
                    <div
                      key={index}
                      className={
                        isTypeActive === index ? "dealer active" : "dealer"
                      }
                      onClick={() => {
                        setuser_type(user_types.user_type);
                        setIsTypeActive(index);
                      }}
                    >
                      <span>{user_types.user_type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  // saveBuyer();
                  setBuyerInput(!BuyerInput);
                  setBuyerOtp(!BuyerOtp);
                }}
              >
                Get Contact Details
              </button>
            </div>
          </Modal>
        </div>
      )}
      {BuyerOtp && (
        <div>
          <Modal
            visible={BuyerOtp}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setBuyerOtp(!BuyerOtp);
            }}
          >
            <div className="buyer-otp-container">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setBuyerOtp(!BuyerOtp);
                }}
              ></img>
              <div className="instruction-text">
                6 digit code sent to mobile number
              </div>
              <div className="buyer-phone-number-input">
                <input
                  placeholder="Enter Phone Number"
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                ></input>
                <img src={Edit} alt=""></img>
              </div>
              <div className="enter-otp-text">Enter OTP to verify</div>
              <OtpInput
                containerStyle="otpStyle"
                inputStyle="otBoxStyle"
                numInputs={6}
                separator={<span></span>}
                value={otp}
                type="number"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></OtpInput>
              <div
                className="new-otp-text"
                onClick={() => {
                  resendotp();
                }}
              >
                Get new OTP in 25 sec
              </div>
              <button
                onClick={() => {
                  savePhoneOtp();
                  saveBuyer();
                }}
              >
                Verify
              </button>
            </div>
          </Modal>
        </div>
      )}
      {SellerDetails  && (
        <div>
          <Modal
            visible={SellerDetails}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setSellerDetails(!SellerDetails);
            }}
          >
            <div className="sellerDetailsContainer">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setSellerDetails(!SellerDetails);
                }}
              ></img>
              <div className="userProfilePic">
                <img
                  src={
                    "https://gaddideals.brokerinvoice.co.in" +
                    userObj?.profile_pic_url
                  }
                ></img>
              </div>
              <div className="userName">{userObj?.name}</div>
              <hr></hr>
              <input value={userObj?.name} placeholder="Name"></input>
              <input value={userObj?.mob_no} placeholder="Phone Numer"></input>
              <input value={userObj?.email} placeholder="Email"></input>
            </div>
          </Modal>
        </div> 
      )}
      <Banner />
      <div className="how-it-works-section">
        <div className="header-title">
          <h1 id="intro-title">How It Works</h1>
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

          <div className="how-card how-card-2">
            <div className="how-card-title">
              <h5>Get the seller details</h5>
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

          <div className="how-card how-card-3">
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

      <div className="latest-vehicle-section">
        <div className="latest-vehicle-header">
          <h1>Latest Vehicles</h1>
        </div>

        <div className="latest-vehicles-container container-fluid m-0 p-0">
          <Tabs
            selectedIndex={tabIndex}
            selectedTabClassName="active-bar"
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="tablist-container">
              <Tab className="tab">Trucks</Tab>
              <Tab className="tab">Buses</Tab>
              <Tab className="tab">Tractors</Tab>
              <Tab className="tab">Construction Equipments</Tab>
            </TabList>

            <TabPanel className="tab-panel">
              <Swiper
                className="swiper-latest"
                spaceBetween={20}
                slidesPerView={3}
                navigation={true}
                breakpoints={{
                  50: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  999: {
                    slidesPerView: 3,
                  },
                  1368: {
                    slidesPerView: 4,
                  },
                }}
                modules={[Navigation]}
              >
                {latestTrucksData.map((latestTruck) => (
                  // console.log(latestTruck.user.name),
                  <SwiperSlide
                    className="swiper-slide-latest"
                    key={latestTruck._id}
                  >
                    <div key={latestTruck._id} className="latest-card">
                      <Link to={`/vehicledetails/${latestTruck._id}`}>
                        <div className="latest-img-wrapper">
                          <img
                            src={`https://gaddideals.brokerinvoice.co.in${latestTruck.front_side_pic}`}
                            alt={latestTruck.brand.title}
                          />
                        </div>
                      </Link>
                      <div className="latest-info">
                        <div className="latest-header">
                          <div className="latest-title">
                            <h5>{latestTruck.brand.title}</h5>
                            <div className="latest-location">
                              <img src={locationIcon} alt="location icon" />
                              <span>{latestTruck.city}</span>
                            </div>
                          </div>
                          <p>₹ {rupee_format(latestTruck.selling_price)}</p>
                        </div>

                        <button
                         onClick={() => {
                          // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                          // setvehicleId(latestTruck._id)
                          setUserObj(latestTruck.user);
                          if(userToken){
                            setSellerDetails(!SellerDetails)
                          }else{
                            setBuyerInput(!BuyerInput)
                          }
                          
                         }}
                        >Get Seller Details</button>
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
                  50: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  999: {
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
                      <Link to={`/vehicledetails/${latestBuses._id}`}>
                        <div className="latest-img-wrapper">
                          <img
                            src={`https://gaddideals.brokerinvoice.co.in${latestBuses.front_side_pic}`}
                            alt={latestBuses.brand.title}
                          />
                        </div>
                      </Link>
                      <div className="latest-info">
                        <div className="latest-header">
                          <div className="latest-title">
                            <h5>{latestBuses.brand.title}</h5>

                            <div className="latest-location">
                              <img src={locationIcon} alt="location icon" />
                              <span>{latestBuses.city}</span>
                            </div>
                          </div>
                          <p>₹ {rupee_format(latestBuses.selling_price)}</p>
                        </div>

                        <button
                        onClick={() => {
                          // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                          // setvehicleId(latestBuses._id)
                          setUserObj(latestBuses.user);

                          if(userToken){
                            setSellerDetails(!SellerDetails)
                          }else{
                            setBuyerInput(!BuyerInput)
                          }
                          
                         }}
                        >Get Seller Details</button>
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
                  50: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  999: {
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
                      <Link to={`/vehicledetails/${latestTractor._id}`}>
                        <div className="latest-img-wrapper">
                          <img
                            src={`https://gaddideals.brokerinvoice.co.in${latestTractor.front_side_pic}`}
                            alt={latestTractor.brand.title}
                          />
                        </div>
                      </Link>
                      <div className="latest-info">
                        <div className="latest-header">
                          <div className="latest-title">
                            <h5>{latestTractor.brand.title}</h5>

                            <div className="latest-location">
                              <img src={locationIcon} alt="location icon" />
                              <span>{latestTractor.city}</span>
                            </div>
                          </div>
                          <p>₹ {rupee_format(latestTractor.selling_price)}</p>
                        </div>

                        <button
                        onClick={() => {
                          // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                          // setvehicleId(latestTractor._id)
                          setUserObj(latestTractor.user);

                          if(userToken){
                            setSellerDetails(!SellerDetails)
                          }else{
                            setBuyerInput(!BuyerInput)
                          }
                          
                         }}
                        >Get Seller Details</button>
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
                  50: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  999: {
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
                      <Link to={`/vehicledetails/${latestConstruction._id}`}>
                        <div className="latest-img-wrapper">
                          <img
                            src={`https://gaddideals.brokerinvoice.co.in${latestConstruction.front_side_pic}`}
                            alt={latestConstruction.brand.title}
                          />
                        </div>
                      </Link>
                      <div className="latest-info">
                        <div className="latest-header">
                          <div className="latest-title">
                            <h5>{latestConstruction.brand.title}</h5>

                            <div className="latest-location">
                              <img src={locationIcon} alt="location icon" />
                              <span>{latestConstruction.city}</span>
                            </div>
                          </div>
                          <p>
                            ₹ {rupee_format(latestConstruction.selling_price)}
                          </p>
                        </div>

                        
                      <button
                      onClick={() => {
                        // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                        // setvehicleId(latestConstruction._id)
                        setUserObj(latestConstruction.user);

                        if(userToken){
                          setSellerDetails(!SellerDetails)
                        }else{
                          setBuyerInput(!BuyerInput)
                        }
                        
                       }} 
                      >Get Seller Details</button>
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
          {categoriesData.map((category) => {
            return (
              <div className="our-category" key={category._id}>
                <a href={"/vehiclelistings?category=" + category._id}>
                  <img
                    src={`https://gaddideals.brokerinvoice.co.in${category.image}`}
                    alt={category.title}
                  />
                </a>
                <div className="our-category-title">
                  <h6>{category.title}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Review */}
      <div className="customer-review-section">
        <div className="customer-review-header">
          <h1>Customer Reviews</h1>
        </div>

        <div className="customer-review-container">
          <Swiper
            className="testimonial-slide"
            spaceBetween={20}
            slidesPerView={3}
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
          <h1>Frequently Asked Questions</h1>
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
