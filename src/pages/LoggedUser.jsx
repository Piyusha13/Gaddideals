import React from "react";

import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
import edit_box from "../assets/edit_box.jpg";
import edit_pen from "../assets/edit.png";
import Constant from './../constants';
import axios from "axios";
import {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import init from "../Helpers/WindowToken";

 

function LoggedUser() {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mob_no, setmob_no] = useState("");
  const [editablename,seteditablename] =useState(true);
  const [editableEmail,seteditableEmail] =useState(true);
  const [editableMob,seteditableMob] =useState(true);
  const [profileImg,setprofileImg]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  useEffect(()=>{
    getDetails();
    // PrintMyState(name)} , [name] 
  },[]
  );

  // function PrintMyState(state){
    // console.log(state)
//  }
  function logoutAccount(){
    localStorage.clear();

  }
  const getDetails=()=>{
  if(init()==="success"){
    axios.get("https://gaddideals.brokerinvoice.co.in/api/user").then((res)=>{
      // console.log(res.data.user.name);
      // const name=res.data.user.name;
      // const email=res.data.user.email;
      // const mob_no=res.data.user.mob_no;
      setname(res.data.user);
      setemail(res.data.user);
      setmob_no(res.data.user);
      console.log(name);
      console.log(email);
      console.log(mob_no);
      
    })
  }
      
   }
  


  return (
    <div className="outside-container">
    <div className="profile-container">
      <div className="left-profile-container">
        <div className="upper-div">
          <p className="hello-text">Hello</p>
          <p className="user-name-left-div">{name.name} </p>
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
            <Link to="/">
            <span className="sign-out-text" onClick={()=>{ logoutAccount()}}> Sign out</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="right-profile-container">
      <div className="user-profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-pic-div">
          
          <div className="profile-pic-circle">
            {/* <p className="profile-initials">JR</p> */}
            <img className="userProfileImg" src={profileImg} alt=""></img>
          </div>
          <div>
            <input type="file" name="image-upload" accept="image/*" hidden/>
            <img className="edit-img" src={edit_pen} alt=""></img>
          </div>
        </div>
        <p className="name-lable">Name</p>
        <div className="user-name-input-div">
          <input readOnly={editablename} value={name.name}  name="name" className="user-name-right-input"/>
          <span onClick={()=>{ seteditablename(false); setname("");}} onChange={(e) => { setname(e.target.value);
          }}  className="user-name-edit">Edit</span>
        </div>
        <p className="email-lable">Email</p>
        <div className="user-email-input-div">
          <input readOnly={editableEmail} value={email.email} name="email" className="user-email-input"></input>
          <span onClick={()=>{ seteditableEmail(false); setemail("");}} className="user-email-edit">Edit</span>
        </div>
        <p className="mobile-lable">Mobile Number</p>
        <div className="user-mobile-input-div">
          <input type="number" readOnly={editableMob} value={mob_no.mob_no} name="mob_no" className="user-mobile-input"></input>
          <span onClick={()=>{ seteditableMob(false); setmob_no("");}} className="user-mobile-edit">Edit</span>
        </div>
        <p className="subs-lable">My Subscription</p>
        <div className="user-subs-input-div">
          <input readOnly={true} className="user-subs-input"></input>
          <span className="user-subs-edit">Edit</span>
        </div>
        <button className="save-changes-button">SAVE CANGES</button>
      </div>
    </div>
    </div>
  )
}

export default LoggedUser
