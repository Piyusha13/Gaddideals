import React from "react";

import "./UserOrder.style.css";
import "./UserVehicles.style.css";
import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
// import edit_box from "../assets/edit_box.jpg";
// import edit_pen from "../assets/edit.png";
import { Link } from "react-router-dom";

import Lottie from 'react-lottie';
import animationData from '../assets/no-order-found.json';

function UserOrder() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="outside-container">
      <div className="profile-container">
        <div className="left-profile-container">
          <div className="upper-div">
            <p className="hello-text">Hello</p>
            <p className="user-name-left-div">James Ring</p>
          </div>
          <div className="options-div">
          <div className="my-vehicle-div">
            <img className="shipping-img" src={shipping} alt=""></img>
            <Link  to="/UserVehicles" className="my-vehicle-text">
              <span > My Vehicle</span>
              </Link>
              <Link to="/UserVehicles">
            <img className="next-arrow-img" src={next_arrow} alt=""/>
            </Link>
          </div>
          <div className="my-order-div">
            <img className="clipboard-img" src={clipboard} alt=""></img>
            <Link to="/Userorder" className="my-order-text">
            <span > My Order</span>
            </Link>
            <Link to="/Userorder">
            <img className="next-arrow-img" src={next_arrow} alt=""></img>
            </Link>
          </div>
          <div className="user-Faq-div">
            <img className="help-img" src={help} alt=""></img>
            <Link to="/UserFaq" className="user-Faq-text">
            <span >FAQ</span>
            </Link>
            <Link to="/UserFaq">
            <img className="next-arrow-img" src={next_arrow} alt=""></img>
            </Link>
          </div>
          <div className="sign-out-div">
            <img className="logout-img" src={logout} alt=""></img>
            <span className="sign-out-text"> Sign out</span>
          </div>
        </div>
        </div>
        <div className="right-order-container">
          <div className="user-order-header">
            <h1>My Order</h1>
          </div>
          <div className="lottie-div">
            <Lottie options={defaultOptions} height="100%" width="100%" />
          </div>
          <p className="order-msg">You have not placed any order yet</p>
          <button className="browse-veicles-button">Browse vehicles</button>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
