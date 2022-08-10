import { useState, useEffect } from "react";

import axios from "axios";

import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import FAQToggle from "../components/FAQToggle";
import Footer from "../components/Footer";
import Constant, { imgurl } from "../constants";

import statecities from "../state-cities.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

// import girlImage from "../assets/girl_image.png";
import locationIcon from "../assets/location-home.png";
import truckHomeImage from "../assets/truck-home.png";
import imgPlaceholder from "../assets/img-not-available.jpg";

import "./sellerhomepage.style.css";

import Lottie from "react-lottie";
import lottieAnimation from "../assets/my-vehicles-lottie.json";
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
import { selectLocation } from "../store/location/location.selector";
import { useSelector } from "react-redux";

// import { useLazyTranslate } from 'react-google-translate';
// const GCP_PRIVATE_KEY=["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"];
// const GCP_CLIENT_EMAIL=["384857094071-ej4f1bi786jn698rkocn43vkhaebo157.apps.googleusercontent.com"];
// const GCP_PROJECT_ID=["AIzaSyBokh77ocsW0ene-vrX80v1Wd5QUj64pSw"];

// import { setConfig } from 'react-google-translate';

const SellerHomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  let user_token = localStorage.getItem("Token");
  const [categoriesData, setCategoriesData] = useState([]);
  const [truckCategoryId, setTruckCategoryId] = useState("");
  const [tractorsCategoryId, setTractorsCategoryId] = useState("");
  const [busesCategoryId, setBusesCategoryId] = useState("");
  const [constructionCategoryId, setConstructionCategoryId] = useState("");
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [advertisementData, setAdvertisementData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [latestTrucksData, setLatestTrucksData] = useState([]);
  const [latestBusesData, setLatestBusesData] = useState([]);
  const [latestTractorsData, setLatestTractorsData] = useState([]);
  const [latestConstructionData, setLatestConstructionData] = useState([]);
  const [faqs, setFAQS] = useState([]);
  const [vehicleId, setvehicleId] = useState("");
  const [token, settoken] = useState(localStorage.getItem("Token"));
  const [locationDropDown, setlocationDropDown] = useState(false);

  const locationCity = useSelector(selectLocation);

  // for get seller details
  // const [loadingDetails, setLoadingDetails] = useState(false);
  const [userObj, setUserObj] = useState();
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

  const fetchAdvertisements = async () => {
    const response = await axios.get(Constant.getUrls.getAllAdvertisments);
    setAdvertisementData(response.data.advertisment.docs);
  };

  const fetchBrands = async () => {
    const response = await axios.get(Constant.getUrls.getAllTrustedClients);
    setBrandsData(response.data.getAllClients.docs);
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

  const filterCurentCities = statecities.filter((data) =>
    data.City.toLowerCase().includes(city.toLowerCase())
  );

  // function loadGoogleTranslate(){
  //   FaGoogle.translate.TranslateElement("intro-title");
  // }
  const validateFields = () => {
    let validateName = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let validateEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const cityExists = statecities.find(
      (cityJson) => city.toLowerCase() === cityJson.City.toLowerCase()
    );

    if (!validateName.test(name)) {
      toast.error("please enter valid name");
      return false;
    }
    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    }
    if (city === "") {
      toast.error("please enter location");
      return false;
    }
    if (!validateEmail.test(email)) {
      toast.error("please enter valid email id");
      return false;
    }
    if (user_type === "") {
      toast.error("please select user type");
      return false;
    }
    if (!cityExists) {
      toast.error("Please select a city");
      return false;
    }
    return true;
  };

  //for user visiting for the first time
  async function enquiryApi() {
    let user_token = localStorage.getItem("Token");

    if (validateFields()) {
      let payload = {
        vehicleId: seller_id,
        name,
        email,
        mob_no,
        user_type,
        city,
        hash: "ekxpmAB8m9v",
      };
      await axios
        .post(Constant.postUrls.postAllEnquiries, payload)
        .then((result) => {
          console.log(result.data);
          if (result.data.status === "failed") {
            console.log(result.data);
            // toast.error(result.data.message);
            toast.error("You are already a user");
            toast.error("Please sign in for enquiry");
          } else {
            if (result.data.status === "success") {
              console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
            }
          }
        });
    }
  }

  //for already logged user
  async function LoggedenquiryApi() {
    let user_token = localStorage.getItem("Token");

    if (validateFields()) {
      let payload = {
        vehicleId: seller_id,
        name,
        email,
        mob_no,
        user_type,
        city,
        hash: "ekxpmAB8m9v",
      };
      await axios
        .post(Constant.postUrls.postAllEnquiries, payload, {
          headers: {
            Authorization: ` Bearer ${user_token} `,
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.status === "failed") {
            console.log(result.data);
            toast.error(result.data.message);
          } else {
            if (result.data.status === "success") {
              console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
            }
          }
        });
    }
  }

  function getSingleUserInfo() {
    let user_token = localStorage.getItem("Token");
    axios
      .get(Constant.getUrls.getSingleUser, {
        headers: {
          Authorization: ` Bearer ${user_token} `,
        },
      })
      .then((res) => {
        // console.log("here" + res.data.user.city);
        // console.log(res.data.user);
        setcity(res.data.user.city);
        setname(res.data.user.name);
        setemail(res.data.user.email);
        setmob_no(res.data.user.mob_no);
        setBuyerInput(!BuyerInput); //displaying buyer input detail screen
        // saveBuyer();
      });
  }

  //saveBuyer
  const saveBuyer = async () => {
    let payload = {
      seller_id,
      name,
      email,
      mob_no,
      user_type,
      city,
      hash: "ekxpmAB8m9v",
    };
    await axios
      .post(Constant.postUrls.postAllEnquiries, payload)
      .then((result) => {
        if (result.data.status === "failed") {
          toast.error(result.data.message);
          console.log(result);
        } else {
          if (result.data.status === "success") {
            toast.success(result.data.message);
            // setvisibleOTP(!visibleOTP);
            setSellerDetails(!SellerDetails);
            // setOtp(otp);
            // verifyOtp();
            setBuyerOtp(!BuyerOtp);
            // setCounter(59);
            // savePhoneOtp();
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const testimonialBuyer = testimonialsData.filter(
    (buyer) => buyer.type === "buyer"
  );

  const faqsBuyer = faqs.filter((buyer) => buyer.type === "buyer");

  function verifyOtp() {
    console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
      console.log("result", result);
      if (mob_no === "") {
        // notify();
        toast.error("enter moile number");
      } else if (result.data.status === "failed") {
        toast.error(result.data.message);
      } else {
        if (result.data.status === "success") {
          toast.success(result.data.message);

          // setOtp(result.data.otp);
          // setvisibleOTP(!visibleOTP);
          // setvisible(false);

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

        setBuyerOtp(!BuyerOtp);
      }
    });
  }
  //for otp page
  const ValidateMobileNo = () => {
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    } else {
      return true;
    }
  };

  //enquiry otp verify
  function enquiryVerifyOtp() {
    if (ValidateMobileNo()) {
      console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllEnquiryOtps, payload).then((res) => {
        console.log(res);

        if (res.data.status === "failed") {
          toast.error("incorrect otp");
        } else if (res.data.status === "Success") {
          toast.success(res.data.message);
          setBuyerOtp(!BuyerOtp); //closingotp screen
          setSellerDetails(!SellerDetails); //displaing seller details
          // saveBuyer();
        }
      });
    }
  }

  //signup otp verify
  function signUpVeryfyOtp() {
    if (ValidateMobileNo()) {
      console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data.user.accessToken);
        window.location.href = "/loggeduser";
        // if (res.data.status === "failed") {
        // toast.error("incorrect otp");
        // } else if (res.data.status === "Success") {
        // toast.success(res.data.message);
        // setBuyerOtp(!BuyerOtp); //closingotp screen
        // setSellerDetails(!SellerDetails); //displaing seller details
        // saveBuyer();
        // }
      });
    }
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
    fetchAdvertisements();
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

  const defaultOptionsVehicle = {
    loop: true,
    autoplay: true,
    animationData: lottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  const filterAdvertisementBuyer = advertisementData.filter(
    (buyer) => buyer.type === "buyer"
  );

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
            containerStyle={{ zIndex: 999999999 }}
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
                  onFocus={() => {
                    setlocationDropDown(!locationDropDown);
                  }}
                ></input>
                <img src={downArrow} alt="" />
                {locationDropDown && (
                  <div className="sign-up-loaction-drop-down">
                    {filterCurentCities.map((data) => (
                      <p
                        onClick={() => {
                          setcity(data.City);
                          setlocationDropDown(false);
                        }}
                      >
                        {data.City}
                      </p>
                    ))}
                  </div>
                )}
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
                  if (user_token) {
                    LoggedenquiryApi();
                  } else {
                    enquiryApi(); //posting data into enquiry api
                  }
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
                <img
                  src={Edit}
                  alt=""
                  onClick={() => {
                    setBuyerInput(!BuyerInput);
                    setBuyerOtp(!BuyerOtp);
                  }}
                ></img>
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
                  if (userToken) {
                    enquiryVerifyOtp(); //verify enquiry otp
                  } else {
                    enquiryVerifyOtp();
                    signUpVeryfyOtp(); //hitting both api
                  }
                }}
              >
                Verify
              </button>
            </div>
          </Modal>
        </div>
      )}
      {SellerDetails && (
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

        <div className="how-cards-container gd_container">
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

        <div className="latest-vehicles-container gd_container">
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
                {latestTrucksData.length > 0 ? (
                  <>
                    {latestTrucksData.map((latestTruck) => (
                      <SwiperSlide
                        className="swiper-slide-latest"
                        key={latestTruck._id}
                      >
                        <div key={latestTruck._id} className="latest-card">
                          <Link to={`/vehicledetails/${latestTruck._id}`}>
                            <div className="latest-img-wrapper">
                              <img
                                src={
                                  latestTruck.front_side_pic
                                    ? `${imgurl}${latestTruck.front_side_pic}`
                                    : ` ${imgPlaceholder}`
                                }
                                alt={latestTruck?.brand?.title}
                              />
                            </div>
                          </Link>
                          <div className="latest-info">
                            <div className="latest-header">
                              <div className="latest-title">
                                <h5>{latestTruck?.brand?.title}</h5>
                                <div className="latest-location">
                                  <img src={locationIcon} alt="location icon" />
                                  <span>{latestTruck.city.title}</span>
                                </div>
                              </div>
                              <p>₹ {rupee_format(latestTruck.selling_price)}</p>
                            </div>

                            <button
                              onClick={() => {
                                setUserObj(latestTruck.user);
                                setseller_id(latestTruck._id);

                                if (userToken) {
                                  getSingleUserInfo();
                                } else {
                                  setBuyerInput(!BuyerInput);
                                }
                              }}
                            >
                              Get Seller Details
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                ) : (
                  <div className="no-data-home">
                    <Lottie
                      options={defaultOptionsVehicle}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
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
                {latestBusesData.length > 0 ? (
                  <>
                    {latestBusesData.map((latestBuses) => (
                      <SwiperSlide
                        className="swiper-slide-latest"
                        key={latestBuses._id}
                      >
                        <div key={latestBuses._id} className="latest-card">
                          <Link to={`/vehicledetails/${latestBuses._id}`}>
                            <div className="latest-img-wrapper">
                              <img
                                src={
                                  latestBuses.front_side_pic
                                    ? `${imgurl}${latestBuses.front_side_pic}`
                                    : ` ${imgPlaceholder}`
                                }
                                alt={latestBuses?.brand?.title}
                              />
                            </div>
                          </Link>
                          <div className="latest-info">
                            <div className="latest-header">
                              <div className="latest-title">
                                <h5>{latestBuses?.brand?.title}</h5>

                                <div className="latest-location">
                                  <img src={locationIcon} alt="location icon" />
                                  <span>{latestBuses.city.title}</span>
                                </div>
                              </div>
                              <p>₹ {rupee_format(latestBuses.selling_price)}</p>
                            </div>

                            <button
                              onClick={() => {
                                // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                                // setvehicleId(latestBuses._id)
                                setUserObj(latestBuses.user);
                                setseller_id(latestBuses._id);
                                if (userToken) {
                                  getSingleUserInfo();
                                } else {
                                  setBuyerInput(!BuyerInput);
                                }
                              }}
                            >
                              Get Seller Details
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                ) : (
                  <div className="no-data-home">
                    <Lottie
                      options={defaultOptionsVehicle}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
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
                {latestTractorsData.length > 0 ? (
                  <>
                    {latestTractorsData.map((latestTractor) => (
                      <SwiperSlide
                        className="swiper-slide-latest"
                        key={latestTractor._id}
                      >
                        <div key={latestTractor._id} className="latest-card">
                          <Link to={`/vehicledetails/${latestTractor._id}`}>
                            <div className="latest-img-wrapper">
                              <img
                                src={
                                  latestTractor.front_side_pic
                                    ? `${imgurl}${latestTractor.front_side_pic}`
                                    : ` ${imgPlaceholder}`
                                }
                                alt={latestTractor?.brand?.title}
                              />
                            </div>
                          </Link>
                          <div className="latest-info">
                            <div className="latest-header">
                              <div className="latest-title">
                                <h5>{latestTractor?.brand?.title}</h5>

                                <div className="latest-location">
                                  <img src={locationIcon} alt="location icon" />
                                  <span>{latestTractor.city.title}</span>
                                </div>
                              </div>
                              <p>
                                ₹ {rupee_format(latestTractor.selling_price)}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                                // setvehicleId(latestTractor._id)
                                setUserObj(latestTractor.user);
                                setseller_id(latestTractor._id);
                                if (userToken) {
                                  getSingleUserInfo();
                                } else {
                                  setBuyerInput(!BuyerInput);
                                }
                              }}
                            >
                              Get Seller Details
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                ) : (
                  <div className="no-data-home">
                    <Lottie
                      options={defaultOptionsVehicle}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
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
                {latestConstructionData.length > 0 ? (
                  <>
                    {latestConstructionData.map((latestConstruction) => (
                      <SwiperSlide
                        className="swiper-slide-latest"
                        key={latestConstruction._id}
                      >
                        <div
                          key={latestConstruction._id}
                          className="latest-card"
                        >
                          <Link
                            to={`/vehicledetails/${latestConstruction._id}`}
                          >
                            <div className="latest-img-wrapper">
                              <img
                                src={
                                  latestConstruction.front_side_pic
                                    ? `${imgurl}${latestConstruction.front_side_pic}`
                                    : ` ${imgPlaceholder}`
                                }
                                alt={latestConstruction?.brand?.title}
                              />
                            </div>
                          </Link>
                          <div className="latest-info">
                            <div className="latest-header">
                              <div className="latest-title">
                                <h5>{latestConstruction?.brand?.title}</h5>

                                <div className="latest-location">
                                  <img src={locationIcon} alt="location icon" />
                                  <span>{latestConstruction.city.title}</span>
                                </div>
                              </div>
                              <p>
                                ₹{" "}
                                {rupee_format(latestConstruction.selling_price)}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                // userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)
                                // setvehicleId(latestConstruction._id)
                                setUserObj(latestConstruction.user);
                                setseller_id(latestConstruction._id);
                                if (userToken) {
                                  getSingleUserInfo();
                                } else {
                                  setBuyerInput(!BuyerInput);
                                }
                              }}
                            >
                              Get Seller Details
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                ) : (
                  <div className="no-data-home">
                    <Lottie
                      options={defaultOptionsVehicle}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </Swiper>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <div className="our-categories-section gd_container">
        <div className="our-categories-header">
          <h1>Our Categories</h1>
        </div>

        <div className="our-categories-container">
          {categoriesData.map((category) => {
            return (
              <div className="our-category" key={category._id}>
                <a href={"/vehiclelistings?category=" + category._id}>
                  <img
                    src={`${imgurl}${category.image}`}
                    alt={category?.title}
                  />
                </a>
                <div className="our-category-title">
                  <h6>{category?.title}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Review */}
      <div className="customer-review-section gd_container">
        <div className="customer-review-header">
          <h1>Customer Reviews</h1>
        </div>

        <div className="customer-review-container">
          <Swiper
            className="testimonial-slide"
            centeredSlides={true}
            spaceBetween={testimonialBuyer.length === 2 ? 0 : 20}
            slidesPerView={
              testimonialBuyer.length === 1
                ? "auto"
                : testimonialBuyer.length === 2
                ? 2
                : 3
            }
            grabCursor={true}
            breakpoints={{
              50: {
                slidesPerView: "auto",
                spaceBetween: 10,
              },
              820: {
                slidesPerView: "auto",
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
            {testimonialBuyer.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                className="customer-swiper-slide"
              >
                <div className="customer-card">
                  <div className="profile-img">
                    <img
                      src={`${imgurl}${testimonial.image}`}
                      alt={testimonial?.title}
                    />
                  </div>
                  <div className="profile-name-location">
                    <h6>{testimonial?.title}</h6>
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
          <h1>Trusted Clients</h1>
        </div>

        <div className="trusted-brands-container gd_container">
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
                  <img src={`${imgurl}${brand?.image}`} alt={brand?.name} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section gd_container">
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
        </div>

        <div className="faq-container">
          {faqsBuyer.map((faq) => (
            <FAQToggle key={faq._id} question={faq.question}>
              <div className="answer">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            </FAQToggle>
          ))}
        </div>
      </div>

      {/*Truck Image  */}
      <div className="truck-section gd_container">
        <Swiper
          grabCursor={true}
          modules={[Autoplay]}
          className="advertise-swiper"
        >
          {filterAdvertisementBuyer.map((advertise) => (
            <SwiperSlide key={advertise._id} className="advertise-slide">
              <div className="image-wrapper">
                <img src={`${imgurl}${advertise.image}`} alt="truck" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <Footer />
      {locationDropDown && (
        <div
          className="mob-menue-overlay"
          onClick={() => {
            setlocationDropDown(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default SellerHomePage;
