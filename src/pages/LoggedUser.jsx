import React, { useRef } from "react";
import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
// import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
// import edit_box from "../assets/edit_box.jpg";
import edit_pen from "../assets/edit.png";
import Constant from "./../constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import init from "../Helpers/WindowToken";
import { set } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import clipboard from "../assets/clipboard.png";
import myVehicleEnqIco from "../assets/myvehicle_enq.png";

import { imgurl } from "./../constants";

function LoggedUser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mob_no, setmob_no] = useState("");
  const [editablename, seteditablename] = useState(true);
  const [editableEmail, seteditableEmail] = useState(true);
  const [editableMob, seteditableMob] = useState(true);
  const [profileImg, setprofileImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [imgstate, setImgstate] = useState(false);
  const [profileimgstate, setprofileimgstate] = useState("");
  const [previousNum, setPriviousNum] = useState("");
  const [navigate, setnavigate] = useState(false);
  const profileInput = useRef();
  const handlerImg = () => {
    profileInput.current.click();
  };
  function logoutAccount() {
    localStorage.clear();
    window.location.href = "/";
  }
  const getDetails = async () => {
    if (init() === "success") {
      await axios.get(Constant.getUrls.getUser).then((res) => {
        setname(res?.data?.user);
        setemail(res?.data?.user);
        setmob_no(res?.data?.user);
        setprofileimgstate(res?.data?.user);
        setPriviousNum(res?.data?.user?.mob_no);
      });
    }
  };
  function handlefile(e) {
    if (e.target.files[0]) {
      let user_token = localStorage.getItem("Token");
      setprofileImg(e.target.files[0]);
      let fd = new FormData();
      fd.append("name", name.name);
      fd.append("email", email.email);
      fd.append("mob_no", mob_no.mob_no);
      fd.append("profile_pic_url", e.target.files[0]);
      axios
        .put(Constant.putAllUrls.putAllUsers, fd, {
          headers: {
            Authorization: ` Bearer ${user_token} `,
          },
        })
        .then((res) => {
          console.log(res?.data?.message);
          if (res?.data?.message === "Updated Successfully") {
            setImgstate(true);
            getDetails();
          }
        })
        .catch((err) => console.log(err));
    }
    console.log(e.target.files[0]);
    console.log(name);
  }
  function handleSumit(e) {
    e.preventDefault();
    let user_token = localStorage.getItem("Token");
    console.log(name.name);
    console.log(email.email);
    console.log(mob_no.mob_no);
    console.log(profileImg);
    let fdi = new FormData();
    fdi.append("name", name.name);
    fdi.append("email", email.email);
    fdi.append("mob_no", mob_no.mob_no);
    fdi.append("profile_pic_url", profileImg);
    // const updatedData = {
    //     name: name.name,
    //     email: email.email,
    //     mob_no: mob_no.mob_no,
    // }
    axios
      .put(Constant.putAllUrls.putAllUsers, fdi, {
        headers: {
          Authorization: ` Bearer ${user_token} `,
        },
      })
      .then(
        toast.success("Saved successfully")
        // (res) => console.log(res)
        // res.data.status==='success'? setnavigate(true):setnavigate(false)
      );
    if (previousNum !== mob_no.mob_no) {
      logoutAccount();
    }
  }
  function setSignup() {
    console.log("otp verified");
    console.warn({ name, email, previousNum: mob_no });
    let payload = { name, email, previousNum: mob_no };
    axios.post(Constant.postUrls.postAllSignups, payload).then((res) => {
      console.log("res", res);
    });
  }
  function onHandleChange(e) {
    if (e.target.name === "name") {
      setname((pre) => {
        return { [e.target.name]: e.target.value };
      });
      setTimeout(() => {
        console.log(name);
      }, 1000);
    }
    if (e.target.name === "email") {
      setemail((pre) => {
        return { [e.target.name]: e.target.value };
      });
      setTimeout(() => {
        console.log(email);
      }, 1000);
    }
    if (e.target.name === "mob_no") {
      console.log(previousNum + "&&&&&");
      setmob_no((pre) => {
        return { [e.target.name]: e.target.value };
      });
      setTimeout(() => {
        console.log(mob_no);
      }, 1000);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getDetails();
    setSignup();
  }, []);
  return (
    <>
      <Navbar />
      <div className="outside-container">
        <div className="profile-container gd_container">
          <div className="left-profile-container">
            <div className="upper-div">
              <p className="hello-text">Hello</p>
              <p className="user-name-left-div">{name?.name} </p>
            </div>
            <div className="options-div">
              <div className="my-vehicle-div">
                <img className="shipping-img" src={shipping} alt=""></img>
                <Link to="/UserVehicles" className="my-vehicle-text">
                  <span>My Vehicle</span>
                </Link>
                <Link to="/UserVehicles">
                  <img className="next-arrow-img" src={next_arrow} alt="" />
                </Link>
              </div>
              <div className="my-order-div">
                <img className="clipboard-img" src={clipboard} alt=""></img>
                <Link to="/UserOrder" className="my-order-text">
                  <span>My Enquiries</span>
                </Link>
                <Link to="/UserOrder">
                  <img className="next-arrow-img" src={next_arrow} alt=""></img>
                </Link>
              </div>
              <div className="my-order-div">
                <img
                  className="clipboard-img"
                  src={myVehicleEnqIco}
                  alt=""
                ></img>
                <Link to="/myvehicleenq" className="my-order-text">
                  <span>My Vehicle Enquiries</span>
                </Link>
                <Link to="/myvehicleenq">
                  <img className="next-arrow-img" src={next_arrow} alt=""></img>
                </Link>
              </div>
              {/* <div className="user-Faq-div">
                <img className="help-img" src={help} alt=""></img>
                <Link to="/UserFaq" className="user-Faq-text">
                  <span>FAQ</span>
                </Link>
                <Link to="/UserFaq">
                  <img className="next-arrow-img" src={next_arrow} alt=""></img>
                </Link>
              </div> */}
              <div className="sign-out-div">
                <img className="logout-img" src={logout} alt=""></img>
                <Link to="/">
                  <span
                    className="sign-out-text"
                    onClick={() => {
                      logoutAccount();
                    }}
                  >
                    Sign out
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="right-profile-container">
            <img
              className="back-to-home-screen"
              src={next_arrow}
              alt=""
              onClick={() => {
                window.location.href = "/";
              }}
            ></img>
            <div className="user-profile-header">
              <h1>Profile</h1>
              <h2>My Profile</h2>
            </div>
            <div className="profile-pic-div">
              <div className="profile-pic-circle">
                {/* <p className="profile-initials">JR</p> */}
                <img
                  className="userProfileImg"
                  src={
                    profileimgstate?.profile_pic_url
                      ? imgurl + profileimgstate?.profile_pic_url
                      : profileImg
                  }
                  alt=""
                ></img>
                {/* console.log(profileImg); */}
              </div>
              <div>
                <input
                  type="file"
                  name="image-upload"
                  ref={profileInput}
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    handlefile(e);
                  }}
                  hidden
                />
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  onClick={handlerImg}
                >
                  <img className="edit-img" src={edit_pen} alt=""></img>
                </button>
              </div>
            </div>
            <form onSubmit={handleSumit}>
              <p className="name-lable">Name</p>

              <div className="user-name-input-div">
                <input
                  readOnly={editablename}
                  value={name?.name}
                  name="name"
                  className="user-name-right-input"
                  onChange={(e) => {
                    onHandleChange(e);
                  }}
                />
                <span
                  onClick={() => {
                    seteditablename(false);
                    // setname("");
                  }}
                  className="user-name-edit"
                >
                  Edit
                </span>
              </div>

              <p className="email-lable">Email</p>

              <div className="user-email-input-div">
                <input
                  readOnly={editableEmail}
                  value={email?.email}
                  name="email"
                  className="user-email-input"
                  onChange={(e) => {
                    onHandleChange(e);
                  }}
                ></input>
                <span
                  onClick={() => {
                    seteditableEmail(false);
                    setemail("");
                  }}
                  className="user-email-edit"
                >
                  Edit
                </span>
              </div>

              <p className="mobile-lable">Mobile Number</p>

              <div className="user-mobile-input-div">
                <input
                  type="number"
                  readOnly={editableMob}
                  value={mob_no?.mob_no}
                  name="mob_no"
                  className="user-mobile-input"
                  onChange={(e) => {
                    onHandleChange(e);
                  }}
                ></input>
                <span
                  onClick={() => {
                    seteditableMob(false);
                    setmob_no("");
                  }}
                  className="user-mobile-edit"
                >
                  Edit
                </span>
              </div>

              {/* <p className="subs-lable">My Subscription</p>
                  <div className="user-subs-input-div">
                    <input readOnly={true} className="user-subs-input"></input>
                    <span className="user-subs-edit">Edit</span>
                  </div> */}
              <button className="save-changes-button" type="submit">
                SAVE CHANGES
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default LoggedUser;
