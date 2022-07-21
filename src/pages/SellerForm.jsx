import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Constant from "../constants";

import SellerFormVehicle from "./SellerFormVehicle";
import SellerFormRegistration from "./SellerFormRegistration";
import SellerVehicleDetail from "./SellerVehicleDetail";
import SellerPreviewDetails from "./SellerPreviewDetails";

import statecities from "../state-cities.json";
import { toast } from "react-toastify";

const SellerForm = () => {
  const { categoryId } = useParams();

  const [saveLoading, setSaveLoading] = useState(false);

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
  const [stateTitle, setStateTitle] = useState("");

  const [citiesArray, setCitiesArray] = useState([]);
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
  const [frontSideImg, setFrontSideImg] = useState();

  const [documentBackSideImg, setDocumentBackSideImg] = useState(false);
  const [backSideImg, setBackSideImg] = useState();

  const [documentFronttyreLeft, setDocumentFronttyreLeft] = useState(false);
  const [fronttyreLeftImg, setFronttyreLeftImg] = useState();

  const [documentFronttyreRight, setDocumentFronttyreRight] = useState(false);
  const [fronttyreRightImg, setFronttyreRightImg] = useState();

  const [documentSidePicLeft, setDocumentSidePicLeft] = useState(false);
  const [sidePicLeft, setSidePicLeft] = useState();

  const [documentSidePicRight, setDocumentSidePicRight] = useState(false);
  const [sidePicRight, setSidePicRight] = useState();

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
    setCategoryTractorTitle(response.data.category.title);
    setCategoryBusTitle(response.data.category.title);
  };

  const fetchBodyTypes = async () => {
    const response = await axios.get(Constant.getUrls.getAllBodyTypes);
    setBodyTypeArray(response.data._getBodyType.docs);
  };

  const fetchStates = () => {
    let statesArr = [];

    statecities.map((state) => {
      if (statesArr.indexOf(state.State) === -1) {
        statesArr.push(state.State);
      }

      return statesArr;
    });

    setStatesArray(statesArr);
  };

  const fetchCities = () => {
    let citiesArr = [];

    if (stateTitle.length > 0) {
      statecities.filter((city) => {
        if (city.State === stateTitle) {
          citiesArr.push(city.City);
        }
        return citiesArr;
      });
    }

    setCitiesArray(citiesArr);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBrands();
    fetchModels();
    fetchCatgory();
    fetchStates();
    fetchCities();
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
    return state.toLowerCase().includes(stateTitle.toLowerCase());
  });

  const filterCities = citiesArray.filter((city) => {
    return city.toLowerCase().includes(cityTitle.toLowerCase());
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
    if (step === 1) {
      if (stateTitle === "") {
        toast.error("State is required");
      } else if (cityTitle === "") {
        toast.error("City is required");
      } else if (brandId === "") {
        toast.error("Vehicle brand is required");
      } else if (modelId === "") {
        toast.error("Vehicle model is required");
      } else if (yearTitle === "") {
        toast.error("Year is required");
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
      if (!documentFrontSideImg) {
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
    fd.append("state", stateTitle);
    fd.append("city", cityTitle);
    fd.append("brand", brandId);
    fd.append("model", modelId);
    fd.append("years", year);
    fd.append("reg_no", formData.vehiclenumber);
    fd.append("km_driven", formData.kmsdriven || 0);
    fd.append("no_of_hrs", formData.noofhrs);
    fd.append("no_of_owner", owner);
    fd.append("fuelType", fuel);
    fd.append("insurance", formData.insurancevalidity);
    fd.append("tax_validity", formData.taxvalidity);
    fd.append("vehicle_permit", permit);
    fd.append("scrap_vehicle", scrap);
    fd.append("no_of_tyre", formData.nooftyres);
    fd.append("horse_power", formData.horsepower);
    fd.append("no_of_seats", formData.noofseats);
    fd.append("tyre_cond", tyreCondition);
    fd.append("selling_price", formData.pricingvehicle);
    fd.append("fitness_certificate", formData.fitnesscertificate);
    fd.append("bodyType", bodyTypeId);
    fd.append("rc_document", rc);
    fd.append("engine_pic", engImage);
    fd.append("front_side_pic", frontSideImg);
    fd.append("back_side_pic", backSideImg);
    fd.append("front_tyre", fronttyreLeftImg);
    fd.append("front_tyre", fronttyreRightImg);
    fd.append("side_pic_vehicle", sidePicLeft);
    fd.append("side_pic_vehicle", sidePicRight);

    const userToken = localStorage.getItem("Token");
    const response = await axios.post(Constant.postUrls.postAllVehicles, fd, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.data.status === "success") {
      toast.success(response.data.message);
      setSaveLoading(false);
    }

    console.log(response.data);
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
            setCityTitle={setCityTitle}
            stateTitle={stateTitle}
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
            brandTitle={brandTitle}
            modelTitle={modelTitle}
            formData={formData}
            yearTitle={yearTitle}
            stateTitle={stateTitle}
            cityTitle={cityTitle}
            bodyTypeTitle={bodyTypeTitle}
            setStep={setStep}
            categoryTractorTitle={categoryTractorTitle}
            caetgoryBusTitle={caetgoryBusTitle}
            saveLoading={saveLoading}
          />
        </>
      );
    default:
      break;
  }
};

export default SellerForm;
