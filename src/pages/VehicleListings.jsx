import { useState, useEffect } from "react";

import "./vehiclelistings.style.css";
import img1 from "../assets/img-1.jpg";
import searchIcon from "../assets/search.png";
import locationIcon from "../assets/location.png";
import truckIcon from "../assets/cargo-truck.png";
import tractorIcon from "../assets/tractor.png";
import busIcon from "../assets/bus.png";
import excavotorIcon from "../assets/excavator.png";
import downArrow from "../assets/down-arrow.png";

import Constant from "../constants";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";

const VehicleListings = () => {
  const [vehiclesArray, setVehicesArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchVehicles = async () => {
    const response = await axios.get(
      `${Constant.getUrls.getAllVehicles}?status=published&sort=true`
    );

    setVehicesArray(response.data.vehicle.docs);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  console.log(inputValue);
  return (
    <>
      <Navbar />
      <section className="vehicles-container">
        <aside className="filter-sidebar">
          {/* Filter One */}
          <div className="filter-one">
            <div className="filter-container">
              <h3>Sort By :</h3>
              <div className="filter-controls">
                <input
                  type="radio"
                  value="recentlyAdded"
                  name="recentlyAdded"
                  onChange={handleOnChange}
                />
                <span>Recently Added</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="filter-container">
              <h3>Price</h3>
              <div className="filter-controls">
                <input
                  type="radio"
                  value="pricelowtohigh"
                  name="lowtohigh"
                  onChange={handleOnChange}
                />
                <span>Low to High</span>
              </div>
              <div className="filter-controls">
                <input
                  type="radio"
                  value="pricehightolow"
                  name="hightolow"
                  onChange={handleOnChange}
                />
                <span>High to Low</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="filter-container">
              <h3>Kms Driven</h3>
              <div className="filter-controls">
                <input
                  type="radio"
                  value="kmslowtohigh"
                  name="lowtohigh"
                  onChange={handleOnChange}
                />
                <span>Low to High</span>
              </div>
              <div className="filter-controls">
                <input
                  type="radio"
                  value="kmshightolow"
                  name="hightolow"
                  onChange={handleOnChange}
                />
                <span>High to Low</span>
              </div>
            </div>
          </div>
          {/* Filter Two */}
          <div className="filter-two">
            <div className="search-container">
              <img src={searchIcon} alt="search icon" />
              <input
                placeholder="search"
                type="search"
                name="search"
                id="search"
              />
            </div>
            <div className="categories-container">
              <h3>Category</h3>
              <div className="category">
                <div className="icon-wrapper">
                  <img src={truckIcon} alt="truck icon" />
                </div>
                <a href="#truck">Trucks</a>
              </div>
              <div className="category">
                <div className="icon-wrapper">
                  <img src={tractorIcon} alt="tractor icon" />
                </div>
                <a href="#tractors">Tractors</a>
              </div>
              <div className="category">
                <div className="icon-wrapper">
                  <img src={busIcon} alt="bus icon" />
                </div>
                <a href="#tractors">Buses</a>
              </div>
              <div className="category">
                <div className="icon-wrapper">
                  <img src={excavotorIcon} alt="excavator icon" />
                </div>
                <a href="#tractors">Construction Equipments</a>
              </div>
            </div>
            <div className="line"></div>

            <div className="price-container">
              <h3>Price</h3>
              <div className="min-max-controls">
                <div className="price-input">
                  <span>Min Price</span>
                  <input type="text" placeholder="₹0" name="minprice" />
                </div>
                <div className="price-input">
                  <span>Max Price</span>
                  <input type="text" placeholder="₹15,00,000" name="maxprice" />
                </div>
              </div>
            </div>
            <div className="line"></div>

            <div className="vehicles-stats-container">
              <div className="vehicle-stat">
                <a href="#brand">Brand</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
              <div className="vehicle-stat">
                <a href="#brand">Model</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
              <div className="vehicle-stat">
                <a href="#brand">Model Yeat</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
              <div className="vehicle-stat">
                <a href="#brand">Kilometers Driven</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
              <div className="vehicle-stat">
                <a href="#brand">Number of Owners</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
            </div>
          </div>
        </aside>
        {/* Vehicles List */}
        <div className="vehicles-list-container container m-0 p-0">
          {vehiclesArray.map((vehicle) => (
            <div className="vehicle-card" key={vehicle._id}>
              <div className="img-wrapper">
                <img
                  src={`https://gaddideals.brokerinvoice.co.in${vehicle.front_side_pic}`}
                  alt={vehicle.category.title}
                />
              </div>
              <div className="vehicle-info">
                <div className="name">
                  <h3>{vehicle.brand.title}</h3>
                  <div className="location">
                    <img src={locationIcon} alt="location-icon" />
                    <span>{vehicle.city}</span>
                  </div>
                </div>
                <div className="truck-stats">
                  <div className="stat">
                    <span>
                      {vehicle.km_driven !== ""
                        ? vehicle.km_driven
                        : "95,075km"}
                    </span>
                  </div>
                  <div className="stat">
                    <span>
                      {vehicle.no_of_owner !== ""
                        ? vehicle.no_of_owner
                        : "1st Owner"}
                    </span>
                  </div>
                  <div className="stat">
                    <span>
                      {vehicle.horse_power !== ""
                        ? vehicle.horse_power
                        : "100 hp"}
                    </span>
                  </div>
                </div>
                <div className="selling-price">
                  <p>
                    Selling Price <span>₹{vehicle.selling_price}</span>
                  </p>
                </div>
                <button>Get Seller Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default VehicleListings;
