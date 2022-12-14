import "./vehicledetails.style.css";
import React from "react";
import { CircularProgress } from "@mui/material";

import statecities from "../state-cities.json";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

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
import imgPlaceHolder from "../assets/img-not-available.jpg";
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
import "swiper/css";

import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

import { toast } from "react-toastify";
import { FaUserTie } from "react-icons/fa";

import moment from "moment";

import { imgurl } from "../constants";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs, FreeMode, Autoplay } from "swiper";

import Modal from "react-awesome-modal";
import OtpInput from "react-otp-input";

import { selectLocation } from "../store/location/location.selector";
import { useSelector } from "react-redux";
import TapIcon from "../assets/tap-icon.png";

import DonutChart from "react-donut-chart";

// import Slider from 'react-rangeslider'
import { Slider, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { zIndex } from "material-ui/styles";
Chart.register(ArcElement);

const PrettoSlider = withStyles({
  root: { color: "#050F56", height: 10 },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#050F56",
    border: "none",
    marginTop: -5,
    marginLeft: -9,
  },
  track: { height: 5, borderRadius: 7 },
  rail: { height: 5, borderRadius: 7 },
})(Slider);

const VehicleDetails = () => {
  const { id } = useParams();
  const [getvehicledetails, setVehicleDetails] = useState({});
  const [locationDropDown, setlocationDropDown] = useState(false);

  const [shareVehicle, setShareVehicle] = useState(false);
  let user_token = localStorage.getItem("Token");
  const [imageArray, setImageArray] = useState([]);
  const [similarImageArr, setSimilarImageArr] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mobThumbsSwiper, setMobThumbsSwiper] = useState(null);

  const [loadingDetails, setLoadingDetails] = useState(false);

  const [checkCategory, setCheckCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [BuyerInput, setBuyerInput] = useState(false);
  const [BuyerOtp, setBuyerOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [SellerDetails, setSellerDetails] = useState(false);
  const [similarVehicles, setSimilarVehicles] = useState([]);
  const [similarVehicleId, setsimilarVehicleId] = useState("");
  const [selectedSimilarVehicle, setselectedSimilarVehicle] = useState(false);

  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));
  const locationCity = useSelector(selectLocation);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mob_no, setmob_no] = useState("");
  const [city, setcity] = useState("");
  const [user_type, setuser_type] = useState("");
  const [isTypeActive, setIsTypeActive] = useState();
  const [vehicleId, setvehicleId] = useState("");
  const [seller, setSeller] = useState("");

  const [isLightboxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [editableIntrest, seteditableIntrest] = useState(true);
  const [EmiModal, setEmiModal] = useState(false);
  const [downPayment, setdownPayment] = useState();
  // const maxValue = getvehicledetails?.selling_price - 50000;
  const initialPAmount = getvehicledetails?.selling_price * 0.8;
  const [pAmount, setpAmount] = useState(); //loan priciple amount
  const [interest, setinterest] = useState(15);
  const [duration, setDuration] = useState(12);
  const [years, setyears] = useState(1);
  const intMax = 20; //maximum intrest

  let b = pAmount;
  let d = downPayment;
  function changeDuration(vDur) {
    if (vDur == 1) {
      setDuration(12);
    } else if (vDur == 2) {
      setDuration(24);
    } else if (vDur == 3) {
      setDuration(36);
    } else if (vDur == 4) {
      setDuration(48);
    } else if (vDur == 5) {
      setDuration(60);
    }
  }

  const intr = interest / 1200;
  const emi = duration
    ? Math.round((pAmount * intr) / (1 - Math.pow(1 / (1 + intr), duration)))
    : 0;
  const totalAmt = duration * emi;
  var TotalAmountOfCredit = Math.round(
    (emi / intr) * (1 - Math.pow(1 + intr, -duration))
  );
  const TotalAmountOfIntrest = Math.round(totalAmt - TotalAmountOfCredit);

  function changeDownpament(c) {
    setdownPayment(downPayment + c);
  }

  function changepAmount(e) {
    setpAmount(pAmount + e);
  }

  // const [volume,setvolume]=useState(0);

  //  function handleOnChange (value) {
  // this.setState({
  //   volume: value
  // })
  // setvolume(value);
  // }

  // const muiTheme = getMuiTheme({
  //   slider: {
  //     trackColor: "yellow",
  //     selectionColor: "red"
  //   }
  // });

  const [EnableResendOtp, setEnableResendOtp] = useState(false);
  const [timerVisible, settimerVisible] = useState(true);

  const [counter, setCounter] = React.useState(25);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setEnableResendOtp(true);
      settimerVisible(false);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const filterCurentCities = statecities.filter((data) =>
    data.City.toLowerCase().includes(city.toLowerCase())
  );
  function valuetext(value: number) {
    return `${value}??C`;
  }

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
        Constant.getUrls.getAllVehicles + "/vehicleDetails/" + id
      );
      // console.log(res.data.vehicle.user._id);
      setVehicleDetails(res.data.vehicle);

      setpAmount(Math.round(res.data?.vehicle?.selling_price * 0.8));
      setdownPayment(Math.round(res.data?.vehicle?.selling_price * 0.2));
      setCheckCategory(res.data?.vehicle?.category?.title);
      setCategoryId(res.data?.category?._id);
      setvehicleId(res.data?.vehicle?._id);

      // console.log(res.data?.vehicle?._id);
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

    const getSimilarVehicles = async () => {
      try {
        const response = await axios.get(
          Constant.getUrls.getAllVehicles +
            `?category=${categoryId}&status=approved`
        );

        if (response.data) {
          setSimilarVehicles(response?.data?.vehicle?.docs);
          // console.log(response?.data?.vehicle?.docs);

          let frontBackArr = [];
          frontBackArr.push(
            response.data?.vehicle?.front_side_pic,
            response.data?.vehicle?.back_side_pic
          );
          setSimilarImageArr(frontBackArr);

          let frontTyreArr = [];
          response.data?.vehicle?.front_tyre?.forEach((tyre) =>
            frontTyreArr.push(tyre)
          );
          setSimilarImageArr((prevState) => [...prevState, ...frontTyreArr]);

          let sidePicArr = [];
          response.data?.vehicle?.side_pic_vehicle?.forEach((sidePic) =>
            sidePicArr.push(sidePic)
          );
          setSimilarImageArr((prevState) => [...prevState, ...sidePicArr]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSingleVehicleDetails();
    getSimilarVehicles();
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

  //for already logged user
  async function LoggedenquiryApi() {
    let user_token = localStorage.getItem("Token");

    if (validateFields()) {
      console.log("yy" + similarVehicleId);
      let payload = {
        vehicleId: !selectedSimilarVehicle ? vehicleId : similarVehicleId,
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
          // console.log(result.data);
          if (result.data.status === "failed") {
            // console.log(result.data);
            toast.error(result.data.message);
          } else {
            if (result.data.status === "success") {
              // console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
            }
          }
        });
    }
  }

  //fetcing sigle user info if user is logged-in
  function getSingleUserInfo() {
    let user_token = localStorage.getItem("Token");
    axios
      .get(Constant.getUrls.getSingleUser, {
        headers: {
          Authorization: ` Bearer ${user_token} `,
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data.user);
        setcity(res.data.user.city);
        setname(res.data.user.name);
        setemail(res.data.user.email);
        setmob_no(res.data.user.mob_no);
        setBuyerInput(!BuyerInput); //displaying buyer input detail screen
        // saveBuyer();
      });
  }

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

  //enquri api hit => otp sent to mob no.
  async function enquiryApi() {
    let user_token = localStorage.getItem("Token");
    console.log("yy" + similarVehicleId);
    if (validateFields()) {
      let payload = {
        vehicleId: !selectedSimilarVehicle ? vehicleId : similarVehicleId,
        name,
        email,
        mob_no,
        user_type,
        city,
        hash: "ekxpmAB8m9v",
      };
      // console.log(payload);
      await axios
        .post(Constant.postUrls.postAllEnquiries, payload)
        .then((result) => {
          // console.log(result.data);
          if (result.data.status === "failed") {
            // console.log(result.data);
            // toast.error(result.data.message);
            toast.error("You are already a user");
            toast.error("Please sign in for enquiry");
          } else {
            if (result.data.status === "success") {
              // console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
              // setvisibleOTP(!visibleOTP);
              // setmob_no(mob_no);
              // setSellerDetails(!SellerDetails); //displaying seller details
              // setOtp(otp);
              // setBuyerOtp(!BuyerOtp);
              // setCounter(59);
            }
          }
        });
    }
  }

  function verifyOtp() {
    console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
      // console.log("result", result);
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
      // console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllEnquiryOtps, payload).then((res) => {
        // console.log(res);

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
      // console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
        // console.log(res);
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
          // setOtp(result.data.otp);
          settimerVisible(true);
          setEnableResendOtp(false);
          setCounter(25);
        }
      }
    });
  }

  const formatDate = (date) => {
    return moment(date).utc().format("YYYY-MM-DD");
  };

  if (loadingDetails) {
    return <CircularProgress />;
  }

  let images = imageArray.map((index) => imgurl + index);

  return (
    <>
      <Navbar />

      {EmiModal && (
        <Modal
          visible={EmiModal}
          width={matches ? "90%" : "100vw"}
          height={matches ? "auto" : "auto"}
          effect="fadeInUp"
          onClickAway={() => {
            setEmiModal(!EmiModal);
          }}
        >
          <div className="emi-section">
            <div className="emi-left-side-div">
              <img
                className="cross-img-mobile"
                src={CloseTab}
                alt=""
                onClick={() => {
                  setEmiModal(!EmiModal);
                }}
              />
              <div className="emi-left-top-div">
                <p>
                  <span className="selling-price"> ???{rupee_format(emi)} </span>{" "}
                  per month
                </p>
              </div>
              <div className="emi-left-mid-div">
                <div className="donut-graph">
                  <Pie
                    data={{
                      labels: ["total interest", "Total Amount"],
                      datasets: [
                        {
                          data: [pAmount, TotalAmountOfIntrest],
                          backgroundColor: ["#CAF0FF", "#050F56"],
                        },
                      ],
                    }}
                  />
                </div>
                <div className="pla-div">
                  <div className="pla-text">
                    <span className="cir1"></span>Principal Loan Amount
                  </div>
                  <div className="pla-price"> ???{rupee_format(pAmount)}</div>
                </div>
                {/* total interest payable div */}
                <div className="pla-div">
                  <div className="pla-text">
                    <span className="cir2"></span>Total Interest Payable
                  </div>
                  <div className="pla-price">
                    ???{rupee_format(TotalAmountOfIntrest)}
                  </div>
                </div>
              </div>

              <div className="emi-left-bottom-div">
                <div className="pla-text Tap-img-text">
                  <img src={TapIcon} alt="" />
                  Total Amount Payable
                </div>
                <div className="pla-price">???{rupee_format(totalAmt)} </div>
              </div>
            </div>
            {/* <div className="verticle-hr"></div> */}
            <div className="emi-right-side-div">
              <img
                className="cross-img"
                src={CloseTab}
                alt=""
                onClick={() => {
                  setEmiModal(!EmiModal);
                }}
              />
              {/* loan amount div */}
              <div className="la-div">
                <div className="la-top-div">
                  <div className="la-text">Loan Amount</div>
                  <div className="la-price pla-price">
                    ???{rupee_format(pAmount)}
                  </div>
                </div>
                <div className="range-slider">
                  {/* slider 1 */}
                  <PrettoSlider
                    value={pAmount}
                    onChange={(event, vAmt) => {
                      setpAmount(vAmt);
                      let c = b - vAmt;
                      changeDownpament(c);
                    }}
                    defaultValue={pAmount}
                    min={100000}
                    max={Math.round(getvehicledetails?.selling_price * 0.8)}
                  />
                </div>
                <div className="min-max">
                  <p>???1,00,000</p>
                  <p>
                    ???
                    {rupee_format(
                      Math.round(getvehicledetails?.selling_price * 0.8)
                    )}
                  </p>
                </div>
                {/* <div className="selected-la pla-price">{pAmount}</div> */}
              </div>
              {/* down payment div */}
              <div className="la-div">
                <div className="la-top-div">
                  <div className="la-text">Down Payment</div>
                  <div className="la-price pla-price">
                    ???{rupee_format(downPayment)}
                  </div>
                </div>
                <div className="range-slider">
                  {/* slider 2 */}
                  {/* <Typography gutterBottom>Interest Rate</Typography> */}
                  <PrettoSlider
                    value={downPayment}
                    onChange={(event, vInt) => {
                      setdownPayment(vInt);

                      let e = d - vInt;
                      changepAmount(e);

                      // setpAmount(pAmount-vInt);
                    }}
                    defaultValue={downPayment}
                    min={Math.round(getvehicledetails?.selling_price * 0.2)}
                    max={getvehicledetails?.selling_price - 100000}
                  />
                </div>
                <div className="min-max">
                  <p>
                    ???
                    {rupee_format(
                      Math.round(getvehicledetails?.selling_price * 0.2)
                    )}
                  </p>
                  <p>
                    ???{rupee_format(getvehicledetails?.selling_price - 100000)}
                  </p>
                </div>
                {/* <div className="selected-la pla-price">???{downPayment}</div> */}
              </div>
              {/* loan duration div */}
              <div className="la-div">
                <div className="la-top-div">
                  <div className="la-text">Duration of loan</div>
                  <div className="la-price pla-price">{years} year</div>
                </div>
                <div className="range-slider">
                  {/* slider 3 */}
                  {/* <Typography gutterBottom>Duration</Typography> */}
                  <PrettoSlider
                    value={years}
                    onChange={(event, vDur) => {
                      setyears(vDur);
                      changeDuration(vDur);
                    }}
                    defaultValue={years}
                    min={1}
                    max={5}
                  />
                </div>
                <div className="min-max">
                  <p>1 Year</p>
                  <p>5 Year</p>
                </div>
                {/* <div className="selected-la pla-price">{duration} </div> */}
              </div>
              {/* interest rate div */}
              <div className="ir-div">
                <div className="ir-text"> Interest Rate*</div>
                <div className="ir-number-div">
                  <span className="percent-symbol">
                    <input
                      readOnly={editableIntrest}
                      type="number"
                      min="0"
                      max="20"
                      className="ir-percent"
                      value={interest}
                      onChange={(event) => {
                        setinterest(event.target.value);
                      }}
                    />
                    %
                  </span>
                  {/* <div className="edit-img"> */}
                  <img
                    src={Edit}
                    alt=""
                    onClick={() => {
                      seteditableIntrest(false);
                    }}
                  />
                  {/* </div> */}
                </div>
              </div>
              {/* <button>CHECK ELIGIBILITY</button> */}
            </div>
          </div>
        </Modal>
      )}

      <Modal
        visible={BuyerInput}
        width={matches ? "85%" : "35%"}
        effect="fadeInLeft"
        onClickAway={() => {
          setBuyerInput(!BuyerInput);
        }}
      >
        <div className="buyer-dtails-container ">
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
            <img src={downArrow} alt=""></img>
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
              setCounter(25);
            }}
          >
            Get Contact Details
          </button>
        </div>
      </Modal>

      <Modal
        visible={BuyerOtp}
        width={matches ? "85%" : "35%"}
        effect="fadeInLeft"
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
          <div className="new-otp-text">
            {timerVisible && (
              <p>
                Get new OTP in
                <span className="blue-text"> {counter} sec</span>
              </p>
            )}
            {EnableResendOtp && (
              <p
                onClick={() => {
                  resendotp();
                }}
                className="blue-text"
              >
                Resend
              </p>
            )}
          </div>
          <button
            onClick={() => {
              if (userToken) {
                enquiryVerifyOtp();
              } //verify enquiry otp
              else {
                enquiryVerifyOtp();
                signUpVeryfyOtp(); //hitting both api
              }
            }}
          >
            Verify
          </button>
        </div>
      </Modal>

      <Modal
        visible={SellerDetails}
        width={matches ? "85%" : "35%"}
        effect="fadeInLeft"
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
            <img src={imgurl + seller.profile_pic_url}></img>
          </div>
          <div className="userName">{seller.name}</div>
          <hr></hr>
          <input value={seller.name} placeholder="Name"></input>
          <input value={seller.mob_no} placeholder="Phone Numer"></input>
          <input value={seller.email} placeholder="Email"></input>
        </div>
      </Modal>

      {!loadingDetails && (
        <section className="vehicle-details-container gd_container">
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
                on
                spaceBetween={10}
                navigation={true}
                grabCursor={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="vehicles-swiper-container"
              >
                {imageArray.map((thumbsImage, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={
                        thumbsImage
                          ? `${imgurl}${thumbsImage}`
                          : `${imgPlaceHolder}`
                      }
                      alt="truck"
                      onClick={() => setIsLightBoxOpen(true)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {isLightboxOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length]
                }
                onCloseRequest={() => setIsLightBoxOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + images.length - 1) % images.length
                  )
                }
                clickOutsideToClose={true}
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % images.length)
                }
                imageTitle={`${getvehicledetails?.brand?.title}  ${getvehicledetails?.model?.name}`}
              />
            )}

            {/* Mob Vehicle Thumbnail */}
            <div className="mob-vehicle-thumbnail">
              <Swiper
                loop={true}
                thumbs={{
                  swiper:
                    mobThumbsSwiper && !mobThumbsSwiper.destroyed
                      ? mobThumbsSwiper
                      : null,
                }}
                on
                spaceBetween={10}
                navigation={true}
                grabCursor={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="vehicles-swiper-container"
              >
                {imageArray.map((thumbsImage, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={
                        thumbsImage
                          ? `${imgurl}${thumbsImage}`
                          : `${imgPlaceHolder}`
                      }
                      alt="truck"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* mob vehicle gallery */}
            <div className="mob-vehicle-gallery-container">
              <Swiper
                onSwiper={setMobThumbsSwiper}
                loop={true}
                navigation={true}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="vehicles-thumbs-swiper"
              >
                {imageArray.map((thumb, index) => (
                  <SwiperSlide key={index}>
                    <div className="thumb">
                      <img
                        src={thumb ? `${imgurl}${thumb}` : `${imgPlaceHolder}`}
                        alt="truck thumbnail"
                      />
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
                      {getvehicledetails?.brand?.title}{" "}
                      {getvehicledetails?.model?.name}
                    </h3>
                    <div className="truck-location">
                      <img src={locationIcon} alt="location" />
                      <span>{getvehicledetails?.city?.title}</span>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div
                      onClick={() => {
                        setEmiModal(!EmiModal);
                      }}
                      className="calculator"
                    >
                      <img src={calculatorIcon} alt="calculator icon" />
                      <span>EMI Calcualtor</span>
                    </div>
                    <div
                      className="share"
                      onClick={() => {
                        setShareVehicle(!shareVehicle);
                      }}
                    >
                      <img src={shareIcon} alt="share icon" />

                      <div
                        className={
                          shareVehicle
                            ? matches
                              ? "mobile-share-vehicle-link"
                              : "share-vehicle-link"
                            : "hide-share-link-div"
                        }
                      >
                        <FacebookShareButton url={window.location}>
                          <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <WhatsappShareButton url={window.location}>
                          <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>

                        <EmailShareButton url={window.location}>
                          <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                        <LinkedinShareButton url={window.location}>
                          <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                        <TelegramShareButton url={window.location}>
                          <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>
                        <TwitterShareButton url={window.location}>
                          <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div className="vehicle-statistics-container">
                  <div className="row-one-detail">
                    <div className="stat">
                      <img src={speedometerIcon} alt="speedometer icon" />
                      <span>{getvehicledetails?.km_driven}</span>
                    </div>
                    <div className="stat">
                      {/* <img src={ownerIcon} alt="owner icon" /> */}
                      <FaUserTie size={30} color={"#050F56"} />
                      <span>{getvehicledetails?.no_of_owner}</span>
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
                        <span>{getvehicledetails?.no_of_tyre}</span>
                      </div>
                    )}
                    {checkCategory === "Tractors" && (
                      <div className="stat">
                        <img src={horsePowerIcon} alt="horse power icon" />
                        <span>{getvehicledetails?.horse_power} Bph</span>
                      </div>
                    )}
                    {checkCategory === "Buses" && (
                      <div className="stat">
                        <img src={seatIcon} alt="seat icon" />
                        <span>{getvehicledetails?.no_of_seats}</span>
                      </div>
                    )}
                    {checkCategory === "Construction Equipments" && (
                      <div className="stat">
                        <img src={tyreIcon} alt="tyre icon" />
                        <span>{getvehicledetails?.no_of_tyre}</span>
                      </div>
                    )}
                    <div className="stat racing">
                      <img src={racingIcon} alt="racing icon" />
                      <span>{getvehicledetails?.tyre_cond}</span>
                    </div>
                    <div className="stat manual">
                      <img
                        src={manualTransmissionIcon}
                        alt="manual transmission icon"
                      />
                      <span>
                        {getvehicledetails?.fuelType
                          ? getvehicledetails?.fuelType?.title
                          : "No Title Found"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div className="selling-price-container">
                  <p>
                    Selling Price
                    <span>
                      ???{rupee_format(getvehicledetails?.selling_price)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="selling-detail-container">
                <button
                  onClick={() => {
                    if (userToken) {
                      getSingleUserInfo();
                    } else {
                      setBuyerInput(!BuyerInput);
                    }
                  }}
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

                <div className="agree-terms">
                  <input type="checkbox" checked />
                  <span>
                    agree to the terms and conditions of&nbsp;
                    <strong>Gaddideals</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* mobile reps overview container */}
          <div className="mob-overview-container">
            <h3>Overview</h3>

            <div className="row-one">
              <div className="row-content">
                <h6>Number of kilometers</h6>
                <span>{getvehicledetails?.km_driven} Km</span>
              </div>
              <div className="row-content">
                <h6>Number of Owners</h6>
                <span>{getvehicledetails?.no_of_owner}</span>
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
                <span>{getvehicledetails?.city?.title}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-three">
              <div className="row-content">
                <h6>Insurance validity</h6>
                <span>{formatDate(getvehicledetails?.insurance)}</span>
              </div>
              <div className="row-content">
                <h6>Tyre condition</h6>
                <span>{getvehicledetails?.tyre_cond}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              <div className="row-content">
                <h6>Transmission</h6>
                <span>
                  {getvehicledetails?.fuelType
                    ? getvehicledetails?.fuelType?.title
                    : "No Title Found"}
                </span>
              </div>
              <div className="row-content">
                <h6>Vehicle number</h6>
                <span>{getvehicledetails?.reg_no}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              <div className="row-content">
                <h6>Tax validity up to</h6>
                <span>{formatDate(getvehicledetails?.tax_validity)}</span>
              </div>
              <div className="row-content">
                <h6>Number of tyres</h6>
                <span>{getvehicledetails?.no_of_tyre}</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="row-four">
              <div className="row-content">
                <h6>Fitness certificate</h6>
                <span>
                  {formatDate(getvehicledetails?.fitness_certificate)}
                </span>
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
                    <img
                      src={thumb ? `${imgurl}${thumb}` : `${imgPlaceHolder}`}
                      alt="truck thumbnail"
                    />
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
                <span>{getvehicledetails?.km_driven} Km</span>
              </div>
              <div className="row-content">
                <h6>Number of Owners</h6>
                <span>{getvehicledetails?.no_of_owner}</span>
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
                <span>{getvehicledetails?.city?.title}</span>
              </div>
              <div className="row-content">
                <h6>Insurance validity</h6>
                <span>{formatDate(getvehicledetails?.insurance)}</span>
              </div>
              <div className="row-content">
                <h6>Tyre condition</h6>
                <span>{getvehicledetails?.tyre_cond}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-three">
              <div className="row-content">
                <h6>Fuel Type</h6>
                <span>
                  {getvehicledetails?.fuelType
                    ? getvehicledetails?.fuelType?.title
                    : "No Title Found"}
                </span>
              </div>
              <div className="row-content">
                <h6>Vehicle number</h6>
                <span>{getvehicledetails?.reg_no}</span>
              </div>
              <div className="row-content">
                <h6>Tax validity up to</h6>
                <span>{formatDate(getvehicledetails?.tax_validity)}</span>
              </div>
            </div>

            <div className="line"></div>

            <div className="row-four">
              {checkCategory === "Trucks" && (
                <div className="row-content">
                  <h6>Number of tyres</h6>
                  <span>{getvehicledetails?.no_of_tyre}</span>
                </div>
              )}
              {checkCategory === "Tractors" && (
                <div className="row-content">
                  <h6>Horse Power</h6>
                  <span>{getvehicledetails?.horse_power} Bph</span>
                </div>
              )}
              {checkCategory === "Buses" && (
                <div className="row-content">
                  <h6>Number of seating</h6>
                  <span>{getvehicledetails?.no_of_seats}</span>
                </div>
              )}
              <div className="row-content">
                <h6>Fitness certificate</h6>
                <span>
                  {formatDate(getvehicledetails?.fitness_certificate)}
                </span>
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
              <Swiper
                spaceBetween={20}
                slidesPerView={matches ? 1.2 : 3}
                grabCursor={true}
                modules={[Autoplay]}
              >
                {similarVehicles.map((similar) => (
                  <SwiperSlide key={similar._id}>
                    <div className="similar-vehicle-card">
                      <div className="img-wrapper">
                        <a href={`/vehicledetails/${similar?._id}`}>
                          <img
                            src={imgurl + similar?.front_side_pic}
                            alt={similar?.category?.title}
                          />
                        </a>
                      </div>

                      <div className="vehicle-info">
                        <div className="title">
                          <h5>
                            {similar?.brand?.title} {similar?.model?.name}
                          </h5>
                          <div className="location">
                            <img src={locationIcon} alt="location icon" />
                            <span>{similar?.city?.title}</span>
                          </div>
                        </div>
                        <div className="price">
                          <p>
                            Selling Price&nbsp;
                            <span>???{rupee_format(similar?.selling_price)}</span>
                          </p>
                        </div>
                        {/* <div className="gallery">
                          <Swiper
                            className="swiper-latest"
                            spaceBetween={20}
                            slidesPerView={3}
                            modules={[Autoplay, Navigation]}
                          >
                            <SwiperSlide
                              className="swiper-slide-latest"
                              key={similar._id}
                            >
                              {similarImageArr.map((thumb, index) => (
                                <SwiperSlide key={index}>
                                  <div className="thumb">
                                    <img
                                      src={
                                        thumb
                                          ? `${imgurl}${thumb}`
                                          : `${imgPlaceHolder}`
                                      }
                                      alt="truck thumbnail"
                                    />
                                  </div>
                                </SwiperSlide>
                              ))}
                            </SwiperSlide>
                          </Swiper>
                        </div> */}
                        <button
                          onClick={() => {
                            setselectedSimilarVehicle(true);
                            setsimilarVehicleId(similar?._id);
                            setSeller(similar?.user);
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
              </Swiper>
            </div>
          </div>
        </section>
      )}
      {shareVehicle && (
        <div
          className="full-screen-overlay"
          onClick={() => {
            setShareVehicle(false);
          }}
        ></div>
      )}
      <Footer />
    </>
  );
};

export default VehicleDetails;
