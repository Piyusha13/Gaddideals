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

const currentYear = new Date().getFullYear();

const ownersArray = [
  {
    owner: "first",
  },
  {
    owner: "second",
  },
  {
    owner: "third",
  },
  {
    owner: "fourth",
  },
  {
    owner: "fifth",
  },
  {
    owner: "other",
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
  setCityId,
  setStateId,
  modelTitle,
  setYearTitle,
  categoryTractorTitle,
  isYearActive,
  setIsYearActive,
  isFuelActive,
  setIsFuelActive,
  isOwnerActive,
  setIsOwnerActive,
  suggestionBox,
  setSuggestionBox,
  statesSuggestionBox,
  setStatesSuggestionBox,
  citySuggestionBox,
  setCitySuggestionBox,
  modelSuggestionBox,
  setModelSuggestionBox,
  fetchCities,
  vehicleID,
  year,
  stateId,
}) => {
  const [yearsArray, setYearsArray] = useState([]);
  const [fuelTypesArray, setFuelTypesArray] = useState([]);

  const [seeMoreSuggestion, setSeeMoreSuggestion] = useState(false);

  const [overlayState, setOverlayState] = useState(false);

  const [disableCity, setDisableCity] = useState(true);

  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const fetchVehiclesArray = async () => {
    const response = await axios.get(
      Constant.getUrls.getAllYears +
        "?limit=500&year=true&status=active&flag=web"
    );
    setYearsArray(response.data._yrs.docs);
  };

  const fetchFuelTypeArray = async () => {
    const response = await axios.get(Constant.getUrls.getAllFuelTypes);
    setFuelTypesArray(response.data._getFuel.docs);
  };

  const handleOnFocus = (e) => {
    setOverlayState(true);
    setSuggestionBox(true);
  };

  const handleOnModelFocus = (e) => {
    setOverlayState(true);
    setModelSuggestionBox(true);
  };

  const handleOnStateFocus = (e) => {
    setOverlayState(true);
    setStatesSuggestionBox(true);
    setCitySuggestionBox(false);
  };

  const handleOnCityFocus = (e) => {
    setOverlayState(true);
    setCitySuggestionBox(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVehiclesArray();
    fetchFuelTypeArray();
  }, []);

  const checkYearActive = (yearTitle) => {
    return yearTitle;
  };

  if (vehicleID) {
    const idx = yearsArray.find(
      (year, index) => index === checkYearActive(yearTitle)
    );
    console.log(idx);
    setIsYearActive(idx);
  }

  return (
    <>
      <Navbar />
      <div className="seller-form-container ">
        <div className="form-routes">
          <div className="route-nav">
            <div className="circle active">
              <FiCheckCircle size={200} className="checkCir" color="#050F56" />
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
            <a href="#vehicledetail">Vehicle Detail</a>
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
                <label htmlFor="whichstate">
                  Which State <small style={{ color: "red" }}>*</small>
                </label>

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
                            setStateId(state._id);
                            fetchCities(state?._id);
                            setStateTitle(state.title);
                            setDisableCity((prevDisabled) => !prevDisabled);
                            setStatesSuggestionBox(false);
                          }}
                        >
                          {state.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="whichcity">
                  Which City <small style={{ color: "red" }}>*</small>
                </label>

                <div className="city-input">
                  <input
                    type="text"
                    name="whichcity"
                    value={cityTitle && cityTitle}
                    placeholder="Pune"
                    onChange={handleCityChange}
                    disabled={disableCity}
                    onFocus={handleOnCityFocus}
                  />

                  {citySuggestionBox && (
                    <div className="suggestion">
                      {filterCities.map((city, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            setCityId(city._id);
                            setCityTitle(city.title);
                            setCitySuggestionBox(false);
                          }}
                        >
                          {city.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="vehiclebrand">
                  Vehicle Brand <small style={{ color: "red" }}>*</small>
                </label>

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
                <label htmlFor="vehiclemodel">
                  Vehicle Model <small style={{ color: "red" }}>*</small>
                </label>
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
                <label htmlFor="manufacturing">
                  Manufacturing Year <small style={{ color: "red" }}>*</small>
                </label>
                <div className="years">
                  {isYearActive > 5 && (
                    <div className="year active">
                      <span>{yearTitle}</span>
                    </div>
                  )}
                  {/* {vehicleID && (
                    <>
                      {year ? (
                        ""
                      ) : (
                        <div className="year active">
                          <span>{year === "" ? yearTitle : "No Year"}</span>
                        </div>
                      )}
                    </>
                  )} */}

                  {yearsArray.slice(0, 6).map((years, index) => (
                    <>
                      {years.year <= currentYear && (
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
                      )}
                    </>
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
                        {yearsArray.slice(6).map(
                          (years, index) =>
                            years.year <= currentYear && (
                              <p
                                key={years._id}
                                onClick={() => {
                                  setYear(years._id);
                                  setYearTitle(years.year);
                                  setIsYearActive(index + 6);
                                  tagsArray.push(years.year);
                                }}
                              >
                                {years.year}
                              </p>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-controls">
                <label htmlFor="vehiclebnumber">
                  Vehicle Number <small style={{ color: "red" }}>*</small>
                </label>
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
                  {vehicleID && (
                    <div className="owner active">
                      <span>{owner === undefined ? "No Owner" : owner}</span>
                    </div>
                  )}
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
                <label htmlFor="transmission">
                  Fuel Type <small style={{ color: "red" }}>*</small>
                </label>
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
