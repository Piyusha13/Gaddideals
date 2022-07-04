import "./vehiclelistings.style.css";
import img1 from "../assets/img-1.jpg";
import searchIcon from "../assets/search.png";
import locationIcon from "../assets/location.png";
import truckIcon from "../assets/cargo-truck.png";
import tractorIcon from "../assets/tractor.png";
import busIcon from "../assets/bus.png";
import excavotorIcon from "../assets/excavator.png";
import downArrow from "../assets/down-arrow.png";

import data from "../data.json";
const VehicleListings = () => {
  return (
    <section className="vehicles-container">
      <aside className="filter-sidebar">
        {/* Filter One */}
        <div className="filter-one">
          <div className="filter-container">
            <h3>Sort By :</h3>
            <div className="filter-controls">
              <input type="radio" name="recentlyAdded" />
              <span>Recently Added</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="filter-container">
            <h3>Price</h3>
            <div className="filter-controls">
              <input type="radio" name="lowtohigh" />
              <span>Low to High</span>
            </div>
            <div className="filter-controls">
              <input type="radio" name="hightolow" />
              <span>High to Low</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="filter-container">
            <h3>Kms Driven</h3>
            <div className="filter-controls">
              <input type="radio" name="lowtohigh" />
              <span>Low to High</span>
            </div>
            <div className="filter-controls">
              <input type="radio" name="hightolow" />
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
      <div className="vehicles-list-container">
        {data.map((vehicle, index) => (
          <div className="vehicle-card" key={index}>
            <div className="img-wrapper">
              <img src={img1} alt="truck" />
            </div>
            <div className="vehicle-info">
              <div className="name">
                <h3>{vehicle.name}</h3>
                <div className="location">
                  <img src={locationIcon} alt="location-ico n" />
                  <span>{vehicle.location}</span>
                </div>
              </div>
              <div className="truck-stats">
                <div className="stat">
                  <span>{vehicle.kms}</span>
                </div>
                <div className="stat">
                  <span>{vehicle.owner}</span>
                </div>
                <div className="stat">
                  <span>{vehicle.hp}</span>
                </div>
              </div>
              <div className="selling-price">
                <p>
                  Selling Price <span>{vehicle.sellingprice}</span>
                </p>
              </div>
              <button>Get Seller Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VehicleListings;
