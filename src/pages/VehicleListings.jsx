import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { imgurl } from "../constants";

import "./vehiclelistings.style.css";
// import img1 from "../assets/img-1.jpg";
import searchIcon from "../assets/search.png";
import locationIcon from "../assets/location.png";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import truckHomeImage from "../assets/truck-home.png";

import Constant from "../constants";

import Lottie from "react-lottie";
import lottieAnimation from "../assets/my-vehicles-lottie.json";

import ToggleCategory from "../components/ToggleCategory";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";

import downArrow from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";

const queryString = require("query-string");

const VehicleListings = () => {
  const location = queryString.parse(window.location.search);

  const [categories, setCategories] = useState([]);
  const [vehiclesArray, setVehiclesArray] = useState([]);
  const [vehicleObj, setVehicleObj] = useState({});
  const [bodytypes, setBodyTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelYears, setModelYears] = useState([]);
  const [kmsDriven, setKmsDriven] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [lth, setLTH] = useState(location.kim_driven_sort);
  const [cat, setCat] = useState(location.category);
  const [lthPrice, setLTHPrice] = useState(location.price_sort);
  const [recentlyAdded, setRecentlyAdded] = useState(location.sort);
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState(location.min_price);
  const [maxPrice, setMaxPrice] = useState(location.max_price);
  const [pageNo, setPageNo] = useState(1);
  const [displayFilterTwo, setdisplayFilterTwo] = useState(false);
  const [displayFilterOne, setdisplayFilterOne] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);

    if (searchInput.length > 0) {
      const res = await axios.get(
        `${Constant.getUrls.getAllVehicles}?q=` + searchInput
      );

      setVehiclesArray(res.data.vehicle.docs);
    }
  };

  const handleMin = async (e) => {
    setMinPrice(e.target.value);

    location["min_price"] = e.target.value;
  };

  const handleMax = async (e) => {
    setMaxPrice(e.target.value);

    if (minPrice < e.target.value) {
      location["max_price"] = e.target.value;
      location["min_price"] = minPrice;
      let prevUrl = queryString.stringify(location);
      navigate("?" + prevUrl);
      fetchVehiclesAPI(location);
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllCategories}`);
    if (response) {
      setCategories(response.data.category.docs);
      if (!location.category) {
        setCat(response.data.category.docs[0]._id);
        location.category = response.data.category.docs[0]._id;
        let prevUrl = queryString.stringify(location);
        navigate("?" + prevUrl);
      }
      fetchVehiclesAPI(location);
    }
  };

  const rupee_format = (str) => {
    var x = str;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const fetchVehiclesAPI = async (location) => {
    const apiUrl = queryString.stringify(location);

    const res = await axios.get(
      `${Constant.getUrls.getAllVehicles}?status=approved&${apiUrl}`
    );

    setVehicleObj(res.data.vehicle);
    setVehiclesArray(res.data.vehicle.docs);

    // if (vehicleObj.hasNextPage) {
    //   setPageNo(pageNo + 1);
    //   setVehiclesArray([...vehiclesArray, ...res.data.vehicle.docs]);
    // }
  };

  const fetchBodyTypes = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllBodyTypes}`);
    setBodyTypes(response.data._getBodyType.docs);
  };

  const fetchBrands = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllBrands}`);
    setBrands(response.data.brand.docs);
  };

  const fetchModels = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllModels}`);
    setModels(response.data.model.docs);
  };

  const fetchModelYears = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllYears}`);
    setModelYears(response.data._yrs.docs);
  };

  const fetchKmsDriven = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllKms}`);
    setKmsDriven(response.data._kms.docs);
  };

  const fetchFuelTypes = async () => {
    const response = await axios.get(`${Constant.getUrls.getAllFuelTypes}`);
    setFuelTypes(response.data._getFuel.docs);
  };

  // category
  const handleCat = (id) => {
    window.scrollTo(0, 0);
    setCat(id);
    location["category"] = id;
    let prevUrl = queryString.stringify(location);
    navigate("?" + prevUrl);
    fetchVehiclesAPI(location);
  };

  // Recently Added
  const handleRecentlyAdded = (bool) => {
    setRecentlyAdded(bool);
    location["sort"] = bool;
    let prevUrl = queryString.stringify(location);
    navigate("?" + prevUrl);
    fetchVehiclesAPI(location);
  };

  // Kms Driven
  const handleLowToHighKms = (status) => {
    setLTH(status);
    location["kim_driven_sort"] = status;
    let prevUrl = queryString.stringify(location);
    navigate("?" + prevUrl);
    fetchVehiclesAPI(location);
  };

  // price low to high
  const handleLowToHighPrice = (priceStatus) => {
    setLTHPrice(priceStatus);
    location["price_sort"] = priceStatus;
    let prevUrl = queryString.stringify(location);
    navigate("?" + prevUrl);
    fetchVehiclesAPI(location);
  };

  const isBtChecked = (id) => {
    if (location["bodyType[]"]) {
      if (typeof location["bodyType[]"] === "string") {
        return location["bodyType[]"] === id;
      } else {
        return location["bodyType[]"].includes(id);
      }
    }
  };
  const handleBodyType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["bodyType[]"]) {
      location["bodyType[]"] = id;
      navigate("?" + prevUrl + "&bodyType[]=" + id);
    } else {
      if (typeof location["bodyType[]"] === "string") {
        if (location["bodyType[]"] === id) {
          delete location["bodyType[]"];
        } else {
          location["bodyType[]"] = [location["bodyType[]"], id];
        }
      } else {
        const isBT = location["bodyType[]"].find((bt) => bt === id);
        if (isBT) {
          const idx = location["bodyType[]"].indexOf(id);
          location["bodyType[]"].splice(idx, 1);
        } else {
          location["bodyType[]"].push(id);
        }
      }
    }

    const BTstring = queryString.stringify(location);
    navigate("?" + BTstring);

    fetchVehiclesAPI(location);
  };

  const isBrandChecked = (id) => {
    if (location["brand[]"]) {
      if (typeof location["brand[]"] === "string") {
        return location["brand[]"] === id;
      } else {
        return location["brand[]"].includes(id);
      }
    }
  };
  const handleBrandType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["brand[]"]) {
      location["brand[]"] = id;
      navigate("?" + prevUrl + "&brand[]=" + id);
    } else {
      if (typeof location["brand[]"] === "string") {
        if (location["brand[]"] === id) {
          delete location["brand[]"];
        } else {
          location["brand[]"] = [location["brand[]"], id];
        }
      } else {
        const isBR = location["brand[]"].find((br) => br === id);
        if (isBR) {
          const idx = location["brand[]"].indexOf(id);
          location["brand[]"].splice(idx, 1);
        } else {
          location["brand[]"].push(id);
        }
      }

      const BRstring = queryString.stringify(location);
      navigate("?" + BRstring);

      fetchVehiclesAPI(location);
    }
  };

  const isModelChecked = (id) => {
    if (location["model[]"]) {
      if (typeof location["model[]"] === "string") {
        return location["model[]"] === id;
      } else {
        return location["model[]"].includes(id);
      }
    }
  };
  const handleModelType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["model[]"]) {
      location["model[]"] = id;
      navigate("?" + prevUrl + "&model[]=" + id);
    } else {
      if (typeof location["model[]"] === "string") {
        if (location["model[]"] === id) {
          delete location["model[]"];
        } else {
          location["model[]"] = [location["model[]"], id];
        }
      } else {
        const isMT = location["model[]"].find((mt) => mt === id);
        if (isMT) {
          const idx = location["model[]"].indexOf(id);
          location["model[]"].splice(idx, 1);
        } else {
          location["model[]"].push(id);
        }
      }

      const MTstring = queryString.stringify(location);
      navigate("?" + MTstring);

      fetchVehiclesAPI(location);
    }
  };

  const isManufacturingChecked = (id) => {
    if (location["years[]"]) {
      if (typeof location["years[]"] === "string") {
        return location["years[]"] === id;
      } else {
        return location["years[]"].includes(id);
      }
    }
  };
  const handleManufacturingType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["years[]"]) {
      location["years[]"] = id;
      navigate("?" + prevUrl + "&years[]=" + id);
    } else {
      if (typeof location["years[]"] === "string") {
        if (location["years[]"] === id) {
          delete location["years[]"];
        } else {
          location["years[]"] = [location["years[]"], id];
        }
      } else {
        const isMAT = location["years[]"].find((mat) => mat === id);
        if (isMAT) {
          const idx = location["years[]"].indexOf(id);
          location["years[]"].splice(idx, 1);
        } else {
          location["years[]"].push(id);
        }
      }

      const MATstring = queryString.stringify(location);
      navigate("?" + MATstring);

      fetchVehiclesAPI(location);
    }
  };

  const isKmsChecked = (id) => {
    if (location["km_driven[]"]) {
      if (typeof location["km_driven[]"] === "string") {
        return location["km_driven[]"] === id;
      } else {
        return location["km_driven[]"].includes(id);
      }
    }
  };
  const handleKilometersType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["km_driven[]"]) {
      location["km_driven[]"] = id;
      navigate("?" + prevUrl + "&km_driven[]=" + id);
    } else {
      if (typeof location["km_driven[]"] === "string") {
        if (location["km_driven[]"] === id) {
          delete location["km_driven[]"];
        } else {
          location["km_driven[]"] = [location["km_driven[]"], id];
        }
      } else {
        const isKMS = location["km_driven[]"].find((kms) => kms === id);
        if (isKMS) {
          const idx = location["km_driven[]"].indexOf(id);
          location["km_driven[]"].splice(idx, 1);
        } else {
          location["km_driven[]"].push(id);
        }
      }

      const KMSstring = queryString.stringify(location);
      navigate("?" + KMSstring);

      fetchVehiclesAPI(location);
    }
  };

  const isFuelChecked = (id) => {
    if (location["fuelType[]"]) {
      if (typeof location["fuelType[]"] === "string") {
        return location["fuelType[]"] === id;
      } else {
        return location["fuelType[]"].includes(id);
      }
    }
  };
  const handleFuelType = (id) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["fuelType[]"]) {
      location["fuelType[]"] = id;
      navigate("?" + prevUrl + "&fuelType[]=" + id);
    } else {
      if (typeof location["fuelType[]"] === "string") {
        if (location["fuelType[]"] === id) {
          delete location["fuelType[]"];
        } else {
          location["fuelType[]"] = [location["fuelType[]"], id];
        }
      } else {
        const isFT = location["fuelType[]"].find((ft) => ft === id);
        if (isFT) {
          const idx = location["fuelType[]"].indexOf(id);
          location["fuelType[]"].splice(idx, 1);
        } else {
          location["fuelType[]"].push(id);
        }
      }

      const FTstring = queryString.stringify(location);
      navigate("?" + FTstring);

      fetchVehiclesAPI(location);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategories();
    fetchBodyTypes();
    fetchBrands();
    fetchModels();
    fetchModelYears();
    fetchKmsDriven();
    fetchFuelTypes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="filter-sort-button-div">
        <div
          className="filter-button"
          onClick={() => {
            setdisplayFilterTwo(!displayFilterTwo);
          }}
        >
          <button>Filter</button>

          <img src={displayFilterTwo ? upArrow : downArrow} alt=""></img>
        </div>
        <div
          className="sortBy-button"
          onClick={() => {
            setdisplayFilterOne(!displayFilterOne);
          }}
        >
          <button>Sort By</button>
          <img src={displayFilterOne ? upArrow : downArrow} alt=""></img>
        </div>
      </div>

      {/* filter two in mobile */}
      {displayFilterTwo && (
        <div className="filter-two lg-devices">
          <div className="search-container">
            <img src={searchIcon} alt="search icon" />
            <input
              placeholder="search"
              type="search"
              name="search"
              id="search"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
          <div className="categories-container">
            <h3>Category</h3>
            <div className="four-category-container">
              {categories.map((category) => (
                <div className="category" key={category._id}>
                  <div
                    onClick={() => {
                      handleCat(category._id);
                    }}
                    className="icon-wrapper"
                    style={{
                      border:
                        cat === category._id ? "1px solid #00adef" : "none",
                    }}
                  >
                    <img src={imgurl + category.icon} alt={category.title} />
                  </div>
                  <a rel="noreferrer" href="#dasd">
                    {category.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="line"></div>

          <div className="price-container">
            <h3>Price</h3>
            <div className="min-max-controls">
              <div className="price-input">
                <span>Min Price</span>
                <input
                  type="number"
                  placeholder="₹0"
                  name="minprice"
                  value={minPrice}
                  onChange={handleMin}
                />
              </div>
              <div className="price-input">
                <span>Max Price</span>
                <input
                  type="number"
                  placeholder="₹15,00,000"
                  name="maxprice"
                  value={maxPrice}
                  onChange={handleMax}
                />
              </div>
            </div>
          </div>
          <div className="line"></div>

          <div className="vehicles-stats-container">
            <ToggleCategory categoryTitle="Body Type">
              {bodytypes.map((type) => (
                <div key={type._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleBodyType(type._id)}
                  >
                    {isBtChecked(type._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}

                    <p>{type.title}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>

            <ToggleCategory categoryTitle="Brand">
              {brands.map((brand) => (
                <div key={brand._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleBrandType(brand._id)}
                  >
                    {isBrandChecked(brand._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}
                    <p>{brand.title}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>

            <ToggleCategory categoryTitle="Model">
              {models.map((model) => (
                <div key={model._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleModelType(model._id)}
                  >
                    {isModelChecked(model._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}
                    <p>{model.name}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>

            <ToggleCategory categoryTitle="Manufacturing Year">
              {modelYears.map((modelYear) => (
                <div key={modelYear._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleManufacturingType(modelYear._id)}
                  >
                    {isManufacturingChecked(modelYear._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}
                    <p>{modelYear.year}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>

            <ToggleCategory categoryTitle="Kilometers Driven">
              {kmsDriven.map((kms) => (
                <div key={kms._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleKilometersType(kms._id)}
                  >
                    {isKmsChecked(kms._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}
                    <p>{kms.km_range}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>

            {/* <div className="vehicle-stat">
              <div className="stat-label">
                <a href="#brand">Number of Owners</a>
                <img src={downArrow} alt="down arrow icon" />
              </div>
            </div> */}

            <ToggleCategory categoryTitle="Fuel Type">
              {fuelTypes.map((fuelType) => (
                <div key={fuelType._id} className="list">
                  <div
                    className="list-content"
                    onClick={() => handleFuelType(fuelType._id)}
                  >
                    {isFuelChecked(fuelType._id) ? (
                      <MdOutlineCheckBox color="#050F56" size={25} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        color="#050F56"
                        size={25}
                      />
                    )}
                    <p>{fuelType.title}</p>
                  </div>
                </div>
              ))}
            </ToggleCategory>
          </div>
        </div>
      )}
      {displayFilterOne && (
        //  {/* Filter One for mobile */}
        <div className="filter-one lg-devices"> 
          <div className="filter-container">
            <h3 className="sort-by">Sort By :</h3>
            <div
              className="filter-controls"
              onClick={() => handleRecentlyAdded(!recentlyAdded)}
            >
              {recentlyAdded ? (
                <ImRadioChecked color="#050F56" size={15} />
              ) : (
                <ImRadioUnchecked color="#050F56" size={15} />
              )}
              <span>Recently Added</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="filter-container">
            <h3>Price</h3>
            <div
              className="filter-controls"
              onClick={() => {
                handleLowToHighPrice("low");
              }}
            >
              {lthPrice === "low" ? (
                <ImRadioChecked color="#050F56" size={15} />
              ) : (
                <ImRadioUnchecked color="#050F56" size={15} />
              )}
              <span>Low to High</span>
            </div>
            <div
              className="filter-controls"
              onClick={() => {
                handleLowToHighPrice("high");
              }}
            >
              {lthPrice === "high" ? (
                <ImRadioChecked color="#050F56" size={15} />
              ) : (
                <ImRadioUnchecked color="#050F56" size={15} />
              )}
              <span>High to Low</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="filter-container kmsdriven">
            <h3>Kms Driven</h3>
            <div
              className="filter-controls"
              onClick={() => {
                handleLowToHighKms("low");
              }}
            >
              {lth === "low" ? (
                <ImRadioChecked color="#050F56" size={15} />
              ) : (
                <ImRadioUnchecked color="#050F56" size={15} />
              )}
              <span>Low to High</span>
            </div>
            <div
              className="filter-controls"
              onClick={() => {
                handleLowToHighKms("high");
              }}
            >
              {lth === "high" ? (
                <ImRadioChecked color="#050F56" size={15} />
              ) : (
                <ImRadioUnchecked color="#050F56" size={15} />
              )}
              <span>High to Low</span>
            </div>
          </div>
        </div>
      )}
      <div className="pages-navigation">
        <Link to="/">
          <small>Home</small>
        </Link>
        &nbsp; &#62; &nbsp;
        <small>Vehicle listing</small>
      </div>
      <section className="vehicles-container">
        <aside className="filter-sidebar">
          {/* Filter One */}
          <div className="filter-one">
            <div className="filter-container">
              <h3>Sort By :</h3>
              <div
                className="filter-controls"
                onClick={() => handleRecentlyAdded(!recentlyAdded)}
              >
                {recentlyAdded ? (
                  <ImRadioChecked color="#050F56" size={15} />
                ) : (
                  <ImRadioUnchecked color="#050F56" size={15} />
                )}
                <span>Recently Added</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="filter-container">
              <h3>Price</h3>
              <div
                className="filter-controls"
                onClick={() => {
                  handleLowToHighPrice("low");
                }}
              >
                {lthPrice === "low" ? (
                  <ImRadioChecked color="#050F56" size={15} />
                ) : (
                  <ImRadioUnchecked color="#050F56" size={15} />
                )}
                <span>Low to High</span>
              </div>
              <div
                className="filter-controls"
                onClick={() => {
                  handleLowToHighPrice("high");
                }}
              >
                {lthPrice === "high" ? (
                  <ImRadioChecked color="#050F56" size={15} />
                ) : (
                  <ImRadioUnchecked color="#050F56" size={15} />
                )}
                <span>High to Low</span>
              </div>
            </div>
            <div className="line"></div>
            <div className="filter-container kmsdriven">
              <h3>Kms Driven</h3>
              <div
                className="filter-controls"
                onClick={() => {
                  handleLowToHighKms("low");
                }}
              >
                {lth === "low" ? (
                  <ImRadioChecked color="#050F56" size={15} />
                ) : (
                  <ImRadioUnchecked color="#050F56" size={15} />
                )}
                <span>Low to High</span>
              </div>
              <div
                className="filter-controls"
                onClick={() => {
                  handleLowToHighKms("high");
                }}
              >
                {lth === "high" ? (
                  <ImRadioChecked color="#050F56" size={15} />
                ) : (
                  <ImRadioUnchecked color="#050F56" size={15} />
                )}
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
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <div className="categories-container">
              <h3>Category</h3>

              {categories.map((category) => (
                <div className="category" key={category._id}>
                  <div
                    onClick={() => {
                      handleCat(category._id);
                    }}
                    className="icon-wrapper"
                    style={{
                      border:
                        cat === category._id ? "1px solid #00adef" : "none",
                    }}
                  >
                    <img src={imgurl + category.icon} alt={category.title} />
                  </div>
                  <a rel="noreferrer" href="#dasd">
                    {category.title}
                  </a>
                </div>
              ))}
            </div>
            <div className="line"></div>

            <div className="price-container">
              <h3>Price</h3>
              <div className="min-max-controls">
                <div className="price-input">
                  <span>Min Price</span>
                  <input
                    type="number"
                    placeholder="₹0"
                    name="minprice"
                    value={minPrice}
                    onChange={handleMin}
                  />
                </div>
                <div className="price-input">
                  <span>Max Price</span>
                  <input
                    type="number"
                    placeholder="₹15,00,000"
                    name="maxprice"
                    value={maxPrice}
                    onChange={handleMax}
                  />
                </div>
              </div>
            </div>
            <div className="line"></div>

            <div className="vehicles-stats-container">
              <ToggleCategory categoryTitle="Body Type">
                {bodytypes.map((type) => (
                  <div key={type._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleBodyType(type._id)}
                    >
                      {isBtChecked(type._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}

                      <p>{type.title}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>

              <ToggleCategory categoryTitle="Brand">
                {brands.map((brand) => (
                  <div key={brand._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleBrandType(brand._id)}
                    >
                      {isBrandChecked(brand._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{brand.title}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>

              <ToggleCategory categoryTitle="Model">
                {models.map((model) => (
                  <div key={model._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleModelType(model._id)}
                    >
                      {isModelChecked(model._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{model.name}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>

              <ToggleCategory categoryTitle="Manufacturing Year">
                {modelYears.map((modelYear) => (
                  <div key={modelYear._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleManufacturingType(modelYear._id)}
                    >
                      {isManufacturingChecked(modelYear._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{modelYear.year}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>

              <ToggleCategory categoryTitle="Kilometers Driven">
                {kmsDriven.map((kms) => (
                  <div key={kms._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleKilometersType(kms._id)}
                    >
                      {isKmsChecked(kms._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{kms.km_range}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>

              {/* <div className="vehicle-stat">
                <div className="stat-label">
                  <a href="#brand">Number of Owners</a>
                  <img src={downArrow} alt="down arrow icon" />
                </div>
              </div> */}

              <ToggleCategory categoryTitle="Fuel Type">
                {fuelTypes.map((fuelType) => (
                  <div key={fuelType._id} className="list">
                    <div
                      className="list-content"
                      onClick={() => handleFuelType(fuelType._id)}
                    >
                      {isFuelChecked(fuelType._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{fuelType.title}</p>
                    </div>
                  </div>
                ))}
              </ToggleCategory>
            </div>
          </div>
        </aside>
        {/* Vehicles List */}
        {/* <InfiniteScroll
          dataLength={vehiclesArray.length}
          next={fetchVehiclesAPI}
          hasMore={vehicleObj.hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        > */}
        <div className="vehicles-list-container container m-0 p-0">
          {vehiclesArray.length > 0 ? (
            <>
              {vehiclesArray.map((vehicle) => (
                <div className="vehicle-card " key={vehicle._id}>
                  <Link to={`/vehicledetails/${vehicle._id}`}>
                    <div className="img-wrapper">
                      <img
                        src={`https://gaddideals.brokerinvoice.co.in${vehicle.front_side_pic}`}
                        alt={vehicle.category.title}
                      />
                    </div>
                  </Link>
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
                            ? vehicle.km_driven + " km"
                            : "95,075km"}
                        </span>
                      </div>
                      <div className="stat">
                        <span>
                          {vehicle.no_of_owner !== ""
                            ? vehicle.no_of_owner + " owner"
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
                        Selling Price
                        <span>₹{rupee_format(vehicle.selling_price)}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/vehicledetails/${vehicle._id}`)}
                    >
                      Get Seller Details
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-data">
              <Lottie options={defaultOptions} width="100%" height="500px" />
            </div>
          )}
        </div>
        {/* </InfiniteScroll> */}
        {displayFilterOne &&
      <div  className="mob-menue-overlay" 
        onClick={()=>{setdisplayFilterOne(false);
          }}
         ></div>
        }
        {displayFilterTwo &&
      <div  className="mob-menue-overlay" 
        onClick={()=>{
          setdisplayFilterTwo(false);}}
         ></div>
        }
      </section>
        {/*Truck Image  */}
        <div className="truck-section">
        <div className="image-wrapper">
          <img src={truckHomeImage} alt="truck" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleListings;
