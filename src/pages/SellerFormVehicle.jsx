import { useEffect, useState } from "react";
import axios from "axios";

import Constant from "../constants";
import FilterTags from "../components/FilterTags";

import { FiCheckCircle } from "react-icons/fi";
import "./sellerformvehicle.style.css";

import arrowDown from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  handleCityChange,
  handleStateChange,
  handleBrandChange,
  handleModelChange,
  cityTitle,
  setCityTitle,
  setStateTitle,
  stateTitle,
  setYear,
  yearTitle,
  setFuel,
  fuelTitle,
  setFuelTitle,
  setOwner,
  owner,
  filterCities,
  filterStates,
  filterBrands,
  setBrandId,
  setBrandTitle,
  brandTitle,
  filterModels,
  setModelId,
  setModelTitle,
  modelTitle,
  setYearTitle,
  categoryTractorTitle,
  isYearActive,
  setIsYearActive,
  isFuelActive,
  setIsFuelActive,
  isOwnerActive,
  setIsOwnerActive,
}) => {
  const [yearsArray, setYearsArray] = useState([]);
  const [fuelTypesArray, setFuelTypesArray] = useState([]);

  const [suggestionBox, setSuggestionBox] = useState(false);
  const [modelSuggestionBox, setModelSuggestionBox] = useState(false);
  const [statesSuggestionBox, setStatesSuggestionBox] = useState(false);
  const [citySuggestionBox, setCitySuggestionBox] = useState(false);

  const [seeMoreSuggestion, setSeeMoreSuggestion] = useState(false);

  const [overlayState, setOverlayState] = useState(false);

  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const fetchVehiclesArray = async () => {
    const response = await axios.get(Constant.getUrls.getAllYears);
    setYearsArray(response.data._yrs.docs);
  };

  const fetchFuelTypeArray = async () => {
    const response = await axios.get(Constant.getUrls.getAllFuelTypes);
    setFuelTypesArray(response.data._getFuel.docs);
  };

  const handleOnFocus = (e) => {
    setSuggestionBox(!suggestionBox);
    setOverlayState(true);
  };

  const handleOnModelFocus = (e) => {
    setModelSuggestionBox(!modelSuggestionBox);
    setOverlayState(true);
  };

  const handleOnStateFocus = (e) => {
    setStatesSuggestionBox(!statesSuggestionBox);
    setOverlayState(true);
  };

  const handleOnCityFocus = (e) => {
    setCitySuggestionBox(!citySuggestionBox);
    setOverlayState(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVehiclesArray();
    fetchFuelTypeArray();
  }, []);

  return (
    <>
      <Navbar />
      <div className="seller-form-container ">
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
          {overlayState && (
            <div
              className="overlay"
              onClick={() => {
                setStatesSuggestionBox(false);
                setCitySuggestionBox(false);
                setSuggestionBox(false);
                setModelSuggestionBox(false);
                setOverlayState(false);
              }}
            ></div>
          )}
          <div className="wizard-title">
            <h5>Vehicle Information</h5>
          </div>

          <div className="line"></div>

          <div className="form-details">
            <form>
              <div className="form-controls">
                <label htmlFor="whichstate">Which State</label>

                <div className="state-input">
                  <input
                    type="text"
                    name="whichstate"
                    value={stateTitle && stateTitle}
                    placeholder="Maharashtra"
                    onChange={handleStateChange}
                    onFocus={handleOnStateFocus}
                  />

                  {statesSuggestionBox && (
                    <div className="suggestion">
                      {filterStates.map((state, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setStateTitle(state);
                            setStatesSuggestionBox(false);
                          }}
                        >
                          {state}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="whichcity">Which City</label>

                <div className="city-input">
                  <input
                    type="text"
                    name="whichcity"
                    value={cityTitle && cityTitle}
                    placeholder="Pune"
                    onChange={handleCityChange}
                    onFocus={handleOnCityFocus}
                  />

                  {citySuggestionBox && (
                    <div className="suggestion">
                      {filterCities.map((city, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setCityTitle(city);
                            setCitySuggestionBox(false);
                          }}
                        >
                          {city}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="vehiclebrand">Vehicle Brand</label>

                <div className="brand-input">
                  <input
                    type="text"
                    name="vehiclebrand"
                    value={brandTitle && brandTitle}
                    placeholder="TATA"
                    onChange={handleBrandChange}
                    onFocus={handleOnFocus}
                  />

                  {suggestionBox && (
                    <div className="suggestion">
                      {filterBrands.map((brand) => (
                        <p
                          key={brand._id}
                          onClick={() => {
                            setBrandId(brand._id);
                            setBrandTitle(brand.title);
                            setSuggestionBox(false);
                          }}
                        >
                          {brand.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="vehiclemodel">Vehicle Model</label>
                <div className="model-input">
                  <input
                    type="text"
                    onChange={handleModelChange}
                    value={modelTitle && modelTitle}
                    name="vehiclemodel"
                    onFocus={handleOnModelFocus}
                    placeholder="Intra V30"
                  />

                  {modelSuggestionBox && (
                    <div className="suggestion">
                      {filterModels.map((model) => (
                        <p
                          key={model._id}
                          onClick={() => {
                            setModelId(model._id);
                            setModelTitle(model.name);
                            setModelSuggestionBox(false);
                          }}
                        >
                          {model.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="manufacturing">Manufacturing Year</label>
                <div className="years">
                  {yearsArray.map((years, index) => (
                    <div
                      className={
                        isYearActive === index ? "year active" : "year"
                      }
                      onClick={() => {
                        setYear(years._id);
                        setYearTitle(years.year);
                        setIsYearActive(index);
                        tagsArray.push(years.year);
                      }}
                      key={years._id}
                    >
                      <span>{years.year}</span>
                    </div>
                  ))}

                  <div
                    className="see-more"
                    onClick={() => setSeeMoreSuggestion(!seeMoreSuggestion)}
                  >
                    <span>See More</span>
                    <img
                      src={seeMoreSuggestion ? upArrow : arrowDown}
                      alt="down arrow icon"
                    />
                    {seeMoreSuggestion && (
                      <div className="see-more-years">
                        {yearsArray.map((years, index) => (
                          <p
                            key={years._id}
                            onClick={() => {
                              setYear(years._id);
                              setYearTitle(years.year);
                              setIsYearActive(index);
                              tagsArray.push(years.year);
                            }}
                          >
                            {years.year}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="vehiclebnumber">Vehicle Number</label>
                <input
                  type="text"
                  name="vehiclenumber"
                  value={formData.vehiclenumber}
                  onChange={handleOnChange}
                  placeholder="MH01BH3321"
                />
              </div>

              {categoryTractorTitle === "Tractors" ? (
                <div className="form-controls">
                  <label htmlFor="noofhrs">Number of Hours</label>
                  <input
                    type="number"
                    value={formData.noofhrs}
                    onChange={handleOnChange}
                    placeholder="75 hrs"
                    name="noofhrs"
                  />
                </div>
              ) : (
                <div className="form-controls">
                  <label htmlFor="kmsdriven">Kilometers Driven</label>
                  <input
                    type="number"
                    value={formData.kmsdriven}
                    onChange={handleOnChange}
                    name="kmsdriven"
                    placeholder="10,00,00"
                  />
                </div>
              )}

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
                        setOwner(owners.owner);
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
                        setFuel(fuelType._id);
                        setIsFuelActive(index);
                        setFuelTitle(fuelType.title);
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
      <Footer />
    </>
  );
};

export default SellerFormVehicle;
