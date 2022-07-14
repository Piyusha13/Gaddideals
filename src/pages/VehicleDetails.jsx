import "./vehicledetails.style.css";
import locationIcon from "../assets/location.png";
import calculatorIcon from "../assets/calculator.png";
import shareIcon from "../assets/share.png";
import speedometerIcon from "../assets/speedometer.png";
import ownerIcon from "../assets/owner.png";
import calenderIcon from "../assets/calendar.png";
import tyreIcon from "../assets/tyre.png";
import racingIcon from "../assets/racing.png";
import manualTransmissionIcon from "../assets/gas-station.png";
import similarTruck from "../assets/trucks1.png";
import similarTruckSmall from "../assets/similar-truck-small.png";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { imgurl } from "../constants";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs } from "swiper";

const VehicleDetails = () => {
  const { id } = useParams();
  const [getvehicledetails, setVehicleDetails] = useState({});

  const [imageArray, setImageArray] = useState([]);
  const [imageActive, setImageActive] = useState();

  const getSingleVehicleDetails = async () => {
    const res = await axios.get(
      "https://gaddideals.brokerinvoice.co.in/api/vehicle/vehicleDetails/" + id,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjk1ZTIzOTAyMzkzMDVjYjUzODUzOCIsImlhdCI6MTY1NzEwNjQ0NCwiZXhwIjoxNzQzNTA2NDQ0fQ.Vbw-CK15E1z5LseHM1fR2FGvH5IDU8zXiP08ZPKjSqo",
        },
      }
    );

    setVehicleDetails(res.data.vehicle);
  };

  useEffect(() => {
    getSingleVehicleDetails();
  });

  useEffect(() => {
    const pushfrontBackPic = () => {
      let frontBackArr = [];

      if (getvehicledetails !== null) {
        frontBackArr.push(
          getvehicledetails?.front_side_pic,
          getvehicledetails?.back_side_pic
        );
      }
      setImageArray(frontBackArr);
    };

    pushfrontBackPic();
  }, [getvehicledetails]);

  useEffect(() => {
    const pushImages = () => {
      let frontTyreArr = [];
      if (getvehicledetails?.front_tyre?.length > 0) {
        getvehicledetails?.front_tyre?.forEach((tyre) =>
          frontTyreArr.push(tyre)
        );
      }
      setImageArray((prevState) => [...prevState, ...frontTyreArr]);
    };

    pushImages();
  }, [getvehicledetails]);

  useEffect(() => {
    const pushSideImages = () => {
      let sidePicArr = [];
      if (getvehicledetails?.side_pic_vehicle?.length > 0) {
        getvehicledetails?.side_pic_vehicle?.forEach((sidePic) =>
          sidePicArr.push(sidePic)
        );
      }
      setImageArray((prevState) => [...prevState, ...sidePicArr]);
    };

    pushSideImages();
  }, [getvehicledetails]);

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
      <section className="vehicle-details-container">
        <div className="vehicle-detail">
          <div className="vehicle-thumbnail">
            <Swiper
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Thumbs]}
              className="vehicles-swiper-container"
            >
              {imageArray.map((thumbsImage, index) => (
                <SwiperSlide key={index}>
                  <img src={imgurl + thumbsImage} alt="truck" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="vehicle-info">
            <div className="vehicle-info-wrapper">
              <div className="heading-container">
                <div className="title">
                  <h3>
                    {getvehicledetails.model
                      ? getvehicledetails.model.name
                      : "No model found"}
                  </h3>
                  <div className="truck-location">
                    <img src={locationIcon} alt="location" />
                    <span>{getvehicledetails.city} </span>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="calculator">
                    <img src={calculatorIcon} alt="calculator icon" />
                    <span>EMI Calcualtor</span>
                  </div>
                  <div className="share">
                    <img src={shareIcon} alt="share icon" />
                  </div>
                </div>
              </div>

              <div className="line"></div>

              <div className="vehicle-statistics-container">
                <div className="row-one">
                  <div className="stat">
                    <img src={speedometerIcon} alt="speedometer icon" />
                    <span>{getvehicledetails.km_driven}</span>
                  </div>
                  <div className="stat">
                    <img src={ownerIcon} alt="owner icon" />
                    <span>{getvehicledetails.no_of_owner}</span>
                  </div>
                  <div className="stat calender">
                    <img src={calenderIcon} alt="calender icon" />
                    <span>2022</span>
                  </div>
                </div>

                <div className="row-two">
                  <div className="stat">
                    <img src={tyreIcon} alt="tyre icon" />
                    <span>{getvehicledetails.no_of_tyre}</span>
                  </div>
                  <div className="stat racing">
                    <img src={racingIcon} alt="racing icon" />
                    <span>{getvehicledetails.tyre_cond} </span>
                  </div>
                  <div className="stat manual">
                    <img
                      src={manualTransmissionIcon}
                      alt="manual transmission icon"
                    />
                    <span>
                      {getvehicledetails.fuelType
                        ? getvehicledetails.fuelType.title
                        : "No Title Found"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="line"></div>

              <div className="selling-price-container">
                <p>
                  Selling Price{" "}
                  <span>₹{rupee_format(getvehicledetails?.selling_price)}</span>
                </p>
              </div>
            </div>

            <div className="selling-detail-container">
              <button>Get Seller Details</button>

              <div className="seller-transaction">
                <span>Secured Transaction</span>
                <p>
                  Fully Refundable On Cancellation Or When The Car Gets
                  Delivered To You
                </p>
              </div>

              <p className="para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                libero, dicta ex quod reprehenderit repellat optio nisi
                molestiae, dignissimos mollitia voluptates ipsa perspiciatis!
                Asperiores ipsam, at itaque ipsum esse beatae!
              </p>
            </div>
          </div>
        </div>
        <div className="vehicle-gallery-container">
          <Swiper
            navigation={true}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="vehicles-thumbs-swiper"
          >
            {imageArray.map((thumb, index) => (
              <SwiperSlide key={index}>
                <div className="thumb">
                  <img src={imgurl + thumb} alt="truck thumbnail" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Overview */}
        <div className="overview-container">
          <h3>Overview</h3>

          <div className="row-one">
            <div className="row-content">
              <h6>Number of kilometers</h6>
              <span>{getvehicledetails.km_driven} Km</span>
            </div>
            <div className="row-content">
              <h6>Number of Owners</h6>
              <span>{getvehicledetails.no_of_owner}</span>
            </div>
            <div className="row-content">
              <h6>Manufacturing year</h6>
              <span>2013</span>
            </div>
          </div>

          <div className="line"></div>

          <div className="row-two">
            <div className="row-content">
              <h6>City</h6>
              <span>{getvehicledetails.city}</span>
            </div>
            <div className="row-content">
              <h6>Insurance validity</h6>
              <span>{getvehicledetails.insurance}</span>
            </div>
            <div className="row-content">
              <h6>Tyre condition</h6>
              <span>{getvehicledetails.tyre_cond}</span>
            </div>
          </div>

          <div className="line"></div>

          <div className="row-three">
            <div className="row-content">
              <h6>Transmission</h6>
              <span>
                {" "}
                {getvehicledetails.fuelType
                  ? getvehicledetails.fuelType.title
                  : "No Title Found"}
              </span>
            </div>
            <div className="row-content">
              <h6>Vehicle number</h6>
              <span>{getvehicledetails.reg_no}</span>
            </div>
            <div className="row-content">
              <h6>Tax validity up to</h6>
              <span>{getvehicledetails.tax_validity}</span>
            </div>
          </div>

          <div className="line"></div>

          <div className="row-four">
            <div className="row-content">
              <h6>Number of tyres</h6>
              <span>{getvehicledetails.no_of_tyre}</span>
            </div>
            <div className="row-content">
              <h6>Fitness certificate</h6>
              <span>{getvehicledetails.fitness_certificate}</span>
            </div>
            <div className="row-content"></div>
          </div>
        </div>

        {/* Similar Vehicle */}

        <div className="similar-vehicles-container">
          <div className="title">
            <h1>similar vehicle</h1>
          </div>
          <div className="similar-vehicles-list">
            <div className="similar-vehicle-card">
              <div className="img-wrapper">
                <img src={similarTruck} alt="truck" />
              </div>
              <div className="vehicle-info">
                <div className="title">
                  <h5>Tata Intra V30</h5>
                  <div className="location">
                    <img src={locationIcon} alt="location icon" />
                    <span>Mumbai</span>
                  </div>
                </div>
                <div className="price">
                  <p>
                    Selling Price <span>₹4,65,000</span>
                  </p>
                </div>
                <div className="gallery">
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                </div>
                <button>Get Seller Details</button>
              </div>
            </div>

            <div className="similar-vehicle-card">
              <div className="img-wrapper">
                <img src={similarTruck} alt="truck" />
              </div>
              <div className="vehicle-info">
                <div className="title">
                  <h5>Tata Intra V30</h5>
                  <div className="location">
                    <img src={locationIcon} alt="location icon" />
                    <span>Mumbai</span>
                  </div>
                </div>
                <div className="price">
                  <p>
                    Selling Price <span>₹4,65,000</span>
                  </p>
                </div>
                <div className="gallery">
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                </div>
                <button>Get Seller Details</button>
              </div>
            </div>

            <div className="similar-vehicle-card">
              <div className="img-wrapper">
                <img src={similarTruck} alt="truck" />
              </div>
              <div className="vehicle-info">
                <div className="title">
                  <h5>Tata Intra V30</h5>
                  <div className="location">
                    <img src={locationIcon} alt="location icon" />
                    <span>Mumbai</span>
                  </div>
                </div>
                <div className="price">
                  <p>
                    Selling Price <span>₹4,65,000</span>
                  </p>
                </div>
                <div className="gallery">
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                  <div className="thumb">
                    <img src={similarTruckSmall} alt="truck" />
                  </div>
                </div>
                <button>Get Seller Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default VehicleDetails;
