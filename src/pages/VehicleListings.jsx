import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import statecities from "../state-cities.json";

import { imgurl } from "../constants";
import imgPlaceholder from "../assets/img-not-available.jpg";

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
import { log } from "util";

import { toast } from "react-toastify";

import Modal from "react-awesome-modal";
import OtpInput from "react-otp-input";
import CloseTab from "../assets/close-tab.png";
// import downArrow from "../assets/down-arrow.png";
import Edit from "../assets/edit.png";
import { selectLocation } from "../store/location/location.selector";
import { useSelector } from "react-redux";

const queryString = require("query-string");

const VehicleListings = () => {
  const location = queryString.parse(window.location.search);
  let user_token = localStorage.getItem("Token");
  const [locationDropDown, setlocationDropDown] = useState(false);

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
  const [minPrice, setMinPrice] = useState(location.min_price || 0);
  const [maxPrice, setMaxPrice] = useState(location.max_price || 0);
  const [pageNo, setPageNo] = useState(1);
  const [displayFilterTwo, setdisplayFilterTwo] = useState(false);
  const [displayFilterOne, setdisplayFilterOne] = useState(false);
  const [statesArray, setStatesArray] = useState([]);
  const [citiesArray, setCitiesArray] = useState([]);
  const [selectedStateIds, setselectedStateIds] = useState([]);

  const locationCity = useSelector(selectLocation);

  // for get seller details
  const [userObj, setUserObj] = useState();
  const [BuyerInput, setBuyerInput] = useState(false);
  const [BuyerOtp, setBuyerOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [SellerDetails, setSellerDetails] = useState(false);

  const [userToken, setUserToken] = useState(localStorage.getItem("Token"));

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mob_no, setmob_no] = useState("");
  const [city, setcity] = useState("");
  const [user_type, setuser_type] = useState("");
  const [isTypeActive, setIsTypeActive] = useState();
  const [seller_id, setseller_id] = useState("");
  const [seller, setSeller] = useState("");

  const dealerType = [
    {
      user_type: "Company",
    },
    {
      user_type: "Sole Proprietor",
    },
    {
      user_type: "Agent/Broker/Dealer",
    },
    {
      user_type: "Other",
    },
  ];

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );
  const filterCurentCities = statecities.filter((data) =>
    data.City.toLowerCase().includes(city.toLowerCase())
  );

  function getSingleUserInfo() {
    let user_token = localStorage.getItem("Token");
    axios
      .get(Constant.getUrls.getSingleUser, {
        headers: {
          Authorization: ` Bearer ${user_token} `,
        },
      })
      .then((res) => {
        console.log(res);
        // console.log(res.data.user);
        setcity(res.data.user.city);
        setname(res.data.user.name);
        setemail(res.data.user.email);
        setmob_no(res.data.user.mob_no);
        setBuyerInput(!BuyerInput); //displaying buyer input detail screen
        // saveBuyer();
      });
  }

  function saveBuyer() {
    let payload = {
      seller_id,
      name,
      email,
      mob_no,
      user_type,
      city,
      hash: "ekxpmAB8m9v",
    };
    axios.post(Constant.postUrls.postAllEnquiries, payload).then((result) => {
      if (result.data.status === "failed") {
        toast.error(result.data.message);
      } else {
        if (result.data.status === "success") {
          toast.success(result.data.message);
          // setvisibleOTP(!visibleOTP);
          setmob_no(mob_no);
          setSellerDetails(!SellerDetails);
          // setOtp(otp);
          setBuyerOtp(!BuyerOtp);
          // setCounter(59);
        }
      }
    });
  }

  function verifyOtp() {
    console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
      console.log("result", result);
      if (mob_no === "") {
        // notify();
        toast.error("enter moile number");
      } else if (result.data.status === "failed") {
        toast.error(result.data.message);
      } else {
        if (result.data.status === "success") {
          toast.success(result.data.message);

          // setOtp(result.data.otp);
          // setvisibleOTP(!visibleOTP);
          // setvisible(false);

          // setCounter(59);
        }
      }
    });
  }
  function handleChange(o) {
    setOtp(o);
    // console.log(otp);
  }

  function savePhoneOtp() {
    // console.log("otp verified");
    console.warn({ mob_no, otp });
    let payload = { mob_no, otp };
    axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
      // console.log(res);

      if (res.data.status === "failed") {
        toast.error("incorrect otp");
      } else if (res.data.status === "Success") {
        toast.success(res.data.message);
        // setSellerDetails(!SellerDetails);
        setBuyerOtp(!BuyerOtp);
      }
    });
  }

  function resendotp() {
    console.warn({ mob_no });
    let payload = { mob_no, hash: "ekxpmAB8m9v" };
    axios.post(Constant.postUrls.postAllSignins, payload).then((result) => {
      // console.log("result", result);
      if (mob_no === "") {
        toast.error("enter moile number");
      } else if (result.data.status === "failed") {
        toast.error(result.data.message);
      } else {
        if (result.data.status === "success") {
          toast.success(result.data.message);
          setOtp(result.data.otp);

          // setCounter(59);
        }
      }
    });
  }

  //enquiry otp verify
  function enquiryVerifyOtp() {
    if (ValidateMobileNo()) {
      console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllEnquiryOtps, payload).then((res) => {
        console.log(res);

        if (res.data.status === "failed") {
          toast.error("incorrect otp");
        } else if (res.data.status === "Success") {
          toast.success(res.data.message);
          setBuyerOtp(!BuyerOtp); //closingotp screen
          setSellerDetails(!SellerDetails); //displaing seller details
          // saveBuyer();
        }
      });
    }
  }

  const validateFields = () => {
    let validateName = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let validateEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const cityExists = statecities.find(
      (cityJson) => city.toLowerCase() === cityJson.City.toLowerCase()
    );

    if (!validateName.test(name)) {
      toast.error("please enter valid name");
      return false;
    }
    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    }
    if (!validateEmail.test(email)) {
      toast.error("please enter valid email id");
      return false;
    }
    if (city === "") {
      toast.error("please enter location");
      return false;
    }
    if (user_type === "") {
      toast.error("please select user type");
      return false;
    }
    if (!cityExists) {
      toast.error("Please select a city");
      return false;
    }

    return true;
  };

  //for otp page
  const ValidateMobileNo = () => {
    let validateMobNo =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!validateMobNo.test(mob_no)) {
      toast.error("please enter valid mobile number");
      return false;
    } else {
      return true;
    }
  };

  //signup otp verify
  function signUpVeryfyOtp() {
    if (ValidateMobileNo()) {
      console.log("otp verified");
      console.warn({ mob_no, otp });
      let payload = { mob_no, otp };
      axios.post(Constant.postUrls.postAllOtps, payload).then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data.user.accessToken);
        window.location.href = "/loggeduser";
        // if (res.data.status === "failed") {
        // toast.error("incorrect otp");
        // } else if (res.data.status === "Success") {
        // toast.success(res.data.message);
        // setBuyerOtp(!BuyerOtp); //closingotp screen
        // setSellerDetails(!SellerDetails); //displaing seller details
        // saveBuyer();
        // }
      });
    }
  }
  //for already logged user
  async function LoggedenquiryApi() {
    let user_token = localStorage.getItem("Token");

    if (validateFields()) {
      let payload = {
        vehicleId: seller_id,
        name,
        email,
        mob_no,
        user_type,
        city,
        hash: "ekxpmAB8m9v",
      };
      await axios
        .post(Constant.postUrls.postAllEnquiries, payload, {
          headers: {
            Authorization: ` Bearer ${user_token} `,
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.status === "failed") {
            console.log(result.data);
            toast.error(result.data.message);
          } else {
            if (result.data.status === "success") {
              console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
            }
          }
        });
    }
  }

  //for user visiting for the first time
  async function enquiryApi() {
    let user_token = localStorage.getItem("Token");

    if (validateFields()) {
      let payload = {
        vehicleId: seller_id,
        name,
        email,
        mob_no,
        user_type,
        city,
        hash: "ekxpmAB8m9v",
      };
      await axios
        .post(Constant.postUrls.postAllEnquiries, payload)
        .then((result) => {
          console.log(result.data);
          if (result.data.status === "failed") {
            console.log(result.data);
            // toast.error(result.data.message);
            toast.error("You are already a user");
            toast.error("Please sign in for enquiry");
          } else {
            if (result.data.status === "success") {
              console.log(result.data);
              // toast.success(result.data.message);
              setBuyerInput(!BuyerInput); //closing buyer input screen
              setBuyerOtp(!BuyerOtp); //displaying otp screen
            }
          }
        });
    }
  }

  const navigate = useNavigate();

  // const locationCity = useSelector(selectLocation);

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);

    if (searchInput.length > 0) {
      const res = await axios.get(
        `${Constant.getUrls.getAllVehicles}` +
          `/searchSuggestion?q=` +
          searchInput.toLowerCase()
      );

      setVehiclesArray(res.data.vehicle.docs);
    }
  };

  const handleMin = (e) => {
    setMinPrice(e.target.value);

    location["min_price"] = e.target.value;
  };

  const handleMax = (e) => {
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
        location.category_name =
          response.data.category.docs[0].title.toLowerCase();
        console.log(locationCity);
        // location.city = cityId;
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
    console.log("fetch Vehicle");
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

  // state checked
  const isStateChecked = (id) => {
    if (location["state[]"]) {
      if (typeof location["state[]"] === "string") {
        return location["state[]"] === id;
      } else {
        return location["state[]"].includes(id);
      }
    }
  };
  const handleStateType = (id, stateTitle) => {
    // window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["state[]"]) {
      location["state[]"] = id;
      location["state_title"] = stateTitle;
      navigate("?" + prevUrl + "&state[]=" + id + "&state_title=" + stateTitle);
    } else {
      if (typeof location["state[]"] === "string") {
        if (location["state[]"] === id) {
          delete location["state[]"];
          delete location["state_title"];
        } else {
          location["state[]"] = [location["state[]"], id];
        }
      } else {
        const isFT = location["state[]"].find((st) => st === id);
        if (isFT) {
          const idx = location["state[]"].indexOf(id);
          location["state[]"].splice(idx, 1);
        } else {
          location["state[]"].push(id);
        }
      }
    }

    // manage cities data
    if (selectedStateIds.includes(id)) {
      let index = selectedStateIds.findIndex((_id) => _id === id);
      selectedStateIds.splice(index, 1);
      setselectedStateIds(selectedStateIds);
      fetchCities(selectedStateIds);
      if (selectedStateIds.length === 0) {
        setCitiesArray([]);
        delete location["city[]"];
        delete location["city_title"];
      }
    } else {
      selectedStateIds.push(id);
      setselectedStateIds(selectedStateIds);
      fetchCities(selectedStateIds);
    }

    const STstring = queryString.stringify(location);
    navigate("?" + STstring);
    fetchVehiclesAPI(location);
  };

  // city checked
  const isCityChecked = (id) => {
    if (location["city[]"]) {
      if (typeof location["city[]"] === "string") {
        return location["city[]"] === id;
      } else {
        return location["city[]"].includes(id);
      }
    }
  };
  const handleCityType = (id, cityTitle) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    console.log(location);
    if (!location["city[]"]) {
      location["city[]"] = id;
      location["city_title"] = cityTitle;
      navigate("?" + prevUrl + "&city[]=" + id + "&city_title=" + cityTitle);
    } else {
      if (typeof location["city[]"] === "string") {
        if (location["city[]"] === id) {
          delete location["city[]"];
          delete location["city_title"];
        } else {
          location["city[]"] = [location["city[]"], id];
        }
      } else {
        const isFT = location["city[]"].find((st) => st === id);
        if (isFT) {
          const idx = location["city[]"].indexOf(id);
          location["city[]"].splice(idx, 1);
        } else {
          location["city[]"].push(id);
        }
      }
    }

    const STstring = queryString.stringify(location);
    navigate("?" + STstring);

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
  const handleBodyType = (id, typeTitle) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["bodyType[]"]) {
      location["bodyType[]"] = id;
      location["body_type_title"] = typeTitle;
      navigate(
        "?" + prevUrl + "&bodyType[]=" + id + "&body_type_title=" + typeTitle
      );
    } else {
      if (typeof location["bodyType[]"] === "string") {
        if (location["bodyType[]"] === id) {
          delete location["bodyType[]"];
          delete location["body_type_title"];
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
  const handleBrandType = (id, brandTitle) => {
    window.scrollTo(0, 0);

    const prevUrl = queryString.stringify(location);

    if (!location["brand[]"]) {
      location["brand[]"] = id;
      location["brand_name"] = brandTitle;
      navigate("?" + prevUrl + "&brand[]=" + id + "&brand_name=" + brandTitle);
    } else {
      if (typeof location["brand[]"] === "string") {
        if (location["brand[]"] === id) {
          delete location["brand[]"];
          delete location["brand_name"];
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
  const handleModelType = (id, modelName) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["model[]"]) {
      location["model[]"] = id;
      location["model_name"] = modelName;
      navigate("?" + prevUrl + "&model[]=" + id + "&model_name=" + modelName);
    } else {
      if (typeof location["model[]"] === "string") {
        if (location["model[]"] === id) {
          delete location["model[]"];
          delete location["model_name"];
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
  const handleManufacturingType = (id, yearTitle) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["years[]"]) {
      location["years[]"] = id;
      location["year_title"] = yearTitle;
      navigate("?" + prevUrl + "&years[]=" + id + "&year_title=" + yearTitle);
    } else {
      if (typeof location["years[]"] === "string") {
        if (location["years[]"] === id) {
          delete location["years[]"];
          delete location["year_title"];
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
  const handleFuelType = (id, fuelTitle) => {
    window.scrollTo(0, 0);
    const prevUrl = queryString.stringify(location);

    if (!location["fuelType[]"]) {
      location["fuelType[]"] = id;
      location["fuel_title"] = fuelTitle;
      navigate(
        "?" + prevUrl + "&fuelType[]=" + id + "&fuel_title=" + fuelTitle
      );
    } else {
      if (typeof location["fuelType[]"] === "string") {
        if (location["fuelType[]"] === id) {
          delete location["fuelType[]"];
          delete location["fuel_title"];
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
    const fetchStates = async () => {
      try {
        const res = await axios.get(Constant.getUrls.getAllStates);

        if (res.data) {
          setStatesArray(res.data.getAllStates.docs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.scrollTo(0, 0);
    fetchCategories();
    fetchBodyTypes();
    fetchBrands();
    fetchModels();
    fetchModelYears();
    fetchKmsDriven();
    fetchFuelTypes();
    fetchStates();

    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const fetchCities = async (stateIds) => {
    try {
      if (stateIds.length > 0) {
        let url = Constant.getUrls.getAllCity + "?";
        stateIds.forEach((id) => {
          url += "state[]=" + id + "&";
        });
        const res = await axios.get(url);

        if (res.data) {
          setCitiesArray((prevState) => [...res.data.getAllCities.docs]);
        }
      } else {
        setCitiesArray([]);
      }
    } catch (error) {
      console.log(error);
    }

    // const isCity = citiesArray.find((city) => city?._id === stateId);
    // if (!isStateChecked) {
    //   const idx = citiesArray.indexOf(stateId);
    //   citiesArray.splice(idx, 1);
    // }
  };

  return (
    <>
      <Navbar />
      {BuyerInput && (
        <div>
          <Modal
            visible={BuyerInput}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setBuyerInput(!BuyerInput);
            }}
          >
            <div className="buyer-dtails-container">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setBuyerInput(!BuyerInput);
                }}
              ></img>
              <h1>Please share your contact</h1>
              <input
                className="buyer-name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Name "
              ></input>
              <input
                className="buyer-number"
                placeholder="Phone Number "
                onChange={(e) => {
                  setmob_no(e.target.value);
                }}
                value={mob_no}
                maxLength={10}
              ></input>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email}
                type="email"
                className="buyer-email"
                placeholder="Email"
              ></input>

              <div className="buyer-location">
                <input
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                  value={city}
                  placeholder="Location"
                  onFocus={() => {
                    setlocationDropDown(!locationDropDown);
                  }}
                ></input>
                <img src={downArrow} alt=""></img>
                {locationDropDown && (
                  <div className="sign-up-loaction-drop-down">
                    {filterCurentCities.map((data) => (
                      <p
                        onClick={() => {
                          setcity(data.City);
                          setlocationDropDown(false);
                        }}
                      >
                        {data.City}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="dealerType">
                <div className="dealer-que">What type of user are you?</div>
                <div className="dealerTypeOption">
                  {dealerType.map((user_types, index) => (
                    <div
                      key={index}
                      className={
                        isTypeActive === index ? "dealer active" : "dealer"
                      }
                      onClick={() => {
                        setuser_type(user_types.user_type);
                        setIsTypeActive(index);
                      }}
                    >
                      <span>{user_types.user_type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (user_token) {
                    LoggedenquiryApi();
                  } else {
                    enquiryApi(); //posting data into enquiry api
                  }
                }}
              >
                Get Contact Details
              </button>
            </div>
          </Modal>
        </div>
      )}
      {BuyerOtp && (
        <div>
          <Modal
            visible={BuyerOtp}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setBuyerOtp(!BuyerOtp);
            }}
          >
            <div className="buyer-otp-container">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setBuyerOtp(!BuyerOtp);
                }}
              ></img>
              <div className="instruction-text">
                6 digit code sent to mobile number
              </div>
              <div className="buyer-phone-number-input">
                <input
                  placeholder="Enter Phone Number"
                  onChange={(e) => {
                    setmob_no(e.target.value);
                  }}
                  value={mob_no}
                ></input>
                <img
                  src={Edit}
                  alt=""
                  onClick={() => {
                    setBuyerInput(!BuyerInput);
                    setBuyerOtp(!BuyerOtp);
                  }}
                ></img>
              </div>
              <div className="enter-otp-text">Enter OTP to verify</div>
              <OtpInput
                containerStyle="otpStyle"
                inputStyle="otBoxStyle"
                numInputs={6}
                separator={<span></span>}
                value={otp}
                type="number"
                onChange={(e) => {
                  handleChange(e);
                }}
              ></OtpInput>
              <div
                className="new-otp-text"
                onClick={() => {
                  resendotp();
                }}
              >
                Get new OTP in 25 sec
              </div>
              <button
                onClick={() => {
                  if (userToken) {
                    enquiryVerifyOtp(); //verify enquiry otp
                  } else {
                    enquiryVerifyOtp();
                    signUpVeryfyOtp(); //hitting both api
                  }
                }}
              >
                Verify
              </button>
            </div>
          </Modal>
        </div>
      )}
      {SellerDetails && (
        <div>
          <Modal
            visible={SellerDetails}
            width={matches ? "85%" : "35%"}
            effect="fadeInUp"
            onClickAway={() => {
              setSellerDetails(!SellerDetails);
            }}
          >
            <div className="sellerDetailsContainer">
              <img
                src={CloseTab}
                alt=""
                onClick={() => {
                  setSellerDetails(!SellerDetails);
                }}
              ></img>
              <div className="userProfilePic">
                <img src={imgurl + userObj?.profile_pic_url}></img>
              </div>
              <div className="userName">{userObj?.name}</div>
              <hr></hr>
              <input value={userObj?.name} placeholder="Name"></input>
              <input value={userObj?.mob_no} placeholder="Phone Numer"></input>
              <input value={userObj?.email} placeholder="Email"></input>
            </div>
          </Modal>
        </div>
      )}
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
            <img
              className="close-div-img"
              src={CloseTab}
              alt=""
              onClick={() => {
                setdisplayFilterTwo(!displayFilterTwo);
              }}
            />
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
                  min="0"
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
                  max="1500000"
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
                    onClick={() => handleBodyType(type._id, type.title)}
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
                    onClick={() => handleBrandType(brand._id, brand.title)}
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
                    onClick={() => handleModelType(model._id, model.name)}
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
                    onClick={() =>
                      handleManufacturingType(modelYear._id, modelYear.year)
                    }
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
                  </div>
                  <p>{kms._id}</p>
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
                    onClick={() => handleFuelType(fuelType._id, fuelType.title)}
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
            <ToggleCategory categoryTitle="State">
              <div className="states">
                {statesArray.map((state) => (
                  <div className="list" key={state?._id}>
                    <div
                      className="list-content"
                      onClick={() => {
                        handleStateType(state?._id, state?.title);
                      }}
                    >
                      {isStateChecked(state?._id) ? (
                        <MdOutlineCheckBox color="#050F56" size={25} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          color="#050F56"
                          size={25}
                        />
                      )}
                      <p>{state?.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ToggleCategory>

            {citiesArray.length > 0 && (
              <ToggleCategory categoryTitle="City">
                <div className="city">
                  {citiesArray.length > 0 ? (
                    <>
                      {citiesArray.map((city) => (
                        <div className="list" key={city?._id}>
                          <div
                            className="list-content"
                            onClick={() => {
                              handleCityType(city?._id, city?.title);
                            }}
                          >
                            {isCityChecked(city?._id) ? (
                              <MdOutlineCheckBox color="#050F56" size={25} />
                            ) : (
                              <MdOutlineCheckBoxOutlineBlank
                                color="#050F56"
                                size={25}
                              />
                            )}
                            <p>{city?.title}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    "No Cities Available"
                  )}
                </div>
              </ToggleCategory>
            )}
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
              onClick={() => {
                handleRecentlyAdded(!recentlyAdded);
                setdisplayFilterOne(!displayFilterOne);
              }}
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
                setdisplayFilterOne(!displayFilterOne);
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
                setdisplayFilterOne(!displayFilterOne);
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
                setdisplayFilterOne(!displayFilterOne);
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
                setdisplayFilterOne(!displayFilterOne);
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
      <div className="pages-navigation gd_container">
        <Link to="/">
          <small>Home</small>
        </Link>
        &nbsp; &#62; &nbsp;
        <small>Vehicle listing</small>
      </div>
      <section className="vehicles-container gd_container">
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
                <a
                  href={
                    "/vehiclelistings?category=" +
                    category._id +
                    `&city=${locationCity}`
                  }
                  key={category._id}
                >
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
                    <p rel="noreferrer" href="#dasd">
                      {category.title}
                    </p>
                  </div>
                </a>
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
                      onClick={() => handleBodyType(type._id, type.title)}
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
                      onClick={() => handleBrandType(brand._id, brand.title)}
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
                      onClick={() => handleModelType(model._id, model.name)}
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
                      onClick={() =>
                        handleManufacturingType(modelYear._id, modelYear.year)
                      }
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
                      <p>
                        {kms.lower_range} - {kms.upper_range}
                      </p>
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
                      onClick={() =>
                        handleFuelType(fuelType._id, fuelType.title)
                      }
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

              <ToggleCategory categoryTitle="State">
                <div className="states">
                  {statesArray.map((state) => (
                    <div className="list" key={state?._id}>
                      <div
                        className="list-content"
                        onClick={() => {
                          handleStateType(state?._id, state?.title);
                        }}
                      >
                        {isStateChecked(state?._id) ? (
                          <MdOutlineCheckBox color="#050F56" size={25} />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank
                            color="#050F56"
                            size={25}
                          />
                        )}
                        <p>{state?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ToggleCategory>

              {citiesArray.length > 0 && (
                <ToggleCategory categoryTitle="City">
                  <div className="city">
                    {citiesArray.length > 0 ? (
                      <>
                        {citiesArray.map((city) => (
                          <div className="list" key={city?._id}>
                            <div
                              className="list-content"
                              onClick={() => {
                                handleCityType(city?._id, city?.title);
                              }}
                            >
                              {isCityChecked(city?._id) ? (
                                <MdOutlineCheckBox color="#050F56" size={25} />
                              ) : (
                                <MdOutlineCheckBoxOutlineBlank
                                  color="#050F56"
                                  size={25}
                                />
                              )}
                              <p>{city?.title}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      "No Cities Available"
                    )}
                  </div>
                </ToggleCategory>
              )}
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
                        src={
                          vehicle.front_side_pic
                            ? `${imgurl}${vehicle.front_side_pic}`
                            : ` ${imgPlaceholder}`
                        }
                        alt={vehicle.category.title}
                      />
                    </div>
                  </Link>
                  <div className="vehicle-info">
                    <div className="name">
                      <h3>{vehicle.brand.title}</h3>
                      <div className="location">
                        <img src={locationIcon} alt="location-icon" />
                        <span>{vehicle.city.title}</span>
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
                      onClick={() => {
                        setseller_id(vehicle._id);
                        setUserObj(vehicle.user);
                        if (userToken) {
                          getSingleUserInfo();
                        } else {
                          setBuyerInput(!BuyerInput);
                        }
                      }}
                    >
                      Get Seller Details
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-data">
              <Lottie options={defaultOptions} width="100%" height="100%" />
            </div>
          )}
        </div>
        {/* </InfiniteScroll> */}
        {displayFilterOne && (
          <div
            className="mob-menue-overlay"
            onClick={() => {
              setdisplayFilterOne(false);
            }}
          ></div>
        )}
        {displayFilterTwo && (
          <div
            className="mob-menue-overlay"
            onClick={() => {
              setdisplayFilterTwo(false);
            }}
          ></div>
        )}
      </section>
      {/*Truck Image  */}
      <div className="truck-section gd_container">
        <div className="image-wrapper">
          <img src={truckHomeImage} alt="truck" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleListings;
