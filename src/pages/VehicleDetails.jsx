import "./vehicledetails.style.css";
import locationIcon from "../assets/location.png";
import calculatorIcon from "../assets/calculator.png";
import shareIcon from "../assets/share.png";
import speedometerIcon from "../assets/speedometer.png";
import ownerIcon from "../assets/owner.png";
import calenderIcon from "../assets/calendar.png";
import tyreIcon from "../assets/tyre.png";
import racingIcon from "../assets/racing.png";
import horsePowerIcon from "../assets/horse-power-icon.png";
import seatIcon from "../assets/seat-icon.png";
import CloseTab from "../assets/close-tab.png";
import downArrow from "../assets/down-arrow.png";
import Edit from "../assets/edit.png";
import manualTransmissionIcon from "../assets/gas-station.png";
import similarTruck from "../assets/trucks1.png";
import similarTruckSmall from "../assets/similar-truck-small.png";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Constant from "../constants";

import { toast } from "react-toastify";

import moment from "moment";

import { imgurl } from "../constants";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs, FreeMode } from "swiper";

import Modal from "react-awesome-modal";
import OtpInput from "react-otp-input";

const VehicleDetails = () => {
  const { id } = useParams();
  const [getvehicledetails, setVehicleDetails] = useState({});

  const [imageArray, setImageArray] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [loadingDetails, setLoadingDetails] = useState(false);

  const [checkCategory, setCheckCategory] = useState("");
  const [categoryTruck, setCategoryTruck] = useState("");
  const [BuyerInput, setBuyerInput] = useState(false);
  const [BuyerOtp, setBuyerOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [SellerDetails, setSellerDetails] = useState("");

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  useEffect(() => {
    const getSingleVehicleDetails = async () => {
      setLoadingDetails(true);
      const res = await axios.get(
        "https://gaddideals.brokerinvoice.co.in/api/vehicle/vehicleDetails/" +
          id
      );
      // console.log(res.data.vehicle.user._id);
      setVehicleDetails(res.data.vehicle);
      setCheckCategory(res.data?.vehicle?.category?.title);
      setseller_id(res.data?.vehicle?.user?._id);
      setSeller(res.data?.vehicle?.user);

      let frontBackArr = [];
      frontBackArr.push(
        res.data.vehicle?.front_side_pic,
        res.data.vehicle?.back_side_pic
      );
      setImageArray(frontBackArr);

      let frontTyreArr = [];
      res.data.vehicle?.front_tyre?.forEach((tyre) => frontTyreArr.push(tyre));
      setImageArray((prevState) => [...prevState, ...frontTyreArr]);

      let sidePicArr = [];
      res.data.vehicle?.side_pic_vehicle?.forEach((sidePic) =>
        sidePicArr.push(sidePic)
      );
      setImageArray((prevState) => [...prevState, ...sidePicArr]);

      setLoadingDetails(false);
    };

    getSingleVehicleDetails();
  }, []);

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
    console.log(otp);
  }

  function savePhoneOtp() {
    console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      console.log(res);

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
      console.log("result", result);
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

  const formatDate = (date) => {
    return moment(date).utc().format("YYYY-MM-DD");
  };

  if (loadingDetails) {
    return "Loading...";
  }

  return (
    <>
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
                    seller.profile_pic_url
                  }
                ></img>
              </div>
              <div className="userName">{seller.name}</div>
              <hr></hr>
              <input value={seller.name} placeholder="Name"></input>
              <input value={seller.mob_no} placeholder="Phone Numer"></input>
              <input value={seller.email} placeholder="Email"></input>
            </div>
          </Modal>
        </div>
      )}

      {!loadingDetails && (
        <section className="vehicle-details-container">
          <div className="detail-pages-navigation">
            <Link to="/">
              <small>Home</small>
            </Link>
            &nbsp; &#62; &nbsp;
            <Link to="/vehiclelistings">
              <small>Vehicle listing</small>
            </Link>
            &nbsp; &#62; &nbsp;
            <small>Vehicle detail</small>
          </div>
          <div className="vehicle-detail">
            <div className="vehicle-thumbnail">
              <Swiper
                loop={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                spaceBetween={10}
                navigation={true}
                grabCursor={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="vehicles-swiper-container"
              >
                {imageArray.map((thumbsImage, index) => (
                  <SwiperSlide key={index}>
                    <img src={`${imgurl}${thumbsImage}`} alt="truck" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* mob vehicle gallery */}
            <div className="mob-vehicle-gallery-container">
              <Swiper
                loop={true}
                navigation={true}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="vehicles-thumbs-swiper"
              >
                {imageArray.map((thumb, index) => (
                  <SwiperSlide key={index}>
                    <div className="thumb">
                      <img src={imgurl + thumb} alt="truck thumbnail" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="vehicle-info">
              <div className="vehicle-info-wrapper">
                <div className="heading-container">
                  <div className="title">
                    <h3>
                      {getvehicledetails.model
                        ? getvehicledetails.model.name
                        : "No model found"}
                    </h3>
                    <div className="truck-location">
                      <img src={locationIcon} alt="location" />
                      <span>{getvehicledetails.city} </span>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="calculator">
                      <img src={calculatorIcon} alt="calculator icon" />
                      <span>EMI Calcualtor</span>
                    </div>
                    <div className="share">
                      <img src={shareIcon} alt="share icon" />
                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div className="vehicle-statistics-container">
                  <div className="row-one-detail">
                    <div className="stat">
                      <img src={speedometerIcon} alt="speedometer icon" />
                      <span>{getvehicledetails.km_driven}</span>
                    </div>
                    <div className="stat">
                      <img src={ownerIcon} alt="owner icon" />
                      <span>{getvehicledetails.no_of_owner}</span>
                    </div>
                    <div className="stat calender">
                      <img src={calenderIcon} alt="calender icon" />
                      <span>2022</span>
                    </div>
                  </div>

                  <div className="row-two-detail">
                    {checkCategory === "Trucks" && (
                      <div className="stat">
                        <img src={tyreIcon} alt="tyre icon" />
                        <span>{getvehicledetails.no_of_tyre}</span>
                      </div>
                    )}
                    {checkCategory === "Tractors" && (
                      <div className="stat">
                        <img src={horsePowerIcon} alt="horse power icon" />
                        <span>{getvehicledetails.horse_power} Bph</span>
                      </div>
                    )}
                    {checkCategory === "Buses" && (
                      <div className="stat">
                        <img src={seatIcon} alt="seat icon" />
                        <span>{getvehicledetails.no_of_seats}</span>
                      </div>
                    )}
                    {checkCategory === "Construction Equipments" && (
                      <div className="stat">
                        <img src={tyreIcon} alt="tyre icon" />
                        <span>{getvehicledetails.no_of_tyre}</span>
                      </div>
                    )}
                    <div className="stat racing">
                      <img src={racingIcon} alt="racing icon" />
                      <span>{getvehicledetails.tyre_cond}</span>
                    </div>
                    <div className="stat manual">
                      <img
                        src={manualTransmissionIcon}
                        alt="manual transmission icon"
                      />
                      <span>
                        {getvehicledetails.fuelType
                          ? getvehicledetails.fuelType.title
                          : "No Title Found"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div className="selling-price-container">
                  <p>
                    Selling Price{" "}
                    <span>
                      ₹{rupee_format(getvehicledetails?.selling_price)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="selling-detail-container">
                <button
                  onClick={()=>{userToken ? setSellerDetails(!SellerDetails) : setBuyerInput(!BuyerInput)} }
                >
                  Get Seller Details
                </button>

                <div className="seller-transaction">
                  <span>Secured Transaction</span>
                  <p>
                    Fully Refundable On Cancellation Or When The Car Gets
                    Delivered To You
                  </p>
                </div>

                <p className="para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  libero, dicta ex quod reprehenderit repellat optio nisi
                  molestiae, dignissimos mollitia voluptates ipsa perspiciatis!
                  Asperiores ipsam, at itaque ipsum esse beatae!
                </p>
              </div>
            </div>
          </div>

          {/* mobile reps overview container */}
          <div className="mob-overview-container">
            <h3>Overview</h3>

            <div className="row-one">
              <div className="row-content">
                <h6>Number of kilometers</h6>
                <span>{getvehicledetails.km_driven} Km</span>
              </div>
              <div className="row-content">
                <h6>Number of Owners</h6>
                <span>{getvehicledetails.no_of_owner}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-two">
              <div className="row-content">
                <h6>Manufacturing year</h6>
                <span>2013</span>
              </div>
              <div className="row-content">
                <h6>City</h6>
                <span>{getvehicledetails.city}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-three">
              <div className="row-content">
                <h6>Insurance validity</h6>
                <span>{formatDate(getvehicledetails.insurance)}</span>
              </div>
              <div className="row-content">
                <h6>Tyre condition</h6>
                <span>{getvehicledetails.tyre_cond}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              <div className="row-content">
                <h6>Transmission</h6>
                <span>
                  {getvehicledetails.fuelType
                    ? getvehicledetails.fuelType.title
                    : "No Title Found"}
                </span>
              </div>
              <div className="row-content">
                <h6>Vehicle number</h6>
                <span>{getvehicledetails.reg_no}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              <div className="row-content">
                <h6>Tax validity up to</h6>
                <span>{formatDate(getvehicledetails.tax_validity)}</span>
              </div>
              <div className="row-content">
                <h6>Number of tyres</h6>
                <span>{getvehicledetails.no_of_tyre}</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="row-four">
              <div className="row-content">
                <h6>Fitness certificate</h6>
                <span>{formatDate(getvehicledetails.fitness_certificate)}</span>
              </div>
            </div>
          </div>

          {/* ====================================================================== */}

          <div className="vehicle-gallery-container">
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              navigation={true}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="vehicles-thumbs-swiper"
            >
              {imageArray.map((thumb, index) => (
                <SwiperSlide key={index}>
                  <div className="thumb">
                    <img src={imgurl + thumb} alt="truck thumbnail" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Overview */}
          <div className="overview-container">
            <h3>Overview</h3>

            <div className="row-one">
              <div className="row-content">
                <h6>Number of kilometers</h6>
                <span>{getvehicledetails.km_driven} Km</span>
              </div>
              <div className="row-content">
                <h6>Number of Owners</h6>
                <span>{getvehicledetails.no_of_owner}</span>
              </div>
              <div className="row-content">
                <h6>Manufacturing year</h6>
                <span>2013</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-two">
              <div className="row-content">
                <h6>City</h6>
                <span>{getvehicledetails.city}</span>
              </div>
              <div className="row-content">
                <h6>Insurance validity</h6>
                <span>{formatDate(getvehicledetails.insurance)}</span>
              </div>
              <div className="row-content">
                <h6>Tyre condition</h6>
                <span>{getvehicledetails.tyre_cond}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-three">
              <div className="row-content">
                <h6>Fuel Type</h6>
                <span>
                  {getvehicledetails.fuelType
                    ? getvehicledetails.fuelType.title
                    : "No Title Found"}
                </span>
              </div>
              <div className="row-content">
                <h6>Vehicle number</h6>
                <span>{getvehicledetails.reg_no}</span>
              </div>
              <div className="row-content">
                <h6>Tax validity up to</h6>
                <span>{formatDate(getvehicledetails.tax_validity)}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              {checkCategory === "Trucks" && (
                <div className="row-content">
                  <h6>Number of tyres</h6>
                  <span>{getvehicledetails.no_of_tyre}</span>
                </div>
              )}
              {checkCategory === "Tractors" && (
                <div className="row-content">
                  <h6>Horse Power</h6>
                  <span>{getvehicledetails.horse_power} Bph</span>
                </div>
              )}
              {checkCategory === "Buses" && (
                <div className="row-content">
                  <h6>Number of seating</h6>
                  <span>{getvehicledetails.no_of_seats}</span>
                </div>
              )}
              <div className="row-content">
                <h6>Fitness certificate</h6>
                <span>{formatDate(getvehicledetails.fitness_certificate)}</span>
              </div>
              <div className="row-content"></div>
            </div>
          </div>

          {/* Similar Vehicle */}

          <div className="similar-vehicles-container">
            <div className="title">
              <h1>similar vehicle</h1>
            </div>
            <div className="similar-vehicles-list">
              <div className="similar-vehicle-card">
                <div className="img-wrapper">
                  <img src={similarTruck} alt="truck" />
                </div>

                <div className="vehicle-info">
                  <div className="title">
                    <h5>Tata Intra V30</h5>
                    <div className="location">
                      <img src={locationIcon} alt="location icon" />
                      <span>Mumbai</span>
                    </div>
                  </div>
                  <div className="price">
                    <p>
                      Selling Price <span>₹4,65,000</span>
                    </p>
                  </div>
                  <div className="gallery">
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                  </div>
                  <button>Get Seller Details</button>
                </div>
              </div>

              <div className="similar-vehicle-card">
                <div className="img-wrapper">
                  <img src={similarTruck} alt="truck" />
                </div>
                <div className="vehicle-info">
                  <div className="title">
                    <h5>Tata Intra V30</h5>
                    <div className="location">
                      <img src={locationIcon} alt="location icon" />
                      <span>Mumbai</span>
                    </div>
                  </div>
                  <div className="price">
                    <p>
                      Selling Price <span>₹4,65,000</span>
                    </p>
                  </div>
                  <div className="gallery">
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                  </div>
                  <button>Get Seller Details</button>
                </div>
              </div>

              <div className="similar-vehicle-card">
                <div className="img-wrapper">
                  <img src={similarTruck} alt="truck" />
                </div>
                <div className="vehicle-info">
                  <div className="title">
                    <h5>Tata Intra V30</h5>
                    <div className="location">
                      <img src={locationIcon} alt="location icon" />
                      <span>Mumbai</span>
                    </div>
                  </div>
                  <div className="price">
                    <p>
                      Selling Price <span>₹4,65,000</span>
                    </p>
                  </div>
                  <div className="gallery">
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                    <div className="thumb">
                      <img src={similarTruckSmall} alt="truck" />
                    </div>
                  </div>
                  <button>Get Seller Details</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default VehicleDetails;
