import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import Constant from "../constants";

import SellerFormVehicle from "./SellerFormVehicle";
import SellerFormRegistration from "./SellerFormRegistration";
import SellerVehicleDetail from "./SellerVehicleDetail";
import SellerPreviewDetails from "./SellerPreviewDetails";

import statecities from "../state-cities.json";
import { toast } from "react-toastify";
import moment from "moment";

const SellerForm = () => {
  const { categoryId } = useParams();

  const [saveLoading, setSaveLoading] = useState(false);
  const [pubLoading, setpubLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [isYearActive, setIsYearActive] = useState();
  const [isFuelActive, setIsFuelActive] = useState();
  const [isOwnerActive, setIsOwnerActive] = useState();

  const [isPermitActive, setIsPermitActive] = useState();
  const [isScrapActive, setIsScrapActive] = useState();
  const [isTyreCondActive, setIsTyreCondActive] = useState();
  const [isBodyTypeActive, setIsBodyTypeActive] = useState();
  const [isRCActive, setIsRCActive] = useState();

  const [categoryTractorTitle, setCategoryTractorTitle] = useState("");
  const [caetgoryBusTitle, setCategoryBusTitle] = useState("");

  const [statesArray, setStatesArray] = useState([]);
  const [stateId, setStateId] = useState("");
  const [stateTitle, setStateTitle] = useState("");

  const [citiesArray, setCitiesArray] = useState([]);
  const [cityId, setCityId] = useState("");
  const [cityTitle, setCityTitle] = useState("");

  const [brandsArray, setBrandsArray] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [brandTitle, setBrandTitle] = useState("");

  const [modelsArray, sestModelsArray] = useState([]);
  const [modelId, setModelId] = useState("");
  const [modelTitle, setModelTitle] = useState("");

  const [bodyTypeArray, setBodyTypeArray] = useState([]);
  const [bodyTypeId, setBodyTypeId] = useState("");
  const [bodyTypeTitle, setBodyTypeTitle] = useState("");

  const [yearTitle, setYearTitle] = useState("");

  const [fuelTitle, setFuelTitle] = useState("");

  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [step, setStep] = useState(1);
  const [owner, setOwner] = useState("");
  const [permit, setPermit] = useState("");
  const [scrap, setScrap] = useState("");
  const [rc, setRC] = useState("");
  const [tyreCondition, setTyreCondition] = useState("");

  const [documentEngImg, setDocumentEngImg] = useState(false);
  const [engImage, setEngImage] = useState();

  const [documentFrontSideImg, setDocumentFrontSideImg] = useState(false);
  const [frontSideImg, setFrontSideImg] = useState("");

  const [documentBackSideImg, setDocumentBackSideImg] = useState(false);
  const [backSideImg, setBackSideImg] = useState("");

  const [documentFronttyreLeft, setDocumentFronttyreLeft] = useState(false);
  const [fronttyreLeftImg, setFronttyreLeftImg] = useState("");

  const [documentFronttyreRight, setDocumentFronttyreRight] = useState(false);
  const [fronttyreRightImg, setFronttyreRightImg] = useState("");

  const [documentSidePicLeft, setDocumentSidePicLeft] = useState(false);
  const [sidePicLeft, setSidePicLeft] = useState("");

  const [documentSidePicRight, setDocumentSidePicRight] = useState(false);
  const [sidePicRight, setSidePicRight] = useState("");

  const [suggestionBox, setSuggestionBox] = useState(false);
  const [statesSuggestionBox, setStatesSuggestionBox] = useState(false);
  const [citySuggestionBox, setCitySuggestionBox] = useState(false);
  const [modelSuggestionBox, setModelSuggestionBox] = useState(false);

  const [editVehicleObj, setEditVehicleObj] = useState();

  const [vehicleID, setVehicleID] = useState("");

  const [formData, setFormData] = useState({
    vehiclenumber: "",
    kmsdriven: "",
    noofhrs: "",
    insurancevalidity: "",
    taxvalidity: "",
    nooftyres: "",
    horsepower: "",
    noofseats: "",
    pricingvehicle: "",
    fitnesscertificate: "",
  });

  formData.year = year;
  formData.fuel = fuel;
  formData.owner = owner;
  formData.permit = permit;
  formData.scrap = scrap;
  formData.tyreCondition = tyreCondition;
  formData.rc = rc;

  const navigate = useNavigate();

  const fetchBrands = async () => {
    const response = await axios.get(Constant.getUrls.getAllBrands);
    setBrandsArray(response.data.brand.docs);
  };

  const fetchModels = async () => {
    const response = await axios.get(Constant.getUrls.getAllModels);
    sestModelsArray(response.data.model.docs);
  };

  const fetchCatgory = async () => {
    const response = await axios.get(
      Constant.getUrls.getAllCategories + `/${categoryId}`
    );
    setCategoryTractorTitle(response?.data?.category?.title);
    setCategoryBusTitle(response?.data?.category?.title);
  };

  const fetchBodyTypes = async () => {
    const response = await axios.get(Constant.getUrls.getAllBodyTypes);
    setBodyTypeArray(response.data._getBodyType.docs);
  };

  const fetchStates = async () => {
    const res = await axios.get(
      Constant.getUrls.getAllStates + "?status=active&sort=true&limit=100"
    );
    if (res.data) {
      setStatesArray(res.data.getAllStates.docs);
    }
  };

  const fetchCities = async (id) => {
    const res = await axios.get(
      Constant.getUrls.getAllCity +
        `?status=active&sort=true&state=${id}&limit=500`
    );
    if (res.data) {
      setCitiesArray(res.data.getAllCities.docs);
    }
  };

  const formatDate = (date) => {
    return moment(date).utc().format("YYYY-MM-DD");
  };

  const fetchSingleVehivleObj = async () => {
    const response = await axios.get(
      Constant.getUrls.getAllVehicles + `/vehicleDetails/${categoryId}`
    );
    setEditVehicleObj(response.data.vehicle);

    if (response?.data?.vehicle) {
      setDisableBtn(false);
      setVehicleID(response?.data?.vehicle?._id);
      setStateTitle(response?.data?.vehicle?.state?.title);
      setCityTitle(response?.data?.vehicle?.city?.title);
      setStateId(response?.data?.vehicle?.state?._id);
      setCityId(response?.data?.vehicle?.city?._id);
      setBrandTitle(response?.data?.vehicle?.brand?.title);
      setBrandId(response?.data?.vehicle?.brand?._id);
      setModelTitle(response?.data?.vehicle?.model?.name);
      setModelId(response?.data?.vehicle?.model?._id);
      setYear(response?.data?.vehicle?.years?._id);
      setYearTitle(response?.data?.vehicle?.years?.year);
      formData.vehiclenumber = response?.data?.vehicle?.reg_no;
      formData.kmsdriven = response?.data?.vehicle?.km_driven;
      setOwner(response?.data?.vehicle?.no_of_owner);
      setFuel(response?.data?.vehicle?.fuelType._id);
      formData.insurancevalidity = formatDate(
        response?.data?.vehicle?.insurance
      );
      formData.taxvalidity = formatDate(response?.data?.vehicle?.tax_validity);
      formData.nooftyres = response?.data?.vehicle?.no_of_tyre;
      formData.noofhrs = response?.data?.vehicle?.no_of_hrs;
      formData.noofseats = response?.data?.vehicle?.no_of_seats;
      formData.horsepower = response?.data?.vehicle?.horse_power;
      setTyreCondition(response?.data?.vehicle?.tyre_cond);
      formData.pricingvehicle = response?.data?.vehicle?.selling_price;
      formData.fitnesscertificate = formatDate(
        response?.data?.vehicle?.fitness_certificate
      );
      setBodyTypeId(response?.data?.vehicle?.bodyType?._id);
      setBodyTypeTitle(response?.data?.vehicle?.bodyType?.title);
      setRC(response?.data?.vehicle?.rc_document);
      setPermit(response?.data?.vehicle?.vehicle_permit);
      setEngImage(response?.data?.vehicle?.engine_pic);
      setFrontSideImg(response?.data?.vehicle?.front_side_pic);
      setBackSideImg(response?.data?.vehicle?.back_side_pic);
      setFronttyreLeftImg(response?.data?.vehicle?.front_tyre[0]);
      setFronttyreRightImg(response?.data?.vehicle?.front_tyre[1]);
      setSidePicLeft(response?.data?.vehicle?.side_pic_vehicle[0]);
      setSidePicRight(response?.data?.vehicle?.side_pic_vehicle[1]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleVehivleObj();
    fetchBrands();
    fetchModels();
    fetchCatgory();
    fetchStates();
    // fetchCities();
    fetchBodyTypes();
  }, [stateTitle]);

  const handleBrandChange = (e) => {
    setBrandTitle(e.target.value);
  };

  const handleModelChange = (e) => {
    setModelTitle(e.target.value);
  };

  const handleStateChange = (e) => {
    setStateTitle(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityTitle(e.target.value);
  };

  const filterStates = statesArray.filter((state) => {
    return state.title.toLowerCase().includes(stateTitle.toLowerCase());
  });

  const filterCities = citiesArray.filter((city) => {
    return city.title.toLowerCase().includes(cityTitle.toLowerCase());
  });

  const filterBrands = brandsArray.filter((brand) => {
    return brand.title.toLowerCase().includes(brandTitle.toLowerCase());
  });

  const filterModels = modelsArray.filter((model) => {
    return model.name.toLowerCase().includes(modelTitle.toLowerCase());
  });

  const permitsArray = [
    {
      permit: "National",
    },
    {
      permit: "State",
    },
    {
      permit: "No",
    },
  ];

  const RCArray = [
    {
      rc: "yes",
    },
    {
      rc: "no",
    },
  ];

  const scrapArray = [
    {
      scrap: "Yes",
    },
    {
      scrap: "No",
    },
  ];

  const tyreConditionArray = [
    {
      condition: "Excellent",
    },
    {
      condition: "Good",
    },
    {
      condition: "Average",
    },
  ];

  const nextStep = () => {
    let validateText = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    let validateModel = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    let validateVehicleNo =
      /^[A-Z|a-z]{2}\s?[0-9]{1,2}\s?[A-Z|a-z]{0,3}\s?[0-9]{4}$/;

    if (step === 1) {
      if (stateTitle === "") {
        toast.error("State is required");
      } else if (stateId === "") {
        setStateTitle("");
        toast.error("Please select state");
      } else if (!validateText.test(stateTitle)) {
        toast.error("Please enter valid state");
      } else if (cityTitle === "") {
        toast.error("City is required");
      } else if (cityId === "") {
        setCityTitle("");
        toast.error("Please select city");
      } else if (!validateText.test(cityTitle)) {
        toast.error("Please enter valid city");
      } else if (brandTitle === "") {
        toast.error("Vehicle brand is required");
      } else if (brandId === "") {
        setBrandTitle("");
        toast.error("Please select brand");
      } else if (!validateText.test(brandTitle)) {
        toast.error("Please enter vaild brand name");
      } else if (modelTitle === "") {
        toast.error("Vehicle model is required");
      } else if (modelId === "") {
        setModelTitle("");
        toast.error("Please select model");
      } else if (!validateModel.test(modelTitle)) {
        toast.error("Please enter vaild model name");
      } else if (yearTitle === "") {
        toast.error("Year is required");
      } else if (!validateVehicleNo.test(formData.vehiclenumber)) {
        toast.error("Please enter vaild vehicle number");
      } else if (formData.vehiclenumber === "") {
        toast.error("Vehicle number is required");
      } else if (fuel === "") {
        toast.error("Fuel type is required");
      } else {
        setStep(step + 1);
      }
    }

    if (step === 2) {
      if (tyreCondition === "") {
        toast.error("Tyre condition is required");
      } else if (formData.pricingvehicle === "") {
        toast.error("Vehicle price is required");
      } else if (rc === "") {
        toast.error("RC is required");
      } else {
        setStep(step + 1);
      }
    }

    if (step === 3) {
      if (frontSideImg.length <= 0) {
        toast.error("Forntside Image is required");
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostData = async () => {
    setSaveLoading(true);
    let fd = new FormData();

    fd.append("category", categoryId);
    fd.append("state", stateId);
    fd.append("city", cityId);
    fd.append("brand", brandId);
    fd.append("model", modelId);
    fd.append("years", year);
    fd.append("reg_no", formData.vehiclenumber);
    if (formData.kmsdriven) {
      fd.append("km_driven", formData.kmsdriven || 0);
    }
    if (formData.noofhrs) {
      fd.append("no_of_hrs", formData.noofhrs || 0);
    }
    if (owner !== "") {
      fd.append("no_of_owner", owner.toLowerCase());
    }
    fd.append("fuelType", fuel);
    if (formData.insurancevalidity) {
      fd.append("insurance", formData.insurancevalidity);
    }
    if (formData.taxvalidity) {
      fd.append("tax_validity", formData.taxvalidity);
    }
    if (permit !== "") {
      fd.append("vehicle_permit", permit.toLowerCase());
    }
    if (formData.nooftyres) {
      fd.append("no_of_tyre", formData.nooftyres || 0);
    }
    if (formData.horsepower) {
      fd.append("horse_power", formData.horsepower || 0);
    }
    if (formData.noofseats) {
      fd.append("no_of_seats", formData.noofseats || 0);
    }
    fd.append("tyre_cond", tyreCondition.toLowerCase());
    fd.append("selling_price", formData.pricingvehicle);
    if (formData.fitnesscertificate) {
      fd.append("fitness_certificate", formData.fitnesscertificate);
    }
    if (bodyTypeId) {
      fd.append("bodyType", bodyTypeId);
    }
    fd.append("rc_document", rc.toLowerCase());
    if (engImage) {
      fd.append("engine_pic", engImage);
    }
    fd.append("front_side_pic", frontSideImg);
    if (backSideImg) {
      fd.append("back_side_pic", backSideImg);
    }
    if (fronttyreLeftImg) {
      fd.append("front_tyre", fronttyreLeftImg);
    }
    if (fronttyreRightImg) {
      fd.append("front_tyre", fronttyreRightImg);
    }
    if (sidePicLeft) {
      fd.append("side_pic_vehicle", sidePicLeft);
    }
    if (sidePicRight) {
      fd.append("side_pic_vehicle", sidePicRight);
    }

    const userToken = localStorage.getItem("Token");
    const response = await axios.post(Constant.postUrls.postAllVehicles, fd, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      setSaveLoading(false);
      navigate("/UserVehicles");
    } else if (response.data.status === "failed") {
      toast.error(response.data.message);
      setSaveLoading(false);
    }

    console.log(response);
  };

  const handleUpdateData = async () => {
    setSaveLoading(true);
    let fd = new FormData();

    fd.append("category", editVehicleObj?.category?._id);
    fd.append("state", stateId);
    fd.append("city", cityId);
    fd.append("brand", brandId);
    fd.append("model", modelId);
    fd.append("years", year);
    fd.append("reg_no", formData.vehiclenumber);
    if (formData.kmsdriven) {
      fd.append("km_driven", formData.kmsdriven || 0);
    }
    if (formData.noofhrs) {
      fd.append("no_of_hrs", formData.noofhrs || 0);
    }
    if (owner !== "") {
      fd.append("no_of_owner", owner.toLowerCase());
    }
    fd.append("fuelType", fuel);
    if (formData.insurancevalidity) {
      fd.append("insurance", formData.insurancevalidity);
    }
    if (formData.taxvalidity) {
      fd.append("tax_validity", formData.taxvalidity);
    }
    if (permit !== "") {
      fd.append("vehicle_permit", permit.toLowerCase());
    }
    if (formData.nooftyres) {
      fd.append("no_of_tyre", formData.nooftyres || 0);
    }
    if (formData.horsepower) {
      fd.append("horse_power", formData.horsepower || 0);
    }
    if (formData.noofseats) {
      fd.append("no_of_seats", formData.noofseats || 0);
    }
    fd.append("tyre_cond", tyreCondition.toLowerCase());
    fd.append("selling_price", formData.pricingvehicle);
    if (formData.fitnesscertificate) {
      fd.append("fitness_certificate", formData.fitnesscertificate);
    }
    if (bodyTypeId) {
      fd.append("bodyType", bodyTypeId);
    }
    fd.append("rc_document", rc.toLowerCase());
    if (engImage) {
      fd.append("engine_pic", engImage);
    }
    fd.append("front_side_pic", frontSideImg);
    if (backSideImg) {
      fd.append("back_side_pic", backSideImg);
    }
    if (fronttyreLeftImg) {
      fd.append("front_tyre", fronttyreLeftImg);
    }
    if (fronttyreRightImg) {
      fd.append("front_tyre", fronttyreRightImg);
    }
    if (sidePicLeft) {
      fd.append("side_pic_vehicle", sidePicLeft);
    }
    if (sidePicRight) {
      fd.append("side_pic_vehicle", sidePicRight);
    }

    const userToken = localStorage.getItem("Token");

    const updateResponse = await axios.put(
      Constant.getUrls.getAllVehicles + `/${editVehicleObj?._id}`,
      fd,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (updateResponse.data.status === "success") {
      toast.success(updateResponse.data.message);
      setSaveLoading(false);
      navigate("/UserVehicles");
    }

    console.log(updateResponse);
  };

  const handlePublishPostData = async () => {
    setpubLoading(true);
    const userToken = localStorage.getItem("Token");

    let fd = new FormData();

    // editVehicleObj?.category?._id || // editVehicleObj?.category?._id ||
    fd.append("category", categoryId);
    fd.append("state", stateId);
    fd.append("city", cityId);
    fd.append("brand", brandId);
    fd.append("model", modelId);
    fd.append("years", year);
    fd.append("reg_no", formData.vehiclenumber);
    if (formData.kmsdriven) {
      fd.append("km_driven", formData.kmsdriven || 0);
    }
    if (formData.noofhrs) {
      fd.append("no_of_hrs", formData.noofhrs || 0);
    }
    if (owner !== "") {
      fd.append("no_of_owner", owner);
    }
    fd.append("fuelType", fuel);
    if (formData.insurancevalidity) {
      fd.append("insurance", formData.insurancevalidity);
    }
    if (formData.taxvalidity) {
      fd.append("tax_validity", formData.taxvalidity);
    }
    if (permit !== "") {
      fd.append("vehicle_permit", permit);
    }
    if (formData.nooftyres) {
      fd.append("no_of_tyre", formData.nooftyres || 0);
    }
    if (formData.horsepower) {
      fd.append("horse_power", formData.horsepower || 0);
    }
    if (formData.noofseats) {
      fd.append("no_of_seats", formData.noofseats || 0);
    }
    fd.append("tyre_cond", tyreCondition);
    fd.append("selling_price", formData.pricingvehicle);
    if (formData.fitnesscertificate) {
      fd.append("fitness_certificate", formData.fitnesscertificate);
    }
    if (bodyTypeId) {
      fd.append("bodyType", bodyTypeId);
    }
    fd.append("rc_document", rc);
    if (engImage) {
      fd.append("engine_pic", engImage);
    }
    fd.append("front_side_pic", frontSideImg);
    if (backSideImg) {
      fd.append("back_side_pic", backSideImg);
    }
    if (fronttyreLeftImg) {
      fd.append("front_tyre", fronttyreLeftImg);
    }
    if (fronttyreRightImg) {
      fd.append("front_tyre", fronttyreRightImg);
    }
    if (sidePicLeft) {
      fd.append("side_pic_vehicle", sidePicLeft);
    }
    if (sidePicRight) {
      fd.append("side_pic_vehicle", sidePicRight);
    }
    fd.append("status", "published");

    const publishResponse = await axios.post(
      Constant.getUrls.getAllVehicles,
      fd,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (publishResponse.data.status === "success") {
      toast.success("Published Successfully");
      setpubLoading(false);
      navigate("/UserVehicles");
    } else if (publishResponse.data.status === "failed") {
      toast.error(publishResponse.data.message);
      setpubLoading(false);
    }

    console.log(publishResponse);
  };

  switch (step) {
    case 1:
      return (
        <>
          <SellerFormVehicle
            nextStep={nextStep}
            filterCities={filterCities}
            filterStates={filterStates}
            filterBrands={filterBrands}
            filterModels={filterModels}
            categoryTractorTitle={categoryTractorTitle}
            fetchCities={fetchCities}
            handleOnChange={handleOnChange}
            setYearTitle={setYearTitle}
            setYear={setYear}
            yearTitle={yearTitle}
            setFuel={setFuel}
            setOwner={setOwner}
            isYearActive={isYearActive}
            setIsYearActive={setIsYearActive}
            isFuelActive={isFuelActive}
            setIsFuelActive={setIsFuelActive}
            isOwnerActive={isOwnerActive}
            setIsOwnerActive={setIsOwnerActive}
            owner={owner}
            cityTitle={cityTitle}
            setCityId={setCityId}
            setCityTitle={setCityTitle}
            stateTitle={stateTitle}
            setStateId={setStateId}
            setStateTitle={setStateTitle}
            setBrandId={setBrandId}
            setBrandTitle={setBrandTitle}
            brandTitle={brandTitle}
            setModelId={setModelId}
            setModelTitle={setModelTitle}
            modelTitle={modelTitle}
            fuelTitle={fuelTitle}
            setFuelTitle={setFuelTitle}
            handleCityChange={handleCityChange}
            handleStateChange={handleStateChange}
            handleBrandChange={handleBrandChange}
            handleModelChange={handleModelChange}
            formData={formData}
            suggestionBox={suggestionBox}
            setSuggestionBox={setSuggestionBox}
            statesSuggestionBox={statesSuggestionBox}
            setStatesSuggestionBox={setStatesSuggestionBox}
            citySuggestionBox={citySuggestionBox}
            setCitySuggestionBox={setCitySuggestionBox}
            modelSuggestionBox={modelSuggestionBox}
            setModelSuggestionBox={setModelSuggestionBox}
          />
        </>
      );
    case 2:
      return (
        <>
          <SellerFormRegistration
            permitsArray={permitsArray}
            scrapArray={scrapArray}
            tyreConditionArray={tyreConditionArray}
            handleOnChange={handleOnChange}
            formData={formData}
            setPermit={setPermit}
            permit={permit}
            yearTitle={yearTitle}
            setYearTitle={setYearTitle}
            owner={owner}
            setOwner={setOwner}
            fuelTitle={fuelTitle}
            setFuelTitle={setFuelTitle}
            categoryTractorTitle={categoryTractorTitle}
            caetgoryBusTitle={caetgoryBusTitle}
            scrap={scrap}
            setScrap={setScrap}
            tyreCondition={tyreCondition}
            setTyreCondition={setTyreCondition}
            nextStep={nextStep}
            prevStep={prevStep}
            isPermitActive={isPermitActive}
            setIsPermitActive={setIsPermitActive}
            isScrapActive={isScrapActive}
            setIsScrapActive={setIsScrapActive}
            isTyreCondActive={isTyreCondActive}
            setIsTyreCondActive={setIsTyreCondActive}
            rc={rc}
            setRC={setRC}
            RCArray={RCArray}
            isRCActive={isRCActive}
            setIsRCActive={setIsRCActive}
            bodyTypeArray={bodyTypeArray}
            isBodyTypeActive={isBodyTypeActive}
            setIsBodyTypeActive={setIsBodyTypeActive}
            bodyTypeTitle={bodyTypeTitle}
            setBodyTypeTitle={setBodyTypeTitle}
            setBodyTypeId={setBodyTypeId}
          />
        </>
      );
    case 3:
      return (
        <>
          <SellerVehicleDetail
            documentEngImg={documentEngImg}
            setDocumentEngImg={setDocumentEngImg}
            engImage={engImage}
            setEngImage={setEngImage}
            documentFrontSideImg={documentFrontSideImg}
            setDocumentFrontSideImg={setDocumentFrontSideImg}
            frontSideImg={frontSideImg}
            setFrontSideImg={setFrontSideImg}
            documentBackSideImg={documentBackSideImg}
            setDocumentBackSideImg={setDocumentBackSideImg}
            backSideImg={backSideImg}
            setBackSideImg={setBackSideImg}
            documentFronttyreLeft={documentFronttyreLeft}
            setDocumentFronttyreLeft={setDocumentFronttyreLeft}
            fronttyreLeftImg={fronttyreLeftImg}
            setFronttyreLeftImg={setFronttyreLeftImg}
            documentFronttyreRight={documentFronttyreRight}
            setDocumentFronttyreRight={setDocumentFronttyreRight}
            fronttyreRightImg={fronttyreRightImg}
            setFronttyreRightImg={setFronttyreRightImg}
            documentSidePicLeft={documentSidePicLeft}
            setDocumentSidePicLeft={setDocumentSidePicLeft}
            sidePicLeft={sidePicLeft}
            setSidePicLeft={setSidePicLeft}
            documentSidePicRight={documentSidePicRight}
            setDocumentSidePicRight={setDocumentSidePicRight}
            sidePicRight={sidePicRight}
            setSidePicRight={setSidePicRight}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </>
      );
    case 4:
      return (
        <>
          <SellerPreviewDetails
            engImage={engImage}
            frontSideImg={frontSideImg}
            backSideImg={backSideImg}
            fronttyreLeftImg={fronttyreLeftImg}
            fronttyreRightImg={fronttyreRightImg}
            sidePicLeft={sidePicLeft}
            sidePicRight={sidePicRight}
            handlePostData={handlePostData}
            handlePublishPostData={handlePublishPostData}
            brandTitle={brandTitle}
            modelTitle={modelTitle}
            formData={formData}
            yearTitle={yearTitle}
            stateTitle={stateTitle}
            cityTitle={cityTitle}
            bodyTypeTitle={bodyTypeTitle}
            saveLoading={saveLoading}
            setStep={setStep}
            vehicleID={vehicleID}
            categoryTractorTitle={categoryTractorTitle}
            caetgoryBusTitle={caetgoryBusTitle}
            pubLoading={pubLoading}
            documentEngImg={documentEngImg}
            handleUpdateData={handleUpdateData}
            documentFrontSideImg={documentFrontSideImg}
            documentBackSideImg={documentBackSideImg}
            documentFronttyreLeft={documentFronttyreLeft}
            documentFronttyreRight={documentFronttyreRight}
            documentSidePicLeft={documentSidePicLeft}
            documentSidePicRight={documentSidePicRight}
            disableBtn={disableBtn}
          />
        </>
      );
    default:
      break;
  }
};

export default SellerForm;
