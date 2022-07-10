import { useState, useEffect } from "react";

import axios from "axios";

import Constant from "../constants";

import SellerFormVehicle from "./SellerFormVehicle";
import SellerFormRegistration from "./SellerFormRegistration";
import SellerVehicleDetail from "./SellerVehicleDetail";
import SellerPreviewDetails from "./SellerPreviewDetails";

const SellerForm = () => {
  const [brandsArray, setBrandsArray] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [brandTitle, setBrandTitle] = useState("");

  const [modelsArray, sestModelsArray] = useState([]);
  const [modelId, setModelId] = useState("");
  const [modelTitle, setModelTitle] = useState("");

  const [yearTitle, setYearTitle] = useState("");

  const [vehivleId, setVehicleId] = useState("");

  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [step, setStep] = useState(1);
  const [owner, setOwner] = useState("");
  const [permit, setPermit] = useState("");
  const [scrap, setScrap] = useState("");
  const [tyreCondition, setTyreCondition] = useState("");

  const [documentRCImg, setDocumentRCImg] = useState(false);
  const [rcImage, setRCImage] = useState();

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
    whichstate: "",
    whichcity: "",
    vehiclenumber: "",
    kmsdriven: "",
    insurancevalidity: "",
    taxvalidity: "",
    nooftyres: "",
    pricingvehicle: "",
    fitnesscertificate: "",
  });

  formData.year = year;
  formData.fuel = fuel;
  formData.owner = owner;
  formData.permit = permit;
  formData.scrap = scrap;
  formData.tyreCondition = tyreCondition;

  const fetchBrands = async () => {
    const response = await axios.get(Constant.getUrls.getAllBrands);
    setBrandsArray(response.data.brand.docs);
  };

  const fetchModels = async () => {
    const response = await axios.get(Constant.getUrls.getAllModels);
    sestModelsArray(response.data.model.docs);
  };

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  const filterBrands = brandsArray.filter((brand) => {
    return brand.title.toLowerCase().includes(brandTitle.toLowerCase());
  });

  const filterModels = modelsArray.filter((model) => {
    return model.name.toLowerCase().includes(modelTitle.toLowerCase());
  });

  const handleBrandChange = (e) => {
    setBrandTitle(e.target.value);
  };

  const handleModelChange = (e) => {
    setModelTitle(e.target.value);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostData = async () => {
    let fd = new FormData();

    fd.append("category", "62a981c7a81db2038300ae60");
    fd.append("state", formData.whichstate);
    fd.append("city", formData.whichcity);
    fd.append("brand", brandId);
    fd.append("model", modelId);
    fd.append("years", year);
    fd.append("reg_no", formData.vehiclenumber);
    fd.append("km_driven", formData.kmsdriven);
    fd.append("no_of_owner", owner);
    fd.append("fuelType", fuel);
    fd.append("insurance", formData.insurancevalidity);
    fd.append("tax_validity", formData.taxvalidity);
    fd.append("vehicle_permit", permit);
    fd.append("scrap_vehicle", scrap);
    fd.append("no_of_tyre", formData.nooftyres);
    fd.append("tyre_cond", tyreCondition);
    fd.append("selling_price", formData.pricingvehicle);
    fd.append("fitness_certificate", formData.fitnesscertificate);
    fd.append("rc_document", rcImage);
    fd.append("engine_pic", engImage);
    fd.append("front_side_pic", frontSideImg);
    fd.append("back_side_pic", backSideImg);
    fd.append("front_tyre", fronttyreLeftImg);
    fd.append("front_tyre", fronttyreRightImg);
    fd.append("side_pic_vehicle", sidePicLeft, sidePicRight);
    fd.append("side_pic_vehicle", sidePicRight);

    // let payload = {
    //   category: "62a981c7a81db2038300ae60",
    //   state: formData.whichstate,
    //   city: formData.whichcity,
    //   brand: formData.vehiclebrand,
    //   model: formData.vehiclemodel,
    //   years: year,
    //   reg_no: formData.vehiclenumber,
    //   km_driven: formData.kmsdriven,
    //   no_of_owner: owner,
    //   fuelType: fuel,
    //   insurance: formData.insurancevalidity,
    //   tax_validity: formData.taxvalidity,
    //   vehicle_permit: permit,
    //   scrap_vehicle: scrap,
    //   no_of_tyre: formData.nooftyres,
    //   tyre_cond: tyreCondition,
    //   selling_price: formData.pricingvehicle,
    //   fitness_certificate: formData.fitnesscertificate,
    //   rc_document: rcImage,
    //   engine_pic: engImage,
    //   front_side_pic: frontSideImg,
    //   back_side_pic: backSideImg,
    //   front_tyre: fronttyreLeftImg,
    //   side_pic_vehicle: sidePicLeft,
    // };''

    const userToken = localStorage.getItem("Token");
    const response = await axios.post(Constant.postUrls.postAllVehicles, fd, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    setVehicleId(response.data.vehicle._id);
    console.log(response.data);
  };

  switch (step) {
    case 1:
      return (
        <>
          <SellerFormVehicle
            nextStep={nextStep}
            filterBrands={filterBrands}
            filterModels={filterModels}
            handleOnChange={handleOnChange}
            setYearTitle={setYearTitle}
            setYear={setYear}
            setFuel={setFuel}
            setOwner={setOwner}
            setBrandId={setBrandId}
            setBrandTitle={setBrandTitle}
            brandTitle={brandTitle}
            setModelId={setModelId}
            setModelTitle={setModelTitle}
            modelTitle={modelTitle}
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
            handleOnChange={handleOnChange}
            formData={formData}
            setPermit={setPermit}
            setScrap={setScrap}
            setTyreCondition={setTyreCondition}
            nextStep={nextStep}
          />
        </>
      );
    case 3:
      return (
        <>
          <SellerVehicleDetail
            documentRCImg={documentRCImg}
            setDocumentRCImg={setDocumentRCImg}
            rcImage={rcImage}
            setRCImage={setRCImage}
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
          />
        </>
      );
    case 4:
      return (
        <>
          <SellerPreviewDetails
            rcImage={rcImage}
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
          />
        </>
      );
    default:
      break;
  }
};

export default SellerForm;
