import { useState, useEffect } from "react";
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

import upArrowIcon from "../assets/up-arrow.png";
import googleLogo from "../assets/google_logo.svg";
import facebookLogo from "../assets/facebook_logo.svg";
import gmailLogo from "../assets/gmail_logo.png";
import "./navbar.style.css";

import { ToastContainer, toast } from "react-toastify";
// import MobileRespHamburgerMune from "../pages/MobileRespHamburgerMune";

import '../pages/MobileRespHamburgerMenue.style.css';
// import 'react-toastify/dist/ReactToastify.css';

import mobFbIcon from "../assets/mob-fb-icon.png"

import mobGmailIcon from "../assets/mob-gmail-icon.png"

import mobMailIcon from "../assets/mob-mail-icon.png"

import { useRef } from "react";


const queryString = require("query-string");

const Navbar = () => {
  const location = queryString.parse(window.location.search);
  const [navIcons, setNavIcons] = useState([]);
  const [activeCategory, setActiveCategory] = useState(location.category);
  const [hamburgervisile,sethamburgervisile]=useState(false);

  const navigate = useNavigate();

  const fetchIcons = async () => {
    const response = await axios.get(
      "https://gaddideals.brokerinvoice.co.in/api/category"
    );
    setNavIcons(response.data.category.docs);
  };
  //  let timeout = null;
 
  // function onScroll() {
  //  setsellBuyContainerOnScroll(true);

  //   clearTimeout(timeout);

  //   timeout = setTimeout(() => {
  //     setsellBuyContainerOnScroll(false);
  //   }, 200);
  // };
  useEffect(() => {
    fetchIcons();
    // window.removeEventListener("scroll", onScroll);
  }, []);

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visibleSignUp, setvisibleSignUp] = useState(false);
  const [visibleOTP, setvisibleOTP] = useState(false);
  const [mob_no, setmob_no] = useState("");
  const [otp, setotp] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [eye, seteye] = useState(false);
  const [onclose, setonclose] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [selectedLanguage, setselectedLanguage] = useState("English");
  const [token, settoken] = useState(localStorage.getItem("Token"));

  // const notify = () =>toast("Enter mobile number")  ;

  //desktop login section 
  function saveUser() {
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
          setotp(result.data.otp);
          setvisibleOTP(!visibleOTP);
          setvisible(false);

          setCounter(59);
        }
      }
    });
  }
  function savePhoneOtp() {
    console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      console.log(res);
      localStorage.setItem("Token", res.data.user.accessToken);
      window.location.href = "/loggeduser";
      // if (res.data.status == "failed") {
      if (res.data.status === "failed") {
        toast.error("incorrect otp");
      } else if (res.data.status === "Success") {
        toast.success(res.data.message);
        setvisibleOTP(false);
      }
    });
  }

  function setSignup() {
    console.log("otp verified");
    console.warn({ name, email, mob_no, city, password, confirm_password });
    let payload = { name, email, mob_no, city, password, confirm_password };
    axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
      console.log("res", res);
      if (
        name === "" ||
        email === "" ||
        mob_no === "" ||
        city === "" ||
        password === "" ||
        confirm_password === ""
      ) {
        toast.error("required feilds are empty");
      } else if (!email.match("@gmail.com")) {
        toast.error("enter valid mail id");
      } else if (password !== confirm_password) {
        toast.error("password and confirm password don't match");
      } else {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          setvisibleSignUp(false);
          setmob_no(res.data.mob_no);
          // setotp(res.data.otp);
          savePhoneOtp();
          setvisibleOTP(true);
        } else if (res.data.status === "failed") {
          toast.error(res.data.message);
        }
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
          setotp(result.data.otp);
          setCounter(59);
        }
      }
    });
  }

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);


  //moile login section

  const [showOtp,setshowOtp]=useState(false);
  const [showSignIn,setshowSignIn]=useState(false);
  const [loginsuccess,setloginsuccess]=useState(false);
  const [LoggedUserHamburgerMenue,setLoggedUserHamburgerMenue]=useState(false);
  const [sellBuyContainerOnScroll,setsellBuyContainerOnScroll]=useState(true);

  function saveMobileUser() {
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
          setotp(result.data.otp);
          setshowOtp(!showOtp);
          setshowsignup(!showsignup);
          setCounter(59);
        }
      }
    });
  }

  function setMobileSignup() {
    console.log("otp verified");
    console.warn({ name, email, mob_no, city, password, confirm_password });
    let payload = { name, email, mob_no, city, password, confirm_password };
    axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
      console.log("res", res);
      if (
        name === "" ||
        email === "" ||
        mob_no === "" ||
        city === "" ||
        password === "" ||
        confirm_password === ""
      ) {
        toast.error("required feilds are empty");
      } else if (!email.match("@gmail.com")) {
        toast.error("enter valid mail id");
      } else if (password !== confirm_password) {
        toast.error("password and confirm password don't match");
      } else {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          
          setmob_no(res.data.mob_no);
          setshowSignIn(!showSignIn);
          saveMoilePhoneOtp();
          setshowOtp(!showOtp);
        } else if (res.data.status === "failed") {
          toast.error(res.data.message);
        }
      }
    });
  }

  function saveMoilePhoneOtp(){
    console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      console.log(res);
      localStorage.setItem("Token", res.data.user.accessToken);
      window.location.href = "/loggeduser";
      // if (res.data.status == "failed") {
      if (res.data.status === "failed") {
        toast.error("incorrect otp");
      } else if (res.data.status === "Success") {
        setloginsuccess(!loginsuccess);
        toast.success(res.data.message);
        // setvisibleOTP(false);
        setshowOtp(!showOtp);
      }
    });
  }
  function Openmenu(){
    if(localStorage.Token){
      setLoggedUserHamburgerMenue(!LoggedUserHamburgerMenue);

    }
    else{
    sethamburgervisile(!hamburgervisile);
    }
  }

  const [showsignup,setshowsignup]=useState(false);

  

  function closeModal(){
    setshowsignup(!showsignup);
  }
  function closeOtp(){
    setshowOtp(!showOtp);
  }
  function closeSignIn(){
    setshowSignIn(!showSignIn);
  }
  
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setsellBuyContainerOnScroll(!sellBuyContainerOnScroll);
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setsellBuyContainerOnScroll(!sellBuyContainerOnScroll);
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  function logoutAccount() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <header className="header-container">
      {/* sign IN */}
      {visible && (
        <div className="main_parent">
          <div
            // className="parent"
            className={onclose ? "parent" : "slideBack"}
            onClick={() => {
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
                setonclose(false);
                setTimeout(() => {
                  setvisible(false);
                }, 300);
              }}
              src={closingArrow}
              alt=""
            />

            <p className="sign-in-title">
              Sign in to<span className="text-color-blue"> Gaddideals </span>
            </p>
            <p className="sign-in-welcome-text">
              Welcome back! Sign in with your data that you entered during
              registration
            </p>
            <button className="sign-in-google">
              <img src={googleLogo} alt=""></img>
              Sign in with Google
            </button>
            <button className="sign-in-fb">
              <img src={facebookLogo} alt=""></img>
              Sign in with Facebook
            </button>
            <button className="sign-in-email">
              <img src={gmailLogo} alt=""></img>
              Sign in with Email & Password
            </button>
            <div className="or-div">
              <hr></hr>
              <span className="or">or</span>
              <hr></hr>
            </div>
            <input
              maxLength="10"
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
          <div
            className="signup-parent"
            className={onclose ? "parent" : "slideBack"}
            onClick={() => {
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
            className="otp-parent "
            className={onclose ? "parent" : "slideBack"}
            onClick={() => {
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
              We’ve sent an OTP to your phone number.
            </p>
            <p className="otp-phone-no-text">Phone Number</p>
            <input
              value={mob_no}
              type="number"
              className="otp-phone-no-input"
              placeholder="Mobile number "
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
            <span className="timer"> 00:{counter}s</span>
            <p
              onClick={() => {
                setvisibleSignUp(!visibleSignUp);
                setvisible(true);
              }}
              className="otp-create-account"
            >
              Didn’t recive the OTP?{" "}
              <span
                className="otp-text-color-blue"
                onClick={() => {
                  resendotp();
                }}
              >
                RESEND OTP
              </span>
            </p>
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

      {/* open hamurger menue */}
      {hamburgervisile &&(
              <div className='mob-menue-container'>
              <div className='mob-top-div'>
                  <input placeholder='Location' className='mob-location-input'/>
                  <img className='mob-arrow-img' src={downArrow} alt="down arrow" />
                </div>
              
              <div className='mob-middle-div'>
                  <button className='mob-login-button' onClick={()=>{setshowsignup(!showsignup)} } > Login</button>
                  <button className='mob-register-button'>Register</button>
              </div>
              <div className='mob-lower-div'>
                  <p className='mob-lower-div-text'>EMI Calculator</p>
                  <p className='mob-lower-div-text'>FAQ</p>
                  <p className='mob-lower-div-text'>Privacy Settings</p>
                  <p className='mob-lower-div-text'>Terms and Condition</p>
                  <p className='mob-lower-div-text mob-contact-us'>Contact Us</p>
              </div>
          </div>
      )}

      {LoggedUserHamburgerMenue && (
        <div className='mob-menue-container'>
        <div className='mob-top-div'>
            <input placeholder='Location' className='mob-location-input'/>
            <img className='mob-arrow-img' src={downArrow} alt="down arrow" />
          </div>
        
        <div className='mob-LoggedUser-middle-div'>
            <p className='mob-lower-div-text' onClick={()=>{window.location.href = "/loggeduser"}} >My Profile</p>
            <p className='mob-lower-div-text'onClick={()=>{window.location.href = "/UserVehicles"}} >My Product</p>
            <p className='mob-lower-div-text'>My Order</p>
        </div>
        <div className='mob-lower-div'>
            <p className='mob-lower-div-text'>EMI Calculator</p>
            <p className='mob-lower-div-text' onClick={()=>{window.location.href = "/UserFaq"}}>FAQ</p>
            <p className='mob-lower-div-text'>Privacy Settings</p>
            <p className='mob-lower-div-text'>Terms and Condition</p>
            <p className='mob-lower-div-text mob-contact-us'>Contact Us</p>
            <p className='mob-lower-div-text mob-contact-us' onClick={logoutAccount} >Sign out</p>
        </div>
    </div>
      )}

      {/* open mobile responsive sign up */}
      {showsignup &&(

        <div >
          <Modal width="90%" effect="fadeInRight" className="modal" visible={showsignup} onClickAway={closeModal}> 
          {/* for CSS check  MobileRespSignInPage.style.css */}
            <div className="mob-signin-resp">
                <img className="mob-resp-closing-arrow" onClick={closeModal} src={closingArrow} alt=""></img>
                <p className="mob-resp-signin-text">Sign in to<span className="text-color-blue"> Gaddideals </span></p>
                <p className="mob-resp-welcome-text">Welcome back! Sign in with your data that you entered during registration</p>
                <input className="mob-resp-moile-input" placeholder="Phone Number" name="mob_no"
              value={mob_no}
              onChange={(e) => {
                setmob_no(e.target.value);
              }}/>
                <p className="mob-resp-not-a-member-text" onClick={() => {
                setshowSignIn(!showSignIn); //opening signup page 
                setshowsignup(!showsignup); //closing signin page
                
              }} >Not a member? <span className="text-color-blue">Create Account</span></p>
                <button className="mob-resp-next-button"
                onClick={() => {
                  saveMobileUser();
                }}
                 >
                  NEXT</button>
                <div className="mob-resp-multiple-signin">
                  <img className="mob-resp-fb-signin" src={mobFbIcon} alt=""></img>
                  <img className="mob-resp-gmail-signin" src={mobGmailIcon} alt=""></img>
                  <img className="mob-resp-mail-signin" src={mobMailIcon} alt=""></img>
                </div>
            </div>
          </Modal>
        </div>
      )}

      {showSignIn &&(
        <div >
        <Modal width="90%" effect="fadeInRight" className="modal" visible={showSignIn} onClickAway={closeSignIn}> 
        {/* for CSS check  MobileRespSignInPage.style.css */}
          <div className="mob-signin-resp">
              <img className="mob-resp-closing-arrow" onClick={closeSignIn} src={closingArrow} alt=""></img>
              <p className="mob-resp-signin-text">Sign up to<span className="text-color-blue"> Gaddideals </span></p>
              <input className="mob-resp-name-input"  onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
              type="text"
              placeholder="Name "/>
            <input className="mob-resp-name-input" onChange={(e) => {
                setmob_no(e.target.value);
              }}
              value={mob_no}
              maxLength={10}
              placeholder="Mobile number "/>
            <input className="mob-resp-name-input"onChange={(e) => {
                setemail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email "/>
            <input className="mob-resp-name-input"onChange={(e) => {
                  setcity(e.target.value);
                }}
                value={city}
                type="text"
                placeholder="Location "/>
            <input className="mob-resp-name-input"onChange={(e) => {
                setpassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password "/>
            <input className="mob-resp-name-input" onChange={(e) => {
                  setconfirm_password(e.target.value);
                }}
                value={confirm_password}
                type={eye ? "text" : "password"}
                placeholder="Confirm Password"/>
              
              <button className="mob-resp-next-button"
              onClick={() => {
                setMobileSignup();
              }}
               >
                SIGN UP</button>
                <p className="mob-resp-already-a-member-text" onClick={() => {
              
                setshowSignIn(!showSignIn); //closing signup page 
                setshowsignup(!showsignup); //opening signin page
              
            }} ><span className="text-color-blue">Already a user? SIGN IN</span></p>
             
          </div>
        </Modal>
      </div>
      )}

      {/* open mobile responsive otp page */}
      {showOtp &&(
        <div >
        <Modal width="90%" effect="fadeInRight" className="modal" visible={showOtp} onClickAway={closeOtp}> 
        {/* for CSS check  MobileRespSignInPage.style.css */}
          <div className="mob-signin-resp">
              <img className="mob-resp-closing-arrow" onClick={closeOtp} src={closingArrow} alt=""></img>
              <p className="mob-resp-enterOtp-text">Enter<span className="text-color-blue"> OTP </span></p>
              <p className="mob-resp-otpSent-text">We’ve sent an OTP to your phone number.</p>
              <p className="mob-resp-phone-num-text">Phone Number</p>
              <input className="mob-resp-moile-input" placeholder="Phone Number" name="mob_no"
            value={mob_no}
            onChange={(e) => {
              setmob_no(e.target.value);
            }}/>
            <p className="mob-resp-otp-text">One time password</p>
            <div>
              <input  value={otp}
              type="number"
              
              placeholder="Enter OTP"
              onChange={(e) => {
                setotp(e.target.value);
              }} className="mob-resp-moile-input" placeholder="Enter OTP" name="mob_no"
            />
            <span></span>
            </div>
              <p className="mob-resp-not-a-member-text" onClick={() => {
                  resendotp();
                }} >Didn’t recive the OTP? <span className="text-color-blue">RESEND OTP</span></p>
              <button className="mob-resp-next-button"
              onClick={() => {
                saveMoilePhoneOtp();
              }}
               >
                VERIFY OTP</button>
              
          </div>
        </Modal>
      </div>

      )}

      {sellBuyContainerOnScroll &&(
        <div className="sell-buy-container-moile" onscroll={()=>{setsellBuyContainerOnScroll(false)}}>
        <Link to="/vehiclelistings">
          <button>Buy used commercial vehicle</button>
        </Link>
        <Link to="/sellerhome">
          <button className="sell-btn">Sell used commercial vehicle</button>
        </Link>
      </div>
      )}
      <div className="sell-buy-container-desktop" onscroll={()=>{setsellBuyContainerOnScroll(false)}}>
        <Link to="/vehiclelistings">
          <button>Buy used commercial vehicle</button>
        </Link>
        <Link to="/sellerhome">
          <button className="sell-btn">Sell used commercial vehicle</button>
        </Link>
      </div>
      

      <nav className="navbar navbar-expand-lg nav-container">
        <div className="container-fluid navar_div">
          <div className="logo">
            <a href="/" className="navbar-brand">
              <img src={logoIcon} alt="logo" />
            </a>
          </div>

          <div className="brand-categories">
            {navIcons.slice(0, 4).map((catgeoryIcon, index) => (
              <a
                href={"/vehiclelistings?category=" + catgeoryIcon._id}
                className={`${
                  activeCategory === catgeoryIcon._id
                    ? "brand-category active"
                    : "brand-category"
                }`}
                onClick={() => {
                  setActiveCategory(index);
                  navigate("/vehiclelistings?category=" + catgeoryIcon._id);
                }}
                key={catgeoryIcon._id}
              >
                <img
                  src={`https://gaddideals.brokerinvoice.co.in${catgeoryIcon.icon}`}
                  alt={catgeoryIcon.title}
                />
              </a>
            ))}
            
          </div>

          <div onClick={Openmenu} className="hamburger-menu ">
            <img src={hamburgerIcon} alt="mobile menu" />
          </div>

          <div className="search-container">
            <img src={searchIcon} alt="search icon" className="search-icon" />
            <input type="search" placeholder="Search" />
          </div>

          <div className="location-container">
            <div className="location">
              <img src={locationIcon} alt="location" />
              <span>Location</span>
            </div>
            <div className="arrow-icon">
              <img src={downArrow} alt="down arrow" />
            </div>
          </div>

          <div className="languages-container">
            <div className="language">
              <span className="SelectedLanguageDecoration">
                {selectedLanguage}{" "}
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
                    setselectedLanguage("English");
                  }}
                  className="language-1"
                >
                  English
                </p>
                <p
                  onClick={() => {
                    setselectedLanguage("Hindi");
                  }}
                  className="language-2"
                >
                  Hindi
                </p>
              </div>
            )}
          </div>

          {token ? (
            <Link to="/loggeduser">
              <div className="user">
                <img src={userIcon} alt="user icon" />
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
      </nav>
    </header>
  );
};

export default Navbar;
