import React from "react";
import truckImg from "../assets/trucks1.png";
import locationIcon from "../assets/location.png";
import "./UserVehicles.style.css";
import "./vehiclecard.styles.css";
import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
// import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
import myVehicleEnqIco from "../assets/myvehicle_enq.png";
// import edit_box from "../assets/edit_box.jpg";
// import edit_pen from "../assets/edit.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "react-lottie";
import animationData from "../assets/my-vehicles-lottie.json";
import axios from "axios";
import { useEffect, useState } from "react";
import init from "../Helpers/WindowToken";
import VehicleCard from "../pages/VehicleCard";
import Constant from "../constants";
import clipboard from "../assets/clipboard.png";
import { toast } from "react-toastify";
import noDataImg from "../assets/no-picture-available-icon-1.jpg";
import { imgurl } from "../constants";

function UserVehicles() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [name, setname] = useState("");
  // for get name
  const getDetails = () => {
    if (init() === "success") {
      axios.get("https://core.gaddideals.com/api/user").then((res) => {
        setname(res.data.user);
      });
    }
  };
  function logoutAccount() {
    localStorage.clear();
  }
  const [dataAvailable, setdataAvailable] = useState(false);
  // const [array,setarray]=useState("");
  const [vehicleData, setvehicleData] = useState([]);
  const [vehicleName, setvehicleName] = useState("");
  const [Seller, setSeller] = useState("");
  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));
  const [vehicleImg, setvehicleImg] = useState("");

  //for vehicle data
  const getMyVehicleDetails = async () => {
    // console.log("otsideeeeeeeeeeeee");
    await axios
      .get("https://core.gaddideals.com/api/enquiries/my_enquiries", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        // console.log("insideeeeeeeeeeeeeeeeeeee");
        // console.log("enquiries response=======" + res);
        setvehicleData(res?.data?.getMyEnquiries);
        console.log(res?.data?.getMyEnquiries);
        res?.data?.getMyEnquiries?.forEach((item, index) => {
          setvehicleName(item?.vehicle_id?.brand);
          setvehicleImg(item?.vehicle_id?.front_side_pic);
          setdataAvailable(true);
          // console.log(item?.vehicle_id?.model);
          setSeller(item?.seller_id);
        });
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
    getMyVehicleDetails();
  }, []);

  // const handleVehicleDelete = async (vehicleId) => {
  //   const response = await axios.delete(
  //     Constant.getUrls.getAllVehicles + `/delete/${vehicleId}`
  //   );

  //   if (response.data.status === "success") {
  //     getMyVehicleDetails();
  //     toast.success(response.data.message);
  //   }
  // };

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

  return (
    <>
      <Navbar />
      <div className="outside-container">
        <div className="profile-container gd_container">
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
              <div className="my-order-div">
                <img className="clipboard-img" src={clipboard} alt=""></img>
                <Link to="" className="my-order-text">
                  <span>My Enquiries</span>
                </Link>
                <Link to="/Userorder">
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
          </div>
          <div className="right-vehicle-container">
            <div className="user-vehicle-header">
              <h1>My Enquiry</h1>
            </div>
            {dataAvailable ? (
              <div className="vehicle-card-container mobile-enquiry-view">
                {vehicleData?.map((item) => (
                  <div className="card" key={item._id}>
                    <div className="card-wrapper-vehicles">
                      <div className="card-img-wrapper mobile-enquiry-img">
                        <img src={imgurl + vehicleImg} alt="truck" />
                      </div>
                      <div className="card-info">
                        <div className="card-info-header">
                          <div className="card-info-title">
                            <h1>{vehicleName.title}</h1>
                            <div className="location">
                              <img src={locationIcon} alt="location icon" />
                              {/* fetching city name  */}
                              <span>{item?.city}</span>
                            </div>
                          </div>
                          {/* <div className="card-publish-review">
                            <div className="review">
                              <strong>Under Review</strong>
                            </div>
                            <span>(Uploaded on Jun 01,2022)</span>
                          </div> */}
                          <div className="card-price mobile-enquiry-price">
                            <h3>
                              ₹{rupee_format(item?.vehicle_id?.selling_price)}{" "}
                            </h3>
                          </div>
                        </div>

                        <div className="seller-details-container">
                          <div className="stat">
                            <span>
                              <span className="text-color-blue">Name - </span>
                              {Seller.name}{" "}
                            </span>
                          </div>
                          <div className="stat">
                            <span>
                              <span className="text-color-blue">
                                Phone Number -{" "}
                              </span>
                              {Seller.mob_no}{" "}
                            </span>
                          </div>
                          <div className="stat">
                            <span>
                              <span className="text-color-blue">Email - </span>
                              {Seller.email}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lottie-div">
                <Lottie options={defaultOptions} height="100%" width="100%" />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default UserVehicles;
