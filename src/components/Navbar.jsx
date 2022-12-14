import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo.png";
import searchIcon from "../assets/search-icon.png";
import locationIcon from "../assets/location-home.png";
import downArrow from "../assets/down-arrow.png";
import userIcon from "../assets/user-icon.png";
import hamburgerIcon from "../assets/hamburger-menu.png";
import axios from "axios";
import Constant from "../constants";
import Modal from "react-awesome-modal";
import closingArrow from "../assets/closing_arrow.png";
import SinguplocationIcon from "../assets/SignUpLocation.png";
import SingupClosedEyeIcon from "../assets/closed_eye_icon.png";
import "../pages/MobileRespSignInPage.style.css";
import SingupEyeIcon from "../assets/eye_icon.png";
import { imgurl } from "../constants";

import upArrowIcon from "../assets/up-arrow.png";
import googleLogo from "../assets/google_logo.svg";
import facebookLogo from "../assets/facebook_logo.svg";
import gmailLogo from "../assets/gmail_logo.png";
import "./navbar.style.css";
// import { useTimer } from "react-timer-hook";

import Tooltip from "@material-ui/core/Tooltip";

import statecities from "../state-cities.json";

import { toast } from "react-toastify";
// import MobileRespHamburgerMune from "../pages/MobileRespHamburgerMune";

import "../pages/MobileRespHamburgerMenue.style.css";
// import 'react-toastify/dist/ReactToastify.css';

import mobFbIcon from "../assets/mob-fb-icon.png";

import mobGmailIcon from "../assets/mob-gmail-icon.png";

import mobMailIcon from "../assets/mob-mail-icon.png";

import { useRef } from "react";
import { google } from "@google-cloud/translate/build/protos/protos";
import ReactDOM from "react-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";
// import cookie from "react-cookies";
import { updateLanguage } from "./../Helpers/helper";
import { selectLocation } from "../store/location/location.selector";
import { setCurrentCity } from "../store/location/location.action";
import {
  setMobSignInValue,
  setSignUpValue,
} from "../store/signup/signup.action";
import {
  selectSignUpValue,
  selectMobSignInValue,
} from "../store/signup/signup.selector";
import loadGT from "../Helpers/gtt_loader";
import { log } from "util";

const queryString = require("query-string");

const Navbar = () => {
  const [EnableResendOtp, setEnableResendOtp] = useState(false);
  const displaySignIn = useSelector(selectSignUpValue);
  const mobDisplaySignIn = useSelector(selectMobSignInValue);

  const [timerVisible, settimerVisible] = useState(true);

  // const [seconds, setSeconds] = useState(59);
  // const [minutes, setMinutes] = useState(0);

  // var timer;
  // useEffect(() => {

  //   timer = setInterval(() => {
  //     setSeconds(seconds - 1);
  //     if (seconds === 0) {
  //       setEnableResendOtp(true);
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  const [counter, setCounter] = React.useState(59);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setEnableResendOtp(true);
      settimerVisible(false);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const location = queryString.parse(window.location.search);
  const [navIcons, setNavIcons] = useState([]);
  const [activeCategory, setActiveCategory] = useState(location.category);
  const [hamburgervisile, sethamburgervisile] = useState(false);
  const [locationDropDown, setlocationDropDown] = useState(false);
  const [MobGSignUp, setMobGSignUp] = useState(false);
  const [visible, setvisible] = useState(false);
  const [onclose, setonclose] = useState(false);
  const [onDisplayClose, setOnDisplayClose] = useState(true);

  const [loggedUserName, setLoggedUserName] = useState("");

  const [city, setcity] = useState("");

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  // function MyTimer({ expiryTimestamp }) {
  //   const {
  //     seconds,
  //     minutes,
  //     hours,
  //     days,
  //     isRunning,
  //     start,
  //     pause,
  //     resume,
  //     restart,
  //   } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const [searchValue, setSearchValue] = useState("");
  const [brandsArray, setBrandsArray] = useState([]);
  const [modelsArray, setModelsArray] = useState([]);
  const [searchSuggestion, setSearchSuggestion] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [cities, setCities] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [langSuggestion, setLangSuggestion] = useState(false);
  const [overlayLocation, setOverlayLocation] = useState(false);
  const [selectedLanguage, setselectedLanguage] = useState("");

  const [GoogleSignIn, setGoogleSignIn] = useState(false);
  const [FaceookSignIn, setFaceookSignIn] = useState(false);

  const [GSignUp, setGSignUp] = useState(false);

  // const googleTranslate = require("google-translate")("AIzaSyBokh77ocsW0ene-vrX80v1Wd5QUj64pSw");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.length > 0) {
      setSearchSuggestion(true);
    } else {
      setSearchSuggestion(false);
    }
  };

  const handleCityChange = (e) => {
    setCitySearch(e.target.value);
  };

  const handleLangFocus = () => {
    setLangSuggestion((prevSuggestion) => !prevSuggestion);
  };

  const fetchCities = async () => {
    // let citiesArr = [];
    // statecities.map((city) => {
    //   if (city) {
    //     citiesArr.push(city.City);
    //   }
    //   return citiesArr;
    // });
    // setCities(citiesArr);

    const response = await axios.get(
      Constant.getUrls.getAllCity + "?status=active&sort=true"
    );

    if (response.data) {
      setCities(response?.data?.getAllCities?.docs);
      // console.log(response.data.getAllCities.docs.title);
    }
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      console.log(lang);
      setselectedLanguage(lang);
    } else {
      setselectedLanguage("en");
    }
    const fetchIcons = async () => {
      const response = await axios.get(Constant.getUrls.getAllCategories);
      setNavIcons(response?.data?.category?.docs);
    };

    const fetchBrandsArray = async () => {
      const response = await axios.get(
        Constant.getUrls.getAllBrands + "?status=active"
      );
      setBrandsArray(response?.data?.brand?.docs);
    };

    const fetchModelsArray = async () => {
      const response = await axios.get(
        Constant.getUrls.getAllModels + "?status=active"
      );
      setModelsArray(response?.data?.model?.docs);
    };

    fetchIcons();
    fetchBrandsArray();
    fetchModelsArray();
    fetchCities();
    loadGT(() => {
      // setdropdown(f)
    });

    if (location.city) {
      dispatch(setCurrentCity(location.city));
    }
  }, []);

  const filterCities = cities.filter((city) =>
    city.title.toLowerCase().includes(citySearch.toLowerCase())
  );

  const filterCurentCities = statecities.filter((data) =>
    data.City.toLowerCase().includes(city.toLowerCase())
  );

  const filterBrandsArray = brandsArray.filter((brand) =>
    brand?.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filterModelsArray = modelsArray.filter((model) =>
    model?.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visibleSignUp, setvisibleSignUp] = useState(false);
  const [visibleOTP, setvisibleOTP] = useState(false);
  const [visibleMailSigIn, setvisibleMailSigIn] = useState(false);
  const [showMailSigIn, setshowMailSigIn] = useState(false);
  const [mob_no, setmob_no] = useState("");
  const [otp, setotp] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [eye, seteye] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("Token"));
  const [hidePassword, sethidePassword] = useState(false); //hiding password and confirm password for social token

  // const notify = () =>toast("Enter mobile number")  ;

  //desktop login section
  function clearAllStates() {
    setname("");
    setmob_no("");
    setemail("");
    setcity("");
    setpassword("");
    setconfirm_password("");
    setotp("");
  }

  //website sign in page
  function saveUser() {
    if (validateFeildsForSignIn()) {
      console.warn({ mob_no });
      let payload = { mob_no, hash: "ekxpmAB8m9v" };
      axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
        console.log("result", result);
        if (mob_no === "") {
          toast.error("enter mobile number");
        } else if (result?.data?.status === "failed") {
          toast.error(result?.data?.message);
        } else {
          if (result?.data?.status === "success") {
            toast.success(result?.data?.message);
            // setotp(result.data.otp);
            setmob_no(mob_no);
            setvisibleOTP(!visibleOTP);
            setvisible(false);

            setCounter(59);
          }
        }
      });
    }
  }
  //website  otp page
  function savePhoneOtp() {
    if (validateFeildsForOtp()) {
      console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
        console.log(res);

        // if (res.data.status == "failed") {
        if (res.data.status === "failed") {
          toast.error("incorrect otp");
        } else if (res.data.status === "Success") {
          toast.success(res.data.message);
          localStorage.setItem("Token", res?.data?.user?.accessToken);
          window.location.href = "/loggeduser";
          setvisibleOTP(false);
        }
      });
    }
  }

  const ValidationEmailAndPassword = () => {
    let validateEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!validateEmail.test(email)) {
      toast.error("please enter valid email id");
      return false;
    }
    if (password === "") {
      toast.error("please enter password");
      return false;
    }
    return true;
  };

  //wesite sign in with mail and password
  function saveMailPassword() {
    if (ValidationEmailAndPassword()) {
      console.log("email verified");
      console.warn({ email, password });
      let payload = { email, password };
      axios.post(Constant.postUrls.postAllSignins, payload).then((res) => {
        console.log("hey" + res);

        // if (res.data.status == "failed") {
        if (res?.data?.status === "failed") {
          toast.error("incorrect password");
        } else if (res?.data?.status === "Success") {
          toast.success(res?.data?.message);
          // setvisibleOTP(false);
          localStorage.setItem("Token", res?.data?.user?.accessToken);
          window.location.href = "/loggeduser";
          setvisibleMailSigIn(!visibleMailSigIn);
        }
      });
    }
  }
  //wesite sign in with google
  function setGSignIp(email, social_token) {
    console.log("otp verified");
    console.warn({
      email,
      type: "social",
      social_token,
    });
    let payload = {
      email,
      social_token,
      type: "social",
    };
    axios.post(Constant.postUrls.postAllSignins, payload).then((res) => {
      console.log("res", res);

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        localStorage.setItem("Token", res?.data?.user?.accessToken);
        window.location.href = "/loggeduser";
      } else if (res?.data?.status === "failed") {
        toast.error(res?.data?.message);
        console.log(res?.data?.message);
      }
    });
  }
  //wesite sign in with fb
  function setFBSignIp() {
    console.log("otp verified");
    console.warn({
      name,
      email,
      mob_no,
      city,
      password,
      confirm_password,
      type: "social",
      social_token: "fb",
    });
    let payload = {
      name,
      email,
      mob_no,
      city,
      password,
      confirm_password,
      type: "social",
      social_token: "fb",
    };
    axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
      console.log("res", res);
      if (name === "" || email === "" || mob_no === "") {
        toast.error("required feilds are empty");
      } else if (password !== confirm_password) {
        toast.error("password and confirm password don't match");
      } else {
        if (res.data.status === "success") {
          toast.success(res?.data?.message);
          // setvisibleSignUp(false);
          setFaceookSignIn(false);
          setmob_no(res?.data?.mob_no);
          // setotp(res.data.otp);
          savePhoneOtp();
          setvisibleOTP(true);
        } else if (res?.data?.status === "failed") {
          toast.error(res?.data?.message);
        }
      }
    });
  }

  //website google sign up page
  function websiteGoogleSignup() {
    // toast.success("working");
    if (validateFeilds()) {
      // toast.success("working");
      console.log("otp verified");
      console.warn({
        name,
        email,
        mob_no,
        city,
        password,
        confirm_password,
        type: "social",
        social_token,
      });
      let payload = {
        name,
        email,
        mob_no,
        city,
        password: "",
        confirm_password: "",
        type: "social",
        social_token,
      };
      axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
        console.log("res", res);
        // toast.success("working");
        if (res?.data?.status === "success") {
          // toast.success(res.data.message);
          setmob_no(mob_no);
          setGSignUp(false);
          saveUser();
          setvisibleOTP(true);
          setCounter(59);
        } else if (res?.data?.status === "failed") {
          toast.error(res?.data?.message);
        }
      });
    }
  }

  //website sign up page
  function setSignup() {
    if (validateFeilds()) {
      console.log("otp verified");
      console.warn({
        name,
        email,
        mob_no,
        city,
        password,
        confirm_password,
      });
      let payload = {
        name,
        email,
        mob_no,
        city,
        password,
        confirm_password,
        type: "",
        social_token: "",
      };
      axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
        console.log("res", res);

        if (password !== confirm_password) {
          toast.error("password and confirm password doesn't match");
        } else {
          if (res?.data?.status === "success") {
            toast.success(res?.data?.message);
            // setmob_no(res.data.mob_no);
            console.log(res);
            setmob_no(mob_no);
            setvisibleSignUp(false);
            setvisibleOTP(true);
            setCounter(59);
          } else if (res?.data?.status === "failed") {
            toast.error(res?.data?.message);
          }
        }
      });
    }
  }
  //wesite resed otp
  function resendotp() {
    // console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.potsALLresendotps, payload).then((result) => {
      console.log("resend result" + result);
      if (mob_no === "") {
        toast.error("enter moile number");
      } else if (result?.data?.status === "failed") {
        toast.error(result?.data?.message);
      } else {
        if (result?.data?.status === "success") {
          setEnableResendOtp(false);
          toast.success(result?.data?.message);
          // setotp(result.data.otp);
          setCounter(59);
          settimerVisible(true);
        }
      }
    });
  }

  //moile login section

  const [showOtp, setshowOtp] = useState(false);
  const [showSignIn, setshowSignIn] = useState(false);
  const [loginsuccess, setloginsuccess] = useState(false);
  const [LoggedUserHamburgerMenue, setLoggedUserHamburgerMenue] =
    useState(false);
  const [sellBuyContainerOnScroll, setsellBuyContainerOnScroll] =
    useState(true);
  const [social_token, setsocial_token] = useState("");
  const [type, setType] = useState("");

  //responsive otp modal
  function saveMobileUser() {
    if (validateFeildsForSignIn()) {
      console.warn({ mob_no });
      let payload = { mob_no, hash: "ekxpmAB8m9v" };
      axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
        console.log("result", result);
        if (mob_no === "") {
          // notify();
          toast.error("enter moile number");
        } else if (result?.data?.status === "failed") {
          toast.error(result?.data?.message);
        } else {
          if (result?.data?.status === "success") {
            toast.success(result?.data?.message);
            // setotp(result.data.otp);
            setshowOtp(!showOtp);
            setshowsignup(!showsignup);
            setCounter(59);
          }
        }
      });
    }
  }

  //responsive sign in page
  function setMobileSignup() {
    if (validateFeilds()) {
      console.log("otp verified");
      console.warn({
        name,
        email,
        mob_no,
        city,
        password,
        confirm_password,
      });
      let payload = {
        name,
        email,
        mob_no,
        city,
        password,
        confirm_password,
      };
      axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
        console.log("res", res);
        if (MobGSignUp) {
          if (res?.data?.status === "success") {
            toast.success(res?.data?.message);

            setmob_no(res?.data?.mob_no);
            setshowSignIn(!showSignIn);
            saveMoilePhoneOtp();
            setshowOtp(!showOtp);
          } else if (res?.data?.status === "failed") {
            toast.error(res?.data?.message);
          }
        } else {
          if (password !== confirm_password) {
            toast.error("password and confirm password don't match");
          } else {
            if (res?.data?.status === "success") {
              toast.success(res?.data?.message);

              setmob_no(res?.data?.mob_no);
              setshowSignIn(!showSignIn);
              saveMoilePhoneOtp();
              setshowOtp(!showOtp);
            } else if (res?.data?.status === "failed") {
              toast.error(res?.data?.message);
            }
          }
        }
      });
    }
  }

  //responsive otp veriication
  function saveMoilePhoneOtp() {
    console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      console.log(res);

      // if (res.data.status == "failed") {
      if (res?.data?.status === "failed") {
        toast.error("incorrect otp");
      } else if (res?.data?.status === "Success") {
        setloginsuccess(!loginsuccess);
        toast.success(res?.data?.message);
        // setvisibleOTP(false);
        localStorage.setItem("Token", res?.data?.user?.accessToken);
        window.location.href = "/loggeduser";
        setshowOtp(!showOtp);
      }
    });
  }
  //responsive hamburger menue checks if user is logged in or not
  function Openmenu() {
    if (localStorage.Token) {
      setLoggedUserHamburgerMenue(!LoggedUserHamburgerMenue);
    } else {
      sethamburgervisile(!hamburgervisile);
    }
  }

  const [showsignup, setshowsignup] = useState(false);

  function closeModal() {
    setshowsignup(!showsignup);
  }
  function closeOtp() {
    setshowOtp(!showOtp);
  }
  function closeSignIn() {
    setshowSignIn(!showSignIn);
  }

  //on scroll hide subnavigation bar
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current <= currentScrollY && goingUp) {
        setsellBuyContainerOnScroll(!sellBuyContainerOnScroll);
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setsellBuyContainerOnScroll(!sellBuyContainerOnScroll);
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      // console.log(goingUp, currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp, sellBuyContainerOnScroll]);

  //log out function
  function logoutAccount() {
    localStorage.clear();
    window.location.href = "/";
  }

  // for google sign-in
  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId:
        "863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com",
      plugin_name: "sign in",
      scope: "",
    });
  });

  //website sign up with google
  function responseGoogleSignup(response) {
    console.log("google response", response);
    setsocial_token(response?.accessToken);
    setemail(response?.profileObj?.email);
    setname(response?.profileObj?.name);
    console.log(response?.profileObj?.name);

    if (response) {
      //function for google sign up wbesite

      sethidePassword(true);
      setGSignUp(true);
      setvisibleSignUp(false);
    }
  }

  //moile sign up with google
  function MobresponseGoogleSignup(response) {
    console.log("google response", response);
    setsocial_token(response?.accessToken);
    setemail(response?.profileObj?.email);
    setname(response?.profileObj?.name);
    console.log(response?.profileObj?.name);

    if (response?.accessToken) {
      //function for google sign up wbesite
      setshowSignIn(false);
      setMobGSignUp(true);

      console.log("status" + MobGSignUp);
    }
  }

  //website sign in with google response
  function responseGoogle(response) {
    console.log("google response", response);
    setsocial_token(response?.accessToken);
    // setname(response?.profileObj?.name);
    setemail(response?.profileObj?.email);

    // sethidePassword(true);
    if (response) {
      setGSignIp(response?.profileObj?.email, response?.accessToken);
    }
  }

  function responseFailedGoogle(response) {
    console.log("google response", response);
    // setsocial_token(response?.accessToken);
    // // setname(response?.profileObj?.name);
    // setemail(response?.profileObj?.email);

    // // sethidePassword(true);
    // if (response) {
    //   setGSignIp(response?.profileObj?.email, response?.accessToken);
    // }
  }
  //responsive sign in with google response
  function mobResponseGoogle(response) {
    console.log("google response", response);
    setsocial_token(response?.tokenId);
    setname(response?.profileObj?.name);
    setemail(response?.profileObj?.email);
    sethidePassword(true);

    setshowsignup(!showsignup);
    setshowSignIn(!showSignIn);
  }

  //wesite faceook sign up
  const responseFacebookSignup = (response) => {
    console.log(response);
    console.log("hey " + response?.name);
    setsocial_token(response?.accessToken);
    setname(response?.name);
    setemail(response?.email);
    sethidePassword(true);
    // if (response) {
    //function for facebook sign up wbesite
    // toast.error("working");
    // }
    if (response) {
      //function for google sign up wbesite
      sethidePassword(true);
      setGSignUp(true);
      setvisibleSignUp(false);
    }
  };

  //mobile faceook sign up
  const MobresponseFacebookSignup = (response) => {
    console.log(response);
    console.log("hey " + response?.name);
    setsocial_token(response?.accessToken);
    setname(response?.name);
    setemail(response?.email);
    sethidePassword(true);

    if (response?.accessToken) {
      //function for google sign up wbesite
      setshowSignIn(false);
      setMobGSignUp(true);
    }
  };

  //website sign in with fb response
  const responseFacebook = (response) => {
    console.log(response);
    console.log("hey " + response?.name);
    setsocial_token(response?.accessToken);
    setname(response?.name);
    setemail(response?.email);
    sethidePassword(true);
    // if (response) {
    //   setvisible(false);
    //   // setvisibleSignUp(!visibleSignUp);
    //   setFaceookSignIn(!FaceookSignIn);
    // }
    if (response) {
      setGSignIp(response?.email, response?.accessToken);
    }
  };

  //responsive sign in with fb response
  const mobResponseFacebook = (response) => {
    console.log(response);
    console.log("hey " + response?.name);
    setsocial_token(response?.accessToken);
    setname(response?.name);
    setemail(response?.email);
    sethidePassword(true);
    setshowsignup(!showsignup);
    setshowSignIn(!showSignIn);
  };

  //responsive sign in with email and password page
  function saveMobMailPassword() {
    console.log("email verified");
    console.warn({ email, password });
    let payload = { email, password };
    axios.post(Constant.postUrls.postAllSignins, payload).then((res) => {
      console.log(res);

      // if (res.data.status == "failed") {
      if (res?.data?.status === "failed") {
        toast.error("incorrect password");
      } else if (res?.data?.status === "Success") {
        toast.success("Sign in successfully");
        // setvisibleOTP(false);
        // setvisibleMailSigIn(!visibleMailSigIn);
        localStorage.setItem("Token", res?.data?.user?.accessToken);
        window.location.href = "/loggeduser";
        setshowMailSigIn(!showMailSigIn);
      }
    });
  }

  //validations
  //for otp page
  const validateFeildsForOtp = () => {
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    }
    if (otp === "") {
      toast.error("please enter otp");
      return false;
    }

    return true;
  };
  //for sign in page
  const validateFeildsForSignIn = () => {
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    }

    return true;
  };
  //for signup page
  const validateFeilds = () => {
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
    if (!validateEmail.test(email)) {
      toast.error("please enter valid email id");
      return false;
    }
    if (!GSignUp) {
      if (password === "") {
        toast.error("please enter password");
        return false;
      } else if (password.length > 10) {
        toast.error("please enter password of 10 characters or less");
        return false;
      } else if (password.length < 4) {
        toast.error("please enter password of 4 characters or more");
        return false;
      }
      if (!cityExists) {
        toast.error("Please select a city");
        return false;
      }
    }
    return true;
  };

  async function userName() {
    // var inValid = /\s/;
    await axios
      .get(Constant.getUrls.getUser, {
        headers: {
          Authorization: ` Bearer ${token} `,
        },
      })
      .then((res) => {
        setLoggedUserName(res?.data?.user?.name);

        // console.log("hey" + name.includes(" "));
        // if (name.includes(" ")) {
        //   const [first, last] = name.split(" ");
        //   console.log(first);

        //   setLoggedUserName(first);
        // } else {
        //   console.log("first" + name);
        //   setLoggedUserName(name);
        // }
      });
  }

  useEffect(() => {
    if (token) {
      userName();
    }
  }, []);

  return (
    <>
      {/* signup with google in mobile */}

      <div className="header">
        {/* {sellBuyContainerOnScroll && ( */}
        <div
          className="sell-buy-container-moile"
          onscroll={() => {
            setsellBuyContainerOnScroll(false);
          }}
        >
          <Link to="/vehiclelistings">
            <button>Buy used commercial vehicle</button>
          </Link>
          <Link to="/sellerhome">
            <button className="sell-btn">Sell used commercial vehicle</button>
          </Link>
        </div>
        {/* )} */}
        <div
          className="sell-buy-container-desktop"
          onscroll={() => {
            setsellBuyContainerOnScroll(false);
          }}
        >
          <Link to="/vehiclelistings">
            <button>Buy used commercial vehicle</button>
          </Link>
          <Link to="/sellerhome">
            <button className="sell-btn">Sell used commercial vehicle</button>
          </Link>
        </div>

        <nav className="navbar navbar-expand-lg nav-container">
          <div className="container-fluid gd_container navar_div">
            <div className="logo">
              <a href="/" className="navbar-brand">
                <img src={logoIcon} alt="logo" />
              </a>
            </div>

            <div className="brand-categories">
              {navIcons.slice(0, 4).map((catgeoryIcon, index) => (
                <Tooltip title={catgeoryIcon?.title} placement="bottom" arrow>
                  <a
                    href={"/vehiclelistings?category=" + catgeoryIcon._id}
                    className={`${
                      activeCategory === catgeoryIcon._id
                        ? "brand-category active"
                        : "brand-category"
                    }`}
                    onClick={() => {
                      setActiveCategory(index);
                      // navigate("/vehiclelistings?category=" + catgeoryIcon._id);
                    }}
                    key={catgeoryIcon._id}
                  >
                    <img
                      src={`${imgurl}${catgeoryIcon.icon}`}
                      alt={catgeoryIcon.title}
                    />
                  </a>
                </Tooltip>
              ))}
            </div>

            <div onClick={Openmenu} className="hamburger-menu ">
              <img src={hamburgerIcon} alt="mobile menu" />
            </div>

            <div className="search-container">
              <img src={searchIcon} alt="search icon" className="search-icon" />
              <input
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />

              {searchSuggestion && (
                <div className="search-nav-suggestion">
                  {filterBrandsArray.map((brand) => (
                    <a
                      key={brand._id}
                      href={
                        location.category
                          ? `/vehiclelistings?brand[]=` +
                            brand?._id +
                            `&category=${location.category}`
                          : `/vehiclelistings?brand[]=` + brand?._id
                      }
                      data-bs-toggle="tooltip"
                      data-bs-title="Default tooltip"
                    >
                      <p
                        onClick={() => {
                          setSearchValue(brand.title);
                          setSearchSuggestion(!searchSuggestion);
                        }}
                      >
                        {brand.title}
                      </p>
                    </a>
                  ))}
                  {filterModelsArray.map((model) => (
                    <a
                      key={model._id}
                      href={
                        location.category
                          ? `/vehiclelistings?model[]=` +
                            model?._id +
                            `&category=${location.category}`
                          : `/vehiclelistings?model[]=` + model?._id
                      }
                      data-bs-toggle="tooltip"
                      data-bs-title="Default tooltip"
                    >
                      <p
                        onClick={() => {
                          setSearchValue(model.title);
                          setSearchSuggestion(!searchSuggestion);
                        }}
                      >
                        {model.name}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="location-container sm-device">
            <div
              className="location"
              onClick={() => setLangDropdown(!langDropdown)}
            >
              <img src={locationIcon} alt="location" />
              <span>
                {locationCity !== undefined ? locationCity : "Location"}
              </span>
              <div className="arrow-icon">
                <img src={downArrow} alt="down arrow" />
              </div>
            </div>

            {langDropdown && (
              <div className="lang-dropdown">
                <div className="lang-input">
                  <input
                    type="text"
                    placeholder="Enter City here..."
                    onChange={handleCityChange}
                    onFocus={handleLangFocus}
                    value={citySearch}
                  />

                  {langSuggestion && (
                    <div className="lang-suggetion">
                      {filterCities.slice(0, 5).map((city, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setCitySearch(city?.title);
                            dispatch(setCurrentCity(city?.title));
                            setLangDropdown(false);
                            // localStorage.setItem("cityName", city?.title);
                            if (location.city) {
                              location.city = city?._id;
                              let prevUrl = queryString.stringify(location);
                              window.location.href =
                                window.location.pathname + "?" + prevUrl;
                            }
                          }}
                        >
                          {city.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div> */}

            <div className="languages-container">
              <div className="language">
                <span className="SelectedLanguageDecoration notranslate">
                  {selectedLanguage === "en" ? "English" : "??????????????????"}{" "}
                </span>
              </div>

              <div className="language-arrow-icon">
                <img
                  onClick={() => {
                    setdropdown(!dropdown);
                  }}
                  src={dropdown ? upArrowIcon : downArrow}
                  alt="down arrow"
                />
              </div>
              {dropdown && (
                <div className="drop-down">
                  <p
                    onClick={() => {
                      // window.location.reload();
                      // updateLanguage("en");
                      setselectedLanguage("en");
                      setdropdown(!dropdown);
                      var a = document.querySelector(
                        "#google_translate_element select"
                      );
                      a.value = "en";
                      a.dispatchEvent(new Event("change"));
                      localStorage.setItem("lang", "en");
                      // return console.log(a.value)
                      // window.location.reload();
                      location.lang = "en";
                      let prevUrl = queryString.stringify(location);
                      window.location.href =
                        window.location.pathname + "?" + prevUrl;
                    }}
                    className="language-1 notranslate"
                  >
                    English
                  </p>
                  <p
                    onClick={() => {
                      setselectedLanguage("hi");
                      // updateLanguage("hi");
                      setdropdown(!dropdown);
                      var a = document.querySelector(
                        "#google_translate_element select"
                      );
                      a.value = "hi";
                      a.dispatchEvent(new Event("change"));
                      localStorage.setItem("lang", "hi");
                      // window.location.reload();
                      // return console.log(a.value);

                      location.lang = "hi";
                      let prevUrl = queryString.stringify(location);
                      window.location.href =
                        window.location.pathname + "?" + prevUrl;
                    }}
                    className="language-2 notranslate"
                  >
                    ??????????????????
                  </p>
                </div>
              )}
            </div>

            {token ? (
              <Link to="/loggeduser">
                <div className="user">
                  <img src={userIcon} alt="user icon" />
                  <span>
                    Hello{" "}
                    {loggedUserName.substring(0, loggedUserName.indexOf(" "))}
                  </span>
                </div>
              </Link>
            ) : (
              <div
                onClick={() => {
                  setvisible(!visible);
                  setonclose(!onclose);
                }}
                className="user"
              >
                <img src={userIcon} alt="user icon" />
              </div>
            )}
          </div>
          {/* open hamurger menue */}
          {hamburgervisile && (
            <div className="mob-menue-container">
              <div className="mob-top-div">
                <div className="mob-languages-container">
                  <div className="language">
                    <span className="SelectedLanguageDecoration notranslate">
                      {selectedLanguage === "en" ? "English" : "??????????????????"}{" "}
                    </span>
                  </div>
                  <div className="language-arrow-icon">
                    <img
                      onClick={() => {
                        setdropdown(!dropdown);
                      }}
                      src={dropdown ? upArrowIcon : downArrow}
                      alt="down arrow"
                    />
                  </div>
                  {dropdown && (
                    <div className="drop-down">
                      <p
                        onClick={() => {
                          // window.location.reload();
                          // updateLanguage("en");
                          setselectedLanguage("en");
                          setdropdown(!dropdown);
                          var a = document.querySelector(
                            "#google_translate_element select"
                          );
                          a.value = "en";
                          a.dispatchEvent(new Event("change"));
                          localStorage.setItem("lang", "en");
                          // return console.log(a.value)
                          // window.location.reload();
                          location.lang = "en";
                          let prevUrl = queryString.stringify(location);
                          window.location.href =
                            window.location.pathname + "?" + prevUrl;
                        }}
                        className="language-1 notranslate"
                      >
                        English
                      </p>
                      <p
                        onClick={() => {
                          setselectedLanguage("hi");
                          // updateLanguage("hi");
                          setdropdown(!dropdown);
                          var a = document.querySelector(
                            "#google_translate_element select"
                          );
                          a.value = "hi";
                          a.dispatchEvent(new Event("change"));
                          localStorage.setItem("lang", "hi");
                          // window.location.reload();
                          // return console.log(a.value);

                          location.lang = "hi";
                          let prevUrl = queryString.stringify(location);
                          window.location.href =
                            window.location.pathname + "?" + prevUrl;
                        }}
                        className="language-2 notranslate"
                      >
                        ??????????????????
                      </p>
                    </div>
                  )}
                </div>
                {/* <input placeholder="Location" className="mob-location-input" />
            <img className="mob-arrow-img" src={downArrow} alt="down arrow" /> */}
                {/* <div className="location-container">
              <div
                className="location"
                onClick={() => setLangDropdown(!langDropdown)}
              >
                <div className="location-and-icon">
                  <img src={locationIcon} alt="location" />
                  <span>
                    {locationCity !== undefined ? locationCity : "Location"}
                  </span>
                </div>
                <div className="arrow-icon">
                  <img src={downArrow} alt="down arrow" />
                </div>
              </div>

              {langDropdown && (
                <div className="lang-dropdown">
                  <div className="lang-input">
                    <input
                      type="text"
                      placeholder="Enter City here..."
                      onChange={handleCityChange}
                      onFocus={handleLangFocus}
                      value={citySearch}
                    />

                    {langSuggestion && (
                      <div className="lang-suggetion">
                        {filterCities.slice(0, 7).map((city, index) => (
                          <p
                            key={index}
                            onClick={() => {
                              setCitySearch(city);
                              dispatch(setCurrentCity(city));
                              setLangDropdown(false);
                              if (location.city) {
                                location.city = city;
                                let prevUrl = queryString.stringify(location);
                                window.location.href =
                                  window.location.pathname + "?" + prevUrl;
                              }
                            }}
                          >
                            {city}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div> */}
              </div>

              <div className="mob-middle-div">
                <button
                  className="mob-login-button"
                  onClick={() => {
                    setshowsignup(!showsignup);
                    sethamburgervisile(!hamburgervisile);
                  }}
                >
                  {" "}
                  Login
                </button>
                <button
                  className="mob-register-button"
                  onClick={() => {
                    setshowSignIn(!showSignIn);
                    sethamburgervisile(!hamburgervisile);
                  }}
                >
                  Register
                </button>
              </div>
              <div className="mob-lower-div">
                <Link to="/AboutUs">
                  <p className="mob-lower-div-text">About Us</p>
                </Link>
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/UserFaq";
                  }}
                >
                  FAQ
                </p>
                <Link to="/PrivacyPolicy">
                  <p className="mob-lower-div-text">Privacy Policy</p>
                </Link>
                <Link to="/termsandconditions">
                  <p className="mob-lower-div-text">Terms and Condition</p>
                </Link>
                <p className="mob-lower-div-text mob-contact-us">Contact Us</p>
              </div>
            </div>
          )}

          {LoggedUserHamburgerMenue && (
            <div className="mob-menue-container">
              <div className="mob-top-div">
                <p className="Logged-user-name">
                  Hello{" "}
                  {loggedUserName.substring(0, loggedUserName.indexOf(" "))}
                </p>
                {/* <input placeholder="Location" className="mob-location-input" />
            <img className="mob-arrow-img" src={downArrow} alt="down arrow" /> */}
                <div className="mob-languages-container">
                  <div className="language">
                    <span className="SelectedLanguageDecoration notranslate">
                      {selectedLanguage === "en" ? "English" : "??????????????????"}{" "}
                    </span>
                  </div>
                  <div className="language-arrow-icon">
                    <img
                      onClick={() => {
                        setdropdown(!dropdown);
                      }}
                      src={dropdown ? upArrowIcon : downArrow}
                      alt="down arrow"
                    />
                  </div>
                  {dropdown && (
                    <div className="drop-down">
                      <p
                        onClick={() => {
                          // window.location.reload();
                          // updateLanguage("en");
                          setselectedLanguage("en");
                          setdropdown(!dropdown);
                          var a = document.querySelector(
                            "#google_translate_element select"
                          );
                          a.value = "en";
                          a.dispatchEvent(new Event("change"));
                          localStorage.setItem("lang", "en");
                          // return console.log(a.value)
                          // window.location.reload();
                          location.lang = "en";
                          let prevUrl = queryString.stringify(location);
                          window.location.href =
                            window.location.pathname + "?" + prevUrl;
                        }}
                        className="language-1 notranslate"
                      >
                        English
                      </p>
                      <p
                        onClick={() => {
                          setselectedLanguage("hi");
                          // updateLanguage("hi");
                          setdropdown(!dropdown);
                          var a = document.querySelector(
                            "#google_translate_element select"
                          );
                          a.value = "hi";
                          a.dispatchEvent(new Event("change"));
                          localStorage.setItem("lang", "hi");
                          // window.location.reload();
                          // return console.log(a.value);

                          location.lang = "hi";
                          let prevUrl = queryString.stringify(location);
                          window.location.href =
                            window.location.pathname + "?" + prevUrl;
                        }}
                        className="language-2 notranslate"
                      >
                        ??????????????????
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mob-LoggedUser-middle-div">
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/loggeduser";
                  }}
                >
                  My Profile
                </p>
                {/* <Link to="/UserVehicles"> */}
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/UserVehicles";
                  }}
                >
                  My Vehicle
                </p>
                {/* </Link> */}
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/UserOrder";
                  }}
                >
                  My Enquiries
                </p>
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/myvehicleenq";
                  }}
                >
                  My Vehicle Enquiries
                </p>
                <p className="mob-lower-div-text">My Order</p>
              </div>
              <div className="mob-lower-div">
                <Link to="/AboutUs">
                  <p className="mob-lower-div-text">About Us</p>
                </Link>
                <p
                  className="mob-lower-div-text"
                  onClick={() => {
                    window.location.href = "/UserFaq";
                  }}
                >
                  FAQ
                </p>
                <Link to="/PrivacyPolicy">
                  <p className="mob-lower-div-text">Privacy Policy</p>
                </Link>
                <Link to="/termsandconditions">
                  <p className="mob-lower-div-text">Terms and Condition</p>
                </Link>
                <p className="mob-lower-div-text mob-contact-us">Contact Us</p>
                <p
                  className="mob-lower-div-text mob-contact-us"
                  onClick={logoutAccount}
                >
                  Sign out
                </p>
              </div>
            </div>
          )}

          {MobGSignUp && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={MobGSignUp}
                onClickAway={() => {
                  setMobGSignUp(!MobGSignUp);
                  clearAllStates();
                }}
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={() => {
                      setMobGSignUp(!MobGSignUp);
                      clearAllStates();
                    }}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-signin-text">
                    Sign up to
                    <span className="text-color-blue"> Gaddideals </span>
                  </p>

                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="Name "
                  />
                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setmob_no(e.target.value);
                    }}
                    value={mob_no}
                    maxLength={10}
                    placeholder="Mobile number "
                  />
                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email "
                  />
                  <div className="mob-resp-location-div">
                    <input
                      className="mob-resp-location-input"
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                      value={city}
                      type="text"
                      placeholder="Location "
                      onFocus={() => {
                        setlocationDropDown(!locationDropDown);
                      }}
                    />
                    <img src={locationIcon} alt=""></img>
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
                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      setMobileSignup();
                    }}
                  >
                    SIGN UP
                  </button>
                  <p
                    className="mob-resp-already-a-member-text"
                    onClick={() => {
                      setshowSignIn(!showSignIn); //closing signup page
                      setshowsignup(!showsignup); //opening signin page
                    }}
                  >
                    <span className="text-color-blue">
                      Already a user? SIGN IN
                    </span>
                  </p>
                </div>
              </Modal>
            </div>
          )}
          {/* signup with google */}
          {GSignUp && (
            <div className="signup-main_parent">
              <div
                className="signup-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                  setTimeout(() => {
                    setvisibleSignUp(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",

                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="signup-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                    setTimeout(() => {
                      setGSignUp(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="signup-sign-in-title">
                  Sign up to
                  <span className="signup-text-color-blue"> Gaddideals </span>
                </p>
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  type="text"
                  className="signup-phone-no-input"
                  placeholder="Name "
                />
                <input
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                  maxLength={10}
                  className="signup-phone-no-input"
                  placeholder="Mobile number "
                  // type="number"
                />
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  className="signup-phone-no-input"
                  placeholder="Email "
                />
                <div className="SinguplocationIcon">
                  <input
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    value={city}
                    type="text"
                    className="signup-location-input"
                    placeholder="Location "
                  />
                  <img
                    className="Singup-location-Icon"
                    src={SinguplocationIcon}
                    alt=""
                  ></img>
                </div>
                {hidePassword ? null : (
                  <>
                    <input
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      className="signup-phone-no-input"
                      placeholder="Password "
                    />
                    <p className="password-guide">
                      Password length must be less than 10 characters
                    </p>
                    <div className="SingupEyeIconDiv">
                      <input
                        onChange={(e) => {
                          setconfirm_password(e.target.value);
                        }}
                        value={confirm_password}
                        type={eye ? "text" : "password"}
                        className="signup-location-input"
                        placeholder="Confirm Password"
                      />
                      <img
                        alt=""
                        onClick={() => {
                          seteye(!eye);
                        }}
                        className="Singup-eye-Icon"
                        src={eye ? SingupEyeIcon : SingupClosedEyeIcon}
                      ></img>
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    websiteGoogleSignup();
                    // toast.success("working");
                  }}
                  className="signup-sign-in-button"
                >
                  SIGN UP
                </button>
                <p
                  onClick={() => {
                    setvisible(true);
                    setGSignUp(false);
                  }}
                  className="signup-create-account"
                >
                  Already a user? SIGN IN
                </p>
              </div>
            </div>
          )}
          {/* sign in with google */}
          {GoogleSignIn && (
            <div className="signup-main_parent">
              <div
                className="signup-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                  setTimeout(() => {
                    setGoogleSignIn(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",

                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="signup-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                    setTimeout(() => {
                      setGoogleSignIn(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="signup-sign-in-title">
                  Sign up to
                  <span className="signup-text-color-blue"> Gaddideals </span>
                </p>
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  type="text"
                  className="signup-phone-no-input"
                  placeholder="Name "
                />
                <input
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                  maxLength={10}
                  className="signup-phone-no-input"
                  placeholder="Mobile number "
                  // type="number"
                />
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  className="signup-phone-no-input"
                  placeholder="Email "
                />
                <div className="SinguplocationIcon">
                  <input
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    value={city}
                    type="text"
                    className="signup-location-input"
                    placeholder="Location "
                  />
                  <img
                    className="Singup-location-Icon"
                    src={SinguplocationIcon}
                    alt=""
                  ></img>
                </div>
                {hidePassword ? null : (
                  <>
                    <input
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      className="signup-phone-no-input"
                      placeholder="Password "
                    />

                    <div className="SingupEyeIconDiv">
                      <input
                        onChange={(e) => {
                          setconfirm_password(e.target.value);
                        }}
                        value={confirm_password}
                        type={eye ? "text" : "password"}
                        className="signup-location-input"
                        placeholder="Confirm Password"
                      />
                      <img
                        alt=""
                        onClick={() => {
                          seteye(!eye);
                        }}
                        className="Singup-eye-Icon"
                        src={eye ? SingupEyeIcon : SingupClosedEyeIcon}
                      ></img>
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    setGSignIp();
                  }}
                  className="signup-sign-in-button"
                >
                  SIGN UP
                </button>
                <p
                  onClick={() => {
                    setvisible(true);
                    setvisibleSignUp(false);
                  }}
                  className="signup-create-account"
                >
                  Already a user? SIGN IN
                </p>
              </div>
            </div>
          )}
          {FaceookSignIn && (
            <div className="signup-main_parent">
              <div
                className="signup-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                  setTimeout(() => {
                    setGoogleSignIn(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",

                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="signup-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                    setTimeout(() => {
                      setGoogleSignIn(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="signup-sign-in-title">
                  Sign up to
                  <span className="signup-text-color-blue"> Gaddidealss </span>
                </p>
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  type="text"
                  className="signup-phone-no-input"
                  placeholder="Name "
                />
                <input
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                  maxLength={10}
                  className="signup-phone-no-input"
                  placeholder="Mobile number "
                  // type="number"
                />
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  className="signup-phone-no-input"
                  placeholder="Email "
                />
                <div className="SinguplocationIcon">
                  <input
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    value={city}
                    type="text"
                    className="signup-location-input"
                    placeholder="Location "
                  />
                  <img
                    className="Singup-location-Icon"
                    src={SinguplocationIcon}
                    alt=""
                  ></img>
                </div>
                {hidePassword ? null : (
                  <>
                    <input
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      className="signup-phone-no-input"
                      placeholder="Password "
                    />

                    <div className="SingupEyeIconDiv">
                      <input
                        onChange={(e) => {
                          setconfirm_password(e.target.value);
                        }}
                        value={confirm_password}
                        type={eye ? "text" : "password"}
                        className="signup-location-input"
                        placeholder="Confirm Password"
                      />
                      <img
                        alt=""
                        onClick={() => {
                          seteye(!eye);
                        }}
                        className="Singup-eye-Icon"
                        src={eye ? SingupEyeIcon : SingupClosedEyeIcon}
                      ></img>
                    </div>
                  </>
                )}
                <button
                  onClick={() => {
                    setFBSignIp();
                  }}
                  className="signup-sign-in-button"
                >
                  SIGN UP
                </button>
                <p
                  onClick={() => {
                    setvisible(true);
                    setvisibleSignUp(false);
                  }}
                  className="signup-create-account"
                >
                  Already a user? SIGN IN
                </p>
              </div>
            </div>
          )}

          {/* seller display sign in */}
          {displaySignIn && (
            <div className="main_parent">
              <div
                className={onDisplayClose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setOnDisplayClose(false);
                  setTimeout(() => {
                    setvisible(false);
                    dispatch(setSignUpValue(false));
                    setOnDisplayClose(onDisplayClose);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",
                  float: "right",
                  height: "100%",
                  position: "fixed",
                  top: 0,
                  zIndex: 99999999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={
                  onDisplayClose ? "DivSignInWithOptions" : "slideBack"
                }
              >
                <img
                  className="closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setOnDisplayClose(false);
                    setTimeout(() => {
                      setvisible(false);
                      dispatch(setSignUpValue(false));
                      setOnDisplayClose(onDisplayClose);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />

                <p className="sign-in-title">
                  Sign in to
                  <span className="text-color-blue"> Gaddideals </span>
                </p>
                <p className="sign-in-welcome-text">
                  Welcome back! Sign in with your data that you entered during
                  registration
                </p>
                <div class="sign-in-google">
                  <img src={googleLogo} alt=""></img>

                  <GoogleLogin
                    // uxMode="popup"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          border: "none",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "1vw",
                          color: "#cfcfcf",
                        }}
                      >
                        Sign in with Google
                      </button>
                    )}
                    clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseFailedGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <button className="sign-in-fb">
                  <img src={facebookLogo} alt=""></img>
                  {/* Sign in with Facebook */}
                  {/* <FacebookLogin
                appId="615601846567774"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
              /> */}
                  <FacebookLogin
                    appId="615601846567774"
                    // autoLoad={false}

                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    fields="name,email"
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick}>
                        This is my custom FB button
                      </button>
                    )}
                  />
                </button>
                <button
                  className="sign-in-email"
                  onClick={() => {
                    setvisibleMailSigIn(!visibleMailSigIn);
                    // setvisible(false);
                  }}
                >
                  <img src={gmailLogo} alt=""></img>
                  Sign in with Email & Password
                </button>
                <div className="or-div">
                  <hr></hr>
                  <span className="or">or</span>
                  <hr></hr>
                </div>
                <input
                  // type="tel"
                  maxLength="10"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="phone-no-input"
                  placeholder="Phone number "
                  name="mob_no"
                  value={mob_no}
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    saveUser();
                  }}
                  className="sign-in-button"
                >
                  SIGN IN
                </button>

                <p
                  onClick={() => {
                    setvisibleSignUp(!visibleSignUp);
                    setvisible(false);
                    // setvisibleOTP(true);
                  }}
                  className="create-account"
                >
                  Sign Up or Create Account
                </p>
              </div>
            </div>
          )}

          {/* sign IN */}
          {visible && (
            <div className="main_parent">
              <div
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",
                  float: "right",
                  height: "100%",
                  position: "fixed",
                  top: 0,
                  zIndex: 99999999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />

                <p className="sign-in-title">
                  Sign in to
                  <span className="text-color-blue"> Gaddideals </span>
                </p>
                <p className="sign-in-welcome-text">
                  Welcome back! Sign in with your data that you entered during
                  registration
                </p>
                <div class="sign-in-google">
                  <img src={googleLogo} alt=""></img>

                  <GoogleLogin
                    // uxMode="popup"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          border: "none",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "1vw",
                          color: "#cfcfcf",
                        }}
                      >
                        Sign in with Google
                      </button>
                    )}
                    clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseFailedGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <button className="sign-in-fb">
                  <img src={facebookLogo} alt=""></img>
                  {/* Sign in with Facebook */}
                  {/* <FacebookLogin
                appId="615601846567774"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
              /> */}
                  <FacebookLogin
                    appId="615601846567774"
                    // autoLoad={false}

                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    fields="name,email"
                    render={(renderProps) => (
                      <button onClick={renderProps.onClick}>
                        This is my custom FB button
                      </button>
                    )}
                  />
                </button>
                <button
                  className="sign-in-email"
                  onClick={() => {
                    setvisibleMailSigIn(!visibleMailSigIn);
                    // setvisible(false);
                  }}
                >
                  <img src={gmailLogo} alt=""></img>
                  Sign in with Email & Password
                </button>
                <div className="or-div">
                  <hr></hr>
                  <span className="or">or</span>
                  <hr></hr>
                </div>
                <input
                  // type="tel"
                  maxLength="10"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="phone-no-input"
                  placeholder="Phone number "
                  name="mob_no"
                  value={mob_no}
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    saveUser();
                  }}
                  className="sign-in-button"
                >
                  SIGN IN
                </button>

                <p
                  onClick={() => {
                    setvisibleSignUp(!visibleSignUp);
                    setvisible(false);
                    // setvisibleOTP(true);
                  }}
                  className="create-account"
                >
                  Sign Up or Create Account
                </p>
              </div>
            </div>
          )}

          {/* Sign Up */}

          {visibleSignUp && (
            <div className="signup-main_parent">
              {/* {locationDropDown && (
            <div
              className="mob-menue-overlay"
              onClick={() => {
                setlocationDropDown(false);
              }}
            ></div>
          )} */}
              <div
                className="signup-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                  setTimeout(() => {
                    setvisibleSignUp(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",
                  overflowY: "scroll",
                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="signup-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                    setTimeout(() => {
                      setvisibleSignUp(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="signup-sign-in-title">
                  Sign up to
                  <span className="signup-text-color-blue"> Gaddideals </span>
                </p>

                <div className="signup-other-option-div">
                  <div className="box-1">
                    <GoogleLogin
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "1vw",
                            color: "#cfcfcf",
                          }}
                        >
                          <img
                            className="website-google-signup-img"
                            src={mobGmailIcon}
                            alt=""
                          />
                          Google
                          {/* Sign in with Google */}
                        </button>
                      )}
                      clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                      onSuccess={responseGoogleSignup}
                      onFailure={responseFailedGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                  <div className="box-2">
                    {/* <img className="website-fb-signup-img" src={mobFbIcon} alt="" /> */}
                    <FacebookLogin
                      appId="615601846567774"
                      // autoLoad={false}
                      callback={responseFacebookSignup}
                      cssClass="website-facebook-sign-up-button-class"
                      fields="name,email"
                      render={(renderProps) => (
                        <button onClick={renderProps.onClick}>
                          <img
                            className="website-fb-signup-img"
                            src={mobFbIcon}
                            alt=""
                          />{" "}
                        </button>
                      )}
                    />
                    <p className="paddingTop-5">Facebook</p>
                  </div>
                </div>

                <div className="or-div">
                  <hr></hr>
                  <span className="or">or</span>
                  <hr></hr>
                </div>

                <input
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  type="text"
                  className="signup-phone-no-input"
                  placeholder="Name "
                />
                <input
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                  maxLength={10}
                  className="signup-phone-no-input"
                  placeholder="Mobile number "
                  // type="number"
                />
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email}
                  type="email"
                  className="signup-phone-no-input"
                  placeholder="Email "
                />
                <div className="SinguplocationIcon">
                  <input
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    onFocus={() => {
                      setlocationDropDown(!locationDropDown);
                    }}
                    value={city}
                    type="text"
                    className="signup-location-input"
                    placeholder="Location "
                  />
                  <img
                    className="Singup-location-Icon"
                    src={SinguplocationIcon}
                    alt="location icon"
                  />
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
                {/* {hidePassword ? null : (
              <> */}
                <input
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  className="signup-phone-no-input"
                  placeholder="Password "
                />
                {/* <p className="password-guide">
                  Password length must be less than 10 characters
                </p> */}
                <div className="SingupEyeIconDiv">
                  <input
                    onChange={(e) => {
                      setconfirm_password(e.target.value);
                    }}
                    value={confirm_password}
                    type={eye ? "text" : "password"}
                    className="signup-location-input"
                    placeholder="Confirm Password"
                  />
                  <img
                    alt=""
                    onClick={() => {
                      seteye(!eye);
                    }}
                    className="Singup-eye-Icon"
                    src={eye ? SingupEyeIcon : SingupClosedEyeIcon}
                  ></img>
                </div>
                {/* </>
            )} */}
                <button
                  onClick={() => {
                    setSignup();
                  }}
                  className="signup-sign-in-button"
                >
                  SIGN UP
                </button>
                <p
                  onClick={() => {
                    setvisible(true);
                    setvisibleSignUp(false);
                  }}
                  className="signup-create-account"
                >
                  Already a user? SIGN IN
                </p>
              </div>
            </div>
          )}

          {/* OTP */}

          {visibleOTP && (
            <div className="otp-main_parent">
              <div
                className="otp-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  setonclose(false);
                  setvisibleSignUp(false);
                  setTimeout(() => {
                    setvisible(false);
                  }, 300);
                  setTimeout(() => {
                    setvisibleOTP(false);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",

                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="otp-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    setonclose(false);
                    setvisibleSignUp(false);
                    setTimeout(() => {
                      setvisible(false);
                    }, 300);
                    setTimeout(() => {
                      setvisibleOTP(false);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="otp-sign-in-title">
                  Enter<span className="signup-text-color-blue"> OTP </span>
                </p>
                <p className="otp-welcome-text">
                  We???ve sent an OTP to your phone number.
                </p>
                <p className="otp-phone-no-text">Phone Number</p>
                <input
                  value={mob_no}
                  type="number"
                  className="otp-phone-no-input"
                  placeholder="Mobile number "
                  onChange={(e) => {
                    console.log(mob_no);
                    setmob_no(e.target.value);
                  }}
                />
                <p className="otp-phone-no-text">One time password</p>
                <input
                  value={otp}
                  type="number"
                  className="otp-phone-no-input"
                  placeholder="Enter OTP"
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                />
                {timerVisible && (
                  <div className="otp-timer">
                    <span>00:</span>
                    <span>{counter}</span>
                    <p>s</p>
                  </div>
                )}

                {EnableResendOtp && (
                  <p
                    onClick={() => {
                      setvisibleSignUp(!visibleSignUp);
                      setvisible(true);
                    }}
                    className="otp-create-account"
                  >
                    Didn???t recive the OTP?{" "}
                    <span
                      className="otp-text-color-blue"
                      onClick={() => {
                        resendotp();
                        settimerVisible(true);
                      }}
                    >
                      RESEND OTP
                    </span>
                  </p>
                )}
                <button
                  onClick={() => {
                    savePhoneOtp();
                  }}
                  className="otp-sign-in-button"
                >
                  VERIFY OTP
                </button>
              </div>
            </div>
          )}

          {/* sign in with mail and password */}
          {visibleMailSigIn && (
            <div className="otp-main_parent">
              <div
                className="otp-parent"
                className={onclose ? "parent" : "slideBack"}
                onClick={() => {
                  clearAllStates();
                  // setonclose(false);
                  setvisibleSignUp(false);
                  // setTimeout(() => {
                  //   setvisible(false);
                  // }, 300);
                  setTimeout(() => {
                    setvisibleMailSigIn(!visibleMailSigIn);
                  }, 300);
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  paddingLeft: "40px",
                  fontFamily: "Arial",
                  width: "35%",

                  float: "right",
                  height: "100%",
                  position: "fixed",
                  zIndex: 9999999999999999,
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "30px 0px 0px 30px",
                }}
                className={onclose ? "DivSignInWithOptions" : "slideBack"}
              >
                <img
                  className="otp-closing-arrow"
                  onClick={() => {
                    clearAllStates();
                    // setonclose(false);
                    setvisibleSignUp(false);
                    // setTimeout(() => {
                    //   setvisible(false);
                    // }, 300);
                    setTimeout(() => {
                      setvisibleMailSigIn(!visibleMailSigIn);
                    }, 300);
                  }}
                  src={closingArrow}
                  alt=""
                />
                <p className="otp-sign-in-title">
                  Enter
                  <span className="signup-text-color-blue">
                    {" "}
                    Email and Password{" "}
                  </span>
                </p>
                <p className="otp-welcome-text">
                  Sign in using your email and password
                </p>
                <p className="otp-phone-no-text">Email</p>
                <input
                  value={email}
                  type="text"
                  className="otp-phone-no-input"
                  placeholder="Email "
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <p className="otp-phone-no-text">Password</p>
                <input
                  value={password}
                  type="password"
                  className="otp-phone-no-input"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />

                <button
                  onClick={() => {
                    saveMailPassword();
                  }}
                  className="otp-sign-in-button"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* seller mobile dispatch */}
          {mobDisplaySignIn && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={mobDisplaySignIn}
                onClickAway={() => {
                  dispatch(setMobSignInValue(false));
                  clearAllStates();
                }}
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={() => {
                      dispatch(setMobSignInValue(false));
                      clearAllStates();
                    }}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-signin-text">
                    Sign in to
                    <span className="text-color-blue"> Gaddideals </span>
                  </p>
                  <p className="mob-resp-welcome-text">
                    Welcome back! Sign in with your data that you entered during
                    registration
                  </p>
                  <input
                    className="mob-resp-moile-input"
                    placeholder="Phone Number"
                    name="mob_no"
                    value={mob_no}
                    onChange={(e) => {
                      setmob_no(e.target.value);
                    }}
                  />
                  <p
                    className="mob-resp-not-a-member-text"
                    onClick={() => {
                      setshowSignIn(!showSignIn); //opening signup page
                      dispatch(setMobSignInValue(false)); //closing signin page
                    }}
                  >
                    Not a member?{" "}
                    <span className="text-color-blue">Create Account</span>
                  </p>
                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      saveMobileUser();
                    }}
                  >
                    NEXT
                  </button>
                  <div className="mob-resp-multiple-signin">
                    <>
                      <FacebookLogin
                        appId="615601846567774"
                        // autoLoad={false}
                        callback={responseFacebook}
                        cssClass="my-facebook-button-class"
                        fields="name,email"
                        render={(renderProps) => (
                          <button onClick={renderProps.onClick}></button>
                        )}
                      />
                    </>
                    <>
                      <GoogleLogin
                        render={(renderProps) => (
                          <button
                            className="my-google-button-class"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "transparent",
                              border: "none",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 0,
                              fontSize: "1vw",
                              color: "#cfcfcf",
                            }}
                          ></button>
                        )}
                        clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseFailedGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </>
                    <img
                      className="mob-resp-mail-signin"
                      src={mobMailIcon}
                      alt=""
                      onClick={() => {
                        setshowMailSigIn(!showMailSigIn);
                        dispatch(setMobSignInValue(false));
                      }}
                    ></img>
                  </div>
                </div>
              </Modal>
            </div>
          )}

          {/* open mobile responsive sign up */}
          {showsignup && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={showsignup}
                onClickAway={() => {
                  setshowsignup(!showsignup);
                  clearAllStates();
                }}
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={() => {
                      setshowsignup(!showsignup);
                      clearAllStates();
                    }}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-signin-text">
                    Sign in to
                    <span className="text-color-blue"> Gaddideals </span>
                  </p>
                  <p className="mob-resp-welcome-text">
                    Welcome back! Sign in with your data that you entered during
                    registration
                  </p>
                  <input
                    className="mob-resp-moile-input"
                    placeholder="Phone Number"
                    name="mob_no"
                    value={mob_no}
                    onChange={(e) => {
                      setmob_no(e.target.value);
                    }}
                  />
                  <p
                    className="mob-resp-not-a-member-text"
                    onClick={() => {
                      setshowSignIn(!showSignIn); //opening signup page
                      setshowsignup(!showsignup); //closing signin page
                    }}
                  >
                    Not a member?{" "}
                    <span className="text-color-blue">Create Account</span>
                  </p>
                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      saveMobileUser();
                    }}
                  >
                    NEXT
                  </button>
                  <div className="mob-resp-multiple-signin">
                    <>
                      <FacebookLogin
                        appId="615601846567774"
                        // autoLoad={false}
                        callback={responseFacebook}
                        cssClass="my-facebook-button-class"
                        fields="name,email"
                        render={(renderProps) => (
                          <button onClick={renderProps.onClick}></button>
                        )}
                      />
                    </>
                    <>
                      <GoogleLogin
                        render={(renderProps) => (
                          <button
                            className="my-google-button-class"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "transparent",
                              border: "none",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 0,
                              fontSize: "1vw",
                              color: "#cfcfcf",
                            }}
                          ></button>
                        )}
                        clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseFailedGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </>
                    <img
                      className="mob-resp-mail-signin"
                      src={mobMailIcon}
                      alt=""
                      onClick={() => {
                        setshowMailSigIn(!showMailSigIn);
                        setshowsignup(!showsignup);
                      }}
                    ></img>
                  </div>
                </div>
              </Modal>
            </div>
          )}

          {showSignIn && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={showSignIn}
                onClickAway={() => {
                  setshowSignIn(!showSignIn);
                  clearAllStates();
                }}
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={() => {
                      setshowSignIn(!showSignIn);
                      clearAllStates();
                    }}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-signin-text">
                    Sign up to
                    <span className="text-color-blue"> Gaddideals </span>
                  </p>
                  <div className="signup-other-option-div">
                    <div className="box-1">
                      <GoogleLogin
                        render={(renderProps) => (
                          <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "transparent",
                              border: "none",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "1vw",
                              color: "#cfcfcf",
                            }}
                          >
                            <img
                              className="website-google-signup-img"
                              src={mobGmailIcon}
                              alt=""
                            />
                            Google
                            {/* Sign in with Google */}
                          </button>
                        )}
                        clientId="863672492597-0lp66a0tumqv8pjcek3bsgmvuhb0fio8.apps.googleusercontent.com"
                        onSuccess={MobresponseGoogleSignup}
                        onFailure={responseFailedGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>
                    <div className="box-2">
                      <FacebookLogin
                        appId="615601846567774"
                        callback={MobresponseFacebookSignup}
                        cssClass="website-facebook-sign-up-button-class"
                        fields="name,email"
                        // onClick={(renderProps) => renderProps.onClick}
                        render={(renderProps) => (
                          <button onClick={renderProps.onClick}>
                            <img
                              className="website-fb-signup-img"
                              src={mobFbIcon}
                              alt=""
                            />{" "}
                          </button>
                        )}
                      />
                      <p className="paddingTop-5">Facebook</p>
                    </div>
                  </div>

                  <div className="or-div">
                    <hr></hr>
                    <span className="or">or</span>
                    <hr></hr>
                  </div>

                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="Name "
                  />
                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setmob_no(e.target.value);
                    }}
                    value={mob_no}
                    maxLength={10}
                    placeholder="Mobile number "
                  />
                  <input
                    className="mob-resp-name-input"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email "
                  />
                  <div className="mob-resp-location-div">
                    <input
                      className="mob-resp-location-input"
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                      value={city}
                      type="text"
                      placeholder="Location "
                      onFocus={() => {
                        setlocationDropDown(!locationDropDown);
                      }}
                    />
                    <img src={locationIcon} alt=""></img>
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
                  {hidePassword ? null : (
                    <>
                      <input
                        className="mob-resp-name-input"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        placeholder="Password "
                      />
                      <div className="mob-resp-confirmPassword-div">
                        <input
                          className="mob-resp-confirmPassword-input"
                          onChange={(e) => {
                            setconfirm_password(e.target.value);
                          }}
                          value={confirm_password}
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                        />
                        <img
                          src={
                            showPassword ? SingupEyeIcon : SingupClosedEyeIcon
                          }
                          onClick={() => {
                            setshowPassword(!showPassword);
                          }}
                          alt=""
                        ></img>
                      </div>
                    </>
                  )}
                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      setMobileSignup();
                    }}
                  >
                    SIGN UP
                  </button>
                  <p
                    className="mob-resp-already-a-member-text"
                    onClick={() => {
                      setshowSignIn(!showSignIn); //closing signup page
                      setshowsignup(!showsignup); //opening signin page
                    }}
                  >
                    <span className="text-color-blue">
                      Already a user? SIGN IN
                    </span>
                  </p>
                </div>
              </Modal>
            </div>
          )}

          {/* open mobile responsive otp page */}
          {showOtp && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={showOtp}
                onClickAway={closeOtp}
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={closeOtp}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-enterOtp-text">
                    Enter<span className="text-color-blue"> OTP </span>
                  </p>
                  <p className="mob-resp-otpSent-text">
                    We???ve sent an OTP to your phone number.
                  </p>
                  <p className="mob-resp-phone-num-text">Phone Number</p>
                  <input
                    className="mob-resp-moile-input"
                    placeholder="Phone Number"
                    name="mob_no"
                    value={mob_no}
                    onChange={(e) => {
                      console.log("hjj");
                      setmob_no(e.target.value);
                    }}
                  />
                  <p className="mob-resp-otp-text">One time password</p>
                  <div>
                    <input
                      value={otp}
                      type="number"
                      placeholder="Enter OTP"
                      onChange={(e) => {
                        setotp(e.target.value);
                      }}
                      className="mob-resp-moile-input"
                      name="mob_no"
                    />
                    <span></span>
                  </div>
                  {timerVisible && (
                    <div className="otp-timer">
                      <span>00:</span>
                      <span>{counter}</span>
                      <p>s</p>
                    </div>
                  )}
                  {EnableResendOtp && (
                    <p
                      className="mob-resp-not-a-member-text"
                      onClick={() => {
                        resendotp();
                      }}
                    >
                      Didn???t recive the OTP?{" "}
                      <span className="text-color-blue">RESEND OTP</span>
                    </p>
                  )}

                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      saveMoilePhoneOtp();
                    }}
                  >
                    VERIFY OTP
                  </button>
                </div>
              </Modal>
            </div>
          )}

          {showMailSigIn && (
            <div>
              <Modal
                width="90%"
                effect="fadeInRight"
                className="modal"
                visible={showMailSigIn}
                onClickAway={() => {
                  setshowMailSigIn(!showMailSigIn);
                }} //chnage
              >
                {/* for CSS check  MobileRespSignInPage.style.css */}
                <div className="mob-signin-resp">
                  <img
                    className="mob-resp-closing-arrow"
                    onClick={() => {
                      setshowMailSigIn(!showMailSigIn);
                    }}
                    src={closingArrow}
                    alt=""
                  ></img>
                  <p className="mob-resp-enterOtp-text">
                    Enter
                    <span className="text-color-blue">
                      {" "}
                      Email and Password{" "}
                    </span>
                  </p>
                  <p className="mob-resp-otpSent-text">
                    Sign in with your email and password.
                  </p>
                  <p className="mob-resp-phone-num-text">Email</p>
                  <input
                    className="mob-resp-moile-input"
                    placeholder="Email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <p className="mob-resp-otp-text">Password</p>
                  <div>
                    <input
                      value={password}
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                      className="mob-resp-moile-input"
                      name="password"
                    />
                    <span></span>
                  </div>

                  <button
                    className="mob-resp-next-button"
                    onClick={() => {
                      saveMobMailPassword();
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </Modal>
            </div>
          )}
        </nav>
      </div>
      {langDropdown && (
        <div
          className="location-overlay"
          onClick={() => setLangDropdown(false)}
        ></div>
      )}
      {LoggedUserHamburgerMenue && (
        <div
          className="mob-menue-overlay"
          onClick={() => {
            setLoggedUserHamburgerMenue(false);
          }}
        ></div>
      )}
      {hamburgervisile && (
        <div
          className="mob-menue-overlay"
          onClick={() => {
            sethamburgervisile(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
