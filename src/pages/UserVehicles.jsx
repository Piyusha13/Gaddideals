import React from "react";
import truckImg from "../assets/trucks1.png";
import locationIcon from "../assets/location.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import "./UserVehicles.style.css";
import "./vehiclecard.styles.css";
import "./LoggedUser.css";
import shipping from "../assets/shipping.png";
// import clipboard from "../assets/clipboard.png";
import help from "../assets/help.png";
import logout from "../assets/logout.png";
import next_arrow from "../assets/next_arrow.svg";
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
import { imgurl } from "../constants";
import moment from "moment";

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
      axios.get(Constant.getUrls.getSingleUser).then((res) => {
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
  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));
  //for vehicle data

  const getMyVehicleDetails = async () => {
    await axios
      .get(Constant.getUrls.getAllVehicles + "/my_vehicles", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setvehicleData(res.data.getMyVehicle);
        console.log(res.data.getMyVehicle);
        res.data.getMyVehicle.forEach((item, index) => {
          setvehicleName(item.model);
          setdataAvailable(true);
          console.log(item.model);
        });
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
    getMyVehicleDetails();
  }, []);

  const handleVehicleDelete = async (vehicleId) => {
    const response = await axios.delete(
      Constant.getUrls.getAllVehicles + `/delete/${vehicleId}`
    );

    if (response.data.status === "success") {
      getMyVehicleDetails();
      toast.success(response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="outside-container">
        <div className="profile-container container">
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
                <Link to="/Userorder" className="my-order-text">
                  <span>My Enquiries</span>
                </Link>
                <Link to="/Userorder">
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
              <h1>My Vehicles</h1>
            </div>
            {dataAvailable ? (
              <div className="vehicle-card-container">
                {vehicleData?.map((item) => (
                  <div className="card" key={item._id}>
                    <div className="card-wrapper-vehicles">
                      <div className="card-img-wrapper uservehicle">
                        <img src={imgurl + item.front_side_pic} alt="truck" />
                      </div>
                      <div className="card-info">
                        <div className="card-info-header">
                          <div className="card-info-title">
                            <h1>{item.model.name}</h1>
                            <div className="location">
                              <img src={locationIcon} alt="location icon" />
                              {/* fetching city name  */}
                              <span>{item.city.title}</span>
                            </div>
                          </div>

                          <div className="review-container">
                            <div
                              className="review-action"
                              onClick={() =>
                                navigate(`/sellerform/${item._id}`)
                              }
                            >
                              <img src={editIcon} alt="edit icon" />
                            </div>
                            <div
                              className="review-action"
                              onClick={() => handleVehicleDelete(item._id)}
                            >
                              <img src={deleteIcon} alt="delete icon" />
                            </div>
                            <div className="card-publish-review">
                              {item?.inspection_status === "published" ? (
                                <div className="review">
                                  <strong>Under Review</strong>
                                </div>
                              ) : item?.inspection_status === "draft" ? (
                                <div className="review">
                                  <strong>Draft</strong>
                                </div>
                              ) : (
                                <div className="review published">
                                  <strong>Approved</strong>
                                </div>
                              )}

                              <span>
                                (Uploaded&nbsp;
                                {moment(item?.createdAt).format("MMMM Do YYYY")}
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card-price">
                          <h3>₹{item.selling_price} </h3>
                        </div>
                        <div className="card-stats">
                          <div className="stat">
                            <span>{item.km_driven} km</span>
                          </div>
                          <div className="stat">
                            <span>{item.no_of_owner} Owner</span>
                          </div>
                          <div className="stat">
                            <span>{item.no_of_tyre} tyres </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-btns">
                      <button>Book for Inspection</button>
                      {/* <button
                        onClick={() => navigate(`/sellerform/${item._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="del-btn"
                        onClick={() => handleVehicleDelete(item._id)}
                      >
                        Delete
                      </button> */}
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
