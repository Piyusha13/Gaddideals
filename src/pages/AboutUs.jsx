import React from "react";
import Navbar from "../components/Navbar";
import "./AboutUs.style.css";
import TACbannerImg from "../assets/TACBanner.png";
import AUTImg from "../assets/AboutUsTruck.png";
import Footer from "./../components/Footer";
import gp from "../assets/app-store.png";
import ap from "../assets/google-play.png";
import { store } from "./../store/store";
import overlay from "../assets/overlay-img.png";
import visionMidDiv from "../assets/vision-mid-div.png";
import visionBottomImg from "../assets/vision-bottom-div.png";
import valueOneImg from "../assets/user-icon.png";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="banner-div ">
        <img
          className="tac-banner-img"
          src={TACbannerImg}
          alt="terms&conditionsImg"
        />
        <div className="heading-AU">
          <span>About Us</span>
        </div>
        <div className="AU-downloads-div">
          <img
            src={gp}
            className="gp-img"
            alt=""
            onClick={() => {
              window.location.href =
                "https://play.google.com/store/games?utm_source=apac_med&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700058906740516_creativeid_480977734970_device_c&gclid=Cj0KCQjw54iXBhCXARIsADWpsG-CCJ0Va1SM47pcLde7OIB2qTUQqRMNXrjApqyWTvovb5yTz72kgn8aAnMeEALw_wcB&gclsrc=aw.ds";
            }}
          />
          <img
            src={ap}
            className="ap-img"
            alt=""
            onClick={() => {
              window.location.href = "https://www.apple.com/in/app-store/";
            }}
          />
        </div>
      </div>
      <div className="cotent-div gd_container">
        Gaddideals believes that commercial vehicle users face a lot of problems
        during the process of buying and selling used commercial vehicles such
        as trucks, tractors, buses, 3-wheelers etc. We at Gaddideals want to
        solve this problem by providing them with information about the vehicle,
        and a variety of options so that they not only buy the best vehicle
        relatable for their business but also at the right price and with no
        commission being charged to them. Whereas sellers face the problem of
        not receiving the right price for their vehicle and they also face the
        problem of not having a lot of options in terms of buyers at Gaddideals
        we solve both these problems. Sellers will receive multiple buyers so
        they can sell their vehicle at the best price possible and get a variety
        of inquiries in a short span of time and they will only have to give 1%
        of the listing price post the transaction is done which is the lowest
        charge according to the industry.
        <br></br>
        Gaddideals is a next-generation platform that has the purpose to ease
        the process of the used commercial vehicle market by providing buyers
        and sellers a platform to buy and sell used commercial vehicles. We are
        doing it by connecting all users who use commercial vehicles or deal in
        commercial vehicles so that we can complete the process in a short span
        of time.
      </div>
      <div className="aut_bottom-img gd_container">
        <img src={AUTImg} alt=""></img>
      </div>
      <div className="vision-top-div gd_container">
        <img className="overlay-img " src={overlay} alt="" />
        <p className="vision-top-div-text">
          <span className="blue"> Gaddideals</span> is a next-generation
          platform that has the purpose to ease the process of the used
          commercial vehicle market by{" "}
          <span className="blue"> providing buyers</span> and{" "}
          <span className="blue">
            sellers a platform to buy and sell used commercial vehicles.
          </span>
        </p>
        <img src={visionMidDiv} alt="" className="vision-mid-div" />
      </div>
      <div className="vision-bottom-div gd_container">
        <img
          src={visionBottomImg}
          alt=""
          className="vision-bottom-div-bg-img"
        />
        <div className="vision-main-div">
          <p className="vision-heading-1">OUR</p>
          <p className="vision-heading-2">VISION</p>
          <p className="vision-content">
            Gaddideals believes that commercial vehicle users face a lot of
            problems during the process of buying and selling used commercial
            vehicles such as trucks, tractors, buses, 3-wheelers etc.{" "}
          </p>
        </div>
        <div className="OurValues-div">OUR VALUES</div>
      </div>
      <div className="values gd_container">
        <div className="value-div">
          <div className="value-1">
            <img src={valueOneImg} alt="value-1" />
          </div>
          <p>Integrity</p>
        </div>
        <div className="value-div">
          <div className="value-1">
            <img src={valueOneImg} alt="value-1" />
          </div>
          <p>Integrity</p>
        </div>
        <div className="value-div">
          <div className="value-1">
            <img src={valueOneImg} alt="value-1" />
          </div>
          <p>Integrity</p>
        </div>
        <div className="value-div">
          <div className="value-1">
            <img src={valueOneImg} alt="value-1" />
          </div>
          <p>Integrity</p>
        </div>
        <div className="value-div">
          <div className="value-1">
            <img src={valueOneImg} alt="value-1" />
          </div>
          <p>Integrity</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
