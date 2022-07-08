import { useEffect, useState } from "react";
import axios from "axios";

import Constant from "../constants";

import { FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import "./sellerformvehicle.style.css";

import arrowDown from "../assets/down-arrow.png";

let tagsArray = [];

const ownersArray = [
  {
    owner: "First",
  },
  {
    owner: "Second",
  },
  {
    owner: "Third",
  },
  {
    owner: "Fourth",
  },
  {
    owner: "Fifth",
  },
  {
    owner: "Other",
  },
];

const SellerFormVehicle = ({
  nextStep,
  formData,
  handleOnChange,
  setYear,
  setFuel,
  setOwner,
}) => {
  const [yearsArray, setYearsArray] = useState([]);
  const [fuelTypesArray, setFuelTypesArray] = useState([]);

  const [isYearActive, setIsYearActive] = useState();
  const [isFuelActive, setIsFuelActive] = useState();
  const [isOwnerActive, setIsOwnerActive] = useState();

  // const [tagsArray, setTagsArray] = useState([]);

  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleTagsArray = (idx) => {
    const tagId = tagsArray.find((tag, index) => tag === idx);
    if (tagId) {
      const index = tagsArray.indexOf(tagId);
      tagsArray.splice(index, 0);
    }
    console.log(tagId);
  };

  const fetchVehiclesArray = async () => {
    const response = await axios.get(Constant.getUrls.getAllYears);
    setYearsArray(response.data._yrs.docs);
  };

  const fetchFuelTypeArray = async () => {
    const response = await axios.get(Constant.getUrls.getAllFuelTypes);
    setFuelTypesArray(response.data._getFuel.docs);
  };

  useEffect(() => {
    fetchVehiclesArray();
    fetchFuelTypeArray();
  }, []);

  return (
    <div className="seller-form-container">
      <div className="form-routes">
        <div className="route-nav">
          <div className="circle active">
            <FiCheckCircle color="#050F56" />
          </div>
          <a href="#vehicleinfo" className="active">
            Vehicle Information
          </a>
        </div>

        <div className="route-nav">
          <div className="circle"></div>
          <a href="#registration">Registration Detail</a>
        </div>

        <div className="route-nav">
          <div className="circle"></div>
          <a href="#vehicledetail">vehicle Detail</a>
        </div>

        <div className="route-nav">
          <div className="circle"></div>
          <a href="#preview">Preview</a>
        </div>
      </div>

      <div className="form-details-container">
        <div className="filter-tags">
          {tagsArray.map((tag, index) => (
            <div className="tag" key={index}>
              <span>{tag}</span>
              <FaTimes onClick={() => handleTagsArray(index)} />
            </div>
          ))}
        </div>

        <div className="line"></div>

        <div className="form-details">
          <form>
            <div className="form-controls">
              <label htmlFor="whichstate">Which State</label>
              <input
                type="text"
                name="whichstate"
                value={formData.whichstate}
                placeholder="Maharashtra"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-controls">
              <label htmlFor="whichcity">Which City</label>
              <input
                type="text"
                name="whichcity"
                value={formData.whichcity}
                placeholder="Pune"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclebrand">Vehicle Brand</label>
              <input
                type="text"
                name="vehiclebrand"
                value={formData.vehiclebrand}
                placeholder="TATA"
                onChange={handleOnChange}
              />
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclemodel">Vehicle Model</label>
              <input
                type="text"
                onChange={handleOnChange}
                value={formData.vehiclemodel}
                name="vehiclemodel"
                placeholder="Intra V30"
              />
            </div>

            <div className="form-controls">
              <label htmlFor="manufacturing">Manufacturing Year</label>
              <div className="years">
                {yearsArray.map((years, index) => (
                  <div
                    className={isYearActive === index ? "year active" : "year"}
                    onClick={() => {
                      setYear(years.year);
                      setIsYearActive(index);
                      tagsArray.push(years.year);
                    }}
                    key={years._id}
                  >
                    <span>{years.year}</span>
                  </div>
                ))}

                <div className="see-more">
                  <span>See More</span>
                  <img src={arrowDown} alt="down arrow icon" />
                </div>
              </div>
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclebnumber">Vehicle Number</label>
              <input
                type="text"
                name="vehiclenumber"
                value={formData.vehiclebnumber}
                onChange={handleOnChange}
                placeholder="MH01BH3321"
              />
            </div>

            <div className="form-controls">
              <label htmlFor="kmsdriven">Kilometers Driven</label>
              <input
                type="text"
                value={formData.kmsdriven}
                onChange={handleOnChange}
                name="kmsdriven"
                placeholder="10,00,00"
              />
            </div>

            <div className="form-controls">
              <label htmlFor="owners">Number of owners</label>
              <div className="owners">
                {ownersArray.map((owners, index) => (
                  <div
                    key={index}
                    className={
                      isOwnerActive === index ? "owner active" : "owner"
                    }
                    onClick={() => {
                      setOwner("First");
                      setIsOwnerActive(index);
                    }}
                  >
                    <span>{owners.owner}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-controls">
              <label htmlFor="transmission">Fuel Type</label>
              <div className="transmission">
                {fuelTypesArray.map((fuelType, index) => (
                  <div
                    className={
                      isFuelActive === index
                        ? "transmission-type active"
                        : "transmission-type"
                    }
                    onClick={() => {
                      setFuel(fuelType.title);
                      setIsFuelActive(index);
                    }}
                    key={fuelType._id}
                  >
                    <span>{fuelType.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="btn-next">
              <button type="submit" onClick={continueNext}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerFormVehicle;
