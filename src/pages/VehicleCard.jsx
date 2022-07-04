import truckImg from "../assets/trucks1.png";
import locationIcon from "../assets/location.png";
import "./vehiclecard.styles.css";

const VehicleCard = () => {
  return (
    <div className="vehicle-card-container">
      <div className="card">
        <div className="card-img-wrapper">
          <img src={truckImg} alt="truck" />
        </div>
        <div className="card-info">
          <div className="card-info-header">
            <div className="card-info-title">
              <h1>Tata Intra V30</h1>
              <div className="location">
                <img src={locationIcon} alt="location icon" />
                <span>Mumbai</span>
              </div>
            </div>

            <div className="card-publish-review">
              <div className="review">
                <strong>Under Review</strong>
              </div>
              <span>(Uploaded on Jun 01,2022)</span>
            </div>
          </div>

          <div className="card-price">
            <h3>₹4,65,000</h3>
          </div>

          <div className="card-stats">
            <div className="stat">
              <span>95,075 km</span>
            </div>

            <div className="stat">
              <span>1st Owner</span>
            </div>

            <div className="stat">
              <span>100 hp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
