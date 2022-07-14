import React from "react";
import "./UserFaq.style.css";
import "./UserOrder.style.css";
import "./UserVehicles.style.css";
import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
// import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
// import edit_box from "../assets/edit_box.jpg";
// import edit_pen from "../assets/edit.png";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/no-order-found.json";
import axios from "axios";
import { useEffect, useState } from "react";
import Constant from "../constants";
import UserFaqToggle from "../components/UserFaqToggle";
import init from "../Helpers/WindowToken";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function UserFaq() {
  const [faqs, setFAQS] = useState([]);
  const [name, setname] = useState("");
  const fetchFaqs = async () => {
    const response = await axios.get(Constant.getUrls.getAllFaqs);
    setFAQS(response.data.faq.docs);
  };
  const getDetails = () => {
    if (init() === "success") {
      axios
        .get("https://gaddideals.brokerinvoice.co.in/api/user")
        .then((res) => {
          setname(res.data.user);
        });
    }
  };
  function logoutAccount() {
    localStorage.clear();
  }
  useEffect(() => {
    fetchFaqs();
    getDetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="outside-container">
        <div className="profile-container">
          <div className="left-profile-container">
            <div className="upper-div">
              <p className="hello-text">Hello</p>
              <Link to="/LoggedUser">
                <p className="user-name-left-div">{name.name}</p>
              </Link>
            </div>
            <div className="options-div">
              <div className="my-vehicle-div">
                <img className="shipping-img" src={shipping} alt=""></img>
                <Link to="/UserVehicles" className="my-vehicle-text">
                  <span> My Vehicle</span>
                </Link>
                <Link to="/UserVehicles">
                  <img className="next-arrow-img" src={next_arrow} alt="" />
                </Link>
              </div>
            </div>
            {/* <div className="my-order-div">
            <img className="clipboard-img" src={clipboard} alt=""></img>
            <Link to="/Userorder" className="my-order-text">
            <span > My Order</span>
            </Link>
            <Link to="/Userorder">
            <img className="next-arrow-img" src={next_arrow} alt=""></img>
            </Link>
          </div> */}
            <div className="user-Faq-div">
              <img className="help-img" src={help} alt=""></img>
              <Link to="/UserFaq" className="user-Faq-text">
                <span>FAQ</span>
              </Link>
              <Link to="/UserFaq">
                <img className="next-arrow-img" src={next_arrow} alt=""></img>
              </Link>
            </div>
            <div className="sign-out-div">
              <img className="logout-img" src={logout} alt=""></img>
              {/* <span className="sign-out-text"> Sign out</span> */}
              <Link to="/">
                <span
                  className="sign-out-text"
                  onClick={() => {
                    logoutAccount();
                  }}
                >
                  {" "}
                  Sign out
                </span>
              </Link>
            </div>

          </div>
          <div className="right-Faq-container">
         <div className="user-Faq-header">
           <h1>FAQ</h1> 
      </div>
      <div className="user-faq-container">
          {faqs.map((faq) => (
            <UserFaqToggle key={faq._id} question={faq.question}>
              <div className="user-answer">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
              </div>
            </UserFaqToggle>
          ))}
        </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default UserFaq;