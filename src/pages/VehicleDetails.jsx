import "./vehicledetails.style.css";
import truckThumbnail from "../assets/truck-thumbnail.png";
import locationIcon from "../assets/location.png";
import calculatorIcon from "../assets/calculator.png";
import shareIcon from "../assets/share.png";
import speedometerIcon from "../assets/speedometer.png";
import ownerIcon from "../assets/owner.png";
import calenderIcon from "../assets/calendar.png";
import tyreIcon from "../assets/tyre.png";
import racingIcon from "../assets/racing.png";
import manualTransmissionIcon from "../assets/manual-transmission.png";
import truckThumbSmall from "../assets/truck-thumb-small.png";
import similarTruck from "../assets/trucks1.png";
import similarTruckSmall from "../assets/similar-truck-small.png";

const vehicleDetails = () => {
  return (
    <section className="vehicle-details-container">
      <div className="vehicle-detail">
        <div className="vehicle-thumbnail">
          <img src={truckThumbnail} alt="truck" />
        </div>
        <div className="vehicle-info">
          <div className="vehicle-info-wrapper">
            <div className="heading-container">
              <div className="title">
                <h3>Tata Intra V30</h3>
                <div className="truck-location">
                  <img src={locationIcon} alt="location" />
                  <span>Mumbai</span>
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
                  <span>10,000</span>
                </div>
                <div className="stat">
                  <img src={ownerIcon} alt="owner icon" />
                  <span>Second</span>
                </div>
                <div className="stat calender">
                  <img src={calenderIcon} alt="calender icon" />
                  <span>2001</span>
                </div>
              </div>

              <div className="row-two">
                <div className="stat">
                  <img src={tyreIcon} alt="tyre icon" />
                  <span>4</span>
                </div>
                <div className="stat racing">
                  <img src={racingIcon} alt="racing icon" />
                  <span>Good</span>
                </div>
                <div className="stat manual">
                  <img
                    src={manualTransmissionIcon}
                    alt="manual transmission icon"
                  />
                  <span>Manual</span>
                </div>
              </div>
            </div>

            <div className="line"></div>

            <div className="selling-price-container">
              <p>
                Selling Price <span>₹4,65,000</span>
              </p>
            </div>
          </div>

          <div className="selling-detail-container">
            <button>Get Seller Details</button>

            <div className="seller-transaction">
              <span>Secured Transaction</span>
              <p>
                Fully Refundable On Cancellation Or When The Car Gets Delivered
                To You
              </p>
            </div>

            <p className="para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              libero, dicta ex quod reprehenderit repellat optio nisi molestiae,
              dignissimos mollitia voluptates ipsa perspiciatis! Asperiores
              ipsam, at itaque ipsum esse beatae!
            </p>
          </div>
        </div>
      </div>
      <div className="vehicle-gallery-container">
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
        <div className="thumb">
          <img src={truckThumbSmall} alt="truck thumbnail" />
        </div>
      </div>
      {/* Overview */}
      <div className="overview-container">
        <h3>Overview</h3>

        <div className="row-one">
          <div className="row-content">
            <h6>Number of kilometers</h6>
            <span>10,000 Km</span>
          </div>
          <div className="row-content">
            <h6>Number of Owners</h6>
            <span>Second</span>
          </div>
          <div className="row-content">
            <h6>Manufacturing year</h6>
            <span>2001</span>
          </div>
        </div>

        <div className="line"></div>

        <div className="row-two">
          <div className="row-content">
            <h6>City</h6>
            <span>Pune</span>
          </div>
          <div className="row-content">
            <h6>Insurance validity</h6>
            <span>Yes</span>
          </div>
          <div className="row-content">
            <h6>Tyre condition</h6>
            <span>Good</span>
          </div>
        </div>

        <div className="line"></div>

        <div className="row-three">
          <div className="row-content">
            <h6>Transmission</h6>
            <span>Manual</span>
          </div>
          <div className="row-content">
            <h6>Vehicle number</h6>
            <span>MH01ATXXXX</span>
          </div>
          <div className="row-content">
            <h6>Tax validity up to</h6>
            <span>2002</span>
          </div>
        </div>

        <div className="line"></div>

        <div className="row-four">
          <div className="row-content">
            <h6>Number of tyres</h6>
            <span>4</span>
          </div>
          <div className="row-content">
            <h6>Fitness certificate</h6>
            <span>No</span>
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
              <button>Contact to Customer</button>
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
              <button>Contact to Customer</button>
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
              <button>Contact to Customer</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default vehicleDetails;
