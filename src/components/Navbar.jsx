import { useState, useEffect } from "react";
import axios from "axios";

import logoIcon from "../assets/logo.png";
import searchIcon from "../assets/search-icon.png";
import locationIcon from "../assets/location-home.png";
import downArrow from "../assets/down-arrow.png";
import userIcon from "../assets/user-icon.png";
import hamburgerIcon from "../assets/hamburger-menu.png";

import "./navbar.style.css";

const Navbar = () => {
  const [navIcons, setNavIcons] = useState([]);

  const fetchIcons = async () => {
    const response = await axios.get(
      "https://gaddideals.brokerinvoice.co.in/api/category"
    );
    setNavIcons(response.data.category.docs);
  };

  useEffect(() => {
    fetchIcons();
  }, []);

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

      <nav className="navbar navbar-expand-lg nav-container">
        <div className="container-fluid">
          <div className="logo">
            <a href="/" className="navbar-brand">
              <img src={logoIcon} alt="logo" />
            </a>
          </div>

          <div className="brand-categories">
            {navIcons.slice(0, 4).map((catgeoryIcon, index) => (
              <div
                className={`${
                  index === 0 ? "brand-category active" : "brand-category"
                }`}
                key={catgeoryIcon._id}
              >
                <img
                  src={`https://gaddideals.brokerinvoice.co.in${catgeoryIcon.icon}`}
                  alt={catgeoryIcon.title}
                />
              </div>
            ))}
          </div>

          <div className="hamburger-menu">
            <img src={hamburgerIcon} alt="mobile menu" />
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
