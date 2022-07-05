
import React, { Component } from "react";
// import SubNavbar from "./SubNavbar";
// import Navbar from "./Navbar";
import "./UserLogin.css";

import shipping from "../assets/shipping.png";
import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
import edit_box from "../assets/edit_box.jpg";
import edit_pen from "../assets/edit.png";
// import UserVehicle from "./UserVehicle.js";
// import LoggedUser from "./LoggedUser";

export default class UserLogin extends Component {
//   state = {
//     visible: false,
//   };

  render() {
    return (
      <div>
        {/* {this.state.visible ? <UserVehicle /> : null} */}
        {/* <SubNavbar /> */}
        {/* <Navbar /> */}
        <div className="user_login_contaier">
          <div className="login_register_container">
            <div className="login_register_div">
              <button className="login_button">Login</button>
              <button className="register_button">Register</button>
            </div>
            <div className="loign_options">
              <p className="loign_options_div">
                <img className="login_logos" src={shipping} alt=" "></img>
                <a href="UserVehicle">
                <span
                //   onClick={() => {
                //     this.setState({ visible: true });
                //   }}
                  className="login_text"
                >
                  My Vehicle
                </span></a>
                <img className="login_arrow" src={next_arrow}></img>
              </p>
              <p className="loign_options_div">
                <img className="login_logos" src={clipboard} alt=" "></img>
                <a href="myorders">
                <span className="login_text">My Order</span></a>
                <img className="login_arrow" src={next_arrow}></img>
              </p>
              <p className="loign_options_div">
                <img className="login_logos" src={help} alt=" "></img>
                <a href="UserFaq">
                <span className="login_text">FAQ</span></a>
                <img className="login_arrow" src={next_arrow}></img>
              </p>
              <p className="loign_options_div">
                <img className="login_logos" src={logout} alt=" "></img>
                <span className="login_text">Sign out</span>
              </p>
            </div>
          </div>
          <div className="profile">
            <p className="profile_heading">
              <span className="profile_underline">Profi</span>le
            </p>
            <p className="profile_initials">
              <span className="profile_initials_text">JR</span>
              {/* <img className="edit_box" src={edit_box} alt=""></img> */}
              <img altr="" className="edit_pen" src={edit_pen}></img>
            </p>
            <div>
              <p className="user_name">Name</p>
              <input
                className="Email_user"
                type="text"
                placeholder="Name"
              ></input>
              <span className="profile_name_edit">Edit</span>
            </div>
            <div>
              {" "}
              <p className="user_email">Email</p>
              <input
                className="Email_user"
                type="email"
                placeholder="Email"
              ></input>
              <span className="profile_name_edit">Edit</span>
            </div>
            <div>
              <p className="user_number">Moile Number</p>
              <input
                className="Email_user"
                type="number"
                placeholder="Mobile No."
              ></input>
              <span className="profile_name_edit">Edit</span>
            </div>

            <div>
              <p className="user_subscription">My Subscription</p>
              <input
                className="Email_user"
                type="text"
                placeholder="None"
              ></input>
              <span className="profile_name_edit">Edit</span>
            </div>
            <button className="Save_changes_button">SAVE CHANGES</button>
          </div>
        </div>
      </div>
    );
  }
}
