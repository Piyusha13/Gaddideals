import logoIcon from "../assets/logo.png";
import busIcon from "../assets/bus-home.png";
import cargoIcon from "../assets/cargo-truck-home.png";
import tractorIcon from "../assets/tractor-home.png";
import craneIcon from "../assets/crane-home.png";
import searchIcon from "../assets/search-icon.png";
import locationIcon from "../assets/location-home.png";
import downArrow from "../assets/down-arrow.png";
import userIcon from "../assets/user-icon.png";

import "./navbar.style.css";

const Navbar = () => {
  return (
    <header className="header-container">
      <div className="sell-buy-container">
        <a href="vehiclelistings">
          <button>Buy used commercial vehicle</button>
        </a>
        <a href="vehicledetails">
          <button className="sell-btn">Sell used commercial vehicle</button>
        </a>
      </div>

      <nav className="navbar navbar-expand-lgnav-container nav-container">
        <div className="container-fluid">
          <div className="logo">
            <a href="/" className="navbar-brand">
              <img src={logoIcon} alt="logo" />
            </a>
          </div>

          <div className="brand-categories">
            <div className="brand-category active">
              <img src={cargoIcon} alt="cargo truck" />
            </div>
            <div className="brand-category">
              <img src={busIcon} alt="bus" />
            </div>
            <div className="brand-category">
              <img src={tractorIcon} alt="tractor" />
            </div>
            <div className="brand-category">
              <img src={craneIcon} alt="crane" />
            </div>
          </div>

          <div className="search-container">
            <img src={searchIcon} alt="search icon" className="search-icon" />
            <input type="search" placeholder="Search" />
          </div>

          <div className="location-container">
            <div className="location">
              <img src={locationIcon} alt="location" />
              <span>Location</span>
            </div>
            <div className="arrow-icon">
              <img src={downArrow} alt="down arrow" />
            </div>
          </div>

          <div className="languages-container">
            <div className="language">
              <span>English</span>
            </div>
            <div className="language-arrow-icon">
              <img src={downArrow} alt="down arrow" />
            </div>
          </div>

          <div className="user">
            <img src={userIcon} alt="user icon" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
