import "./sellerherosection.style.css";

import busIcon from "../assets/bus-2.png";
import tractorIcon from "../assets/tractor-2.png";
import cargoTruckIcon from "../assets/cargo-truck-2.png";
import craneIcon from "../assets/crane.png";

const SellerHeroSection = () => {
  return (
    <div className="hero-section-container">
      <div className="hero-intro">
        <div className="intro-left">
          <h1>Lorem ipsim dolor</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris,
            commodo tortor, enim eget turpis pellentesque egestas. Aliquam a
            fringilla dolor blandit ullamcorper quis. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="intro-right">
          <h2>What vehicle do you want to sell?</h2>
          <div className="categories">
            <div className="row-one">
              <div className="category-item">
                <div className="category">
                  <img src={cargoTruckIcon} alt="cargo truck icon" />
                </div>
                <span>Trucks</span>
              </div>
              <div className="category-item">
                <div className="category">
                  <img src={tractorIcon} alt="tractor icon" />
                </div>
                <span>Tractors</span>
              </div>
            </div>
            <div className="row-two">
              <div className="category-item">
                <div className="category">
                  <img src={busIcon} alt="bus icon" />
                </div>
                <span>Buses</span>
              </div>
              <div className="category-item">
                <div className="category construction">
                  <img src={craneIcon} alt="crane icon" />
                </div>
                <div>
                  <span>Construction Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHeroSection;
