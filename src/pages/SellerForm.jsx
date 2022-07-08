import { useState } from "react";

import SellerFormVehicle from "./SellerFormVehicle";
import SellerFormRegistration from "./SellerFormRegistration";
import SellerVehicleDetail from "./SellerVehicleDetail";
import SellerPreviewDetails from "./SellerPreviewDetails";

const SellerForm = () => {
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

  const [formData, setFormData] = useState({
    whichstate: "",
    whichcity: "",
    vehiclebrand: "",
    vehiclemodel: "",
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  switch (step) {
    case 1:
      return (
        <>
          <SellerFormVehicle
            nextStep={nextStep}
            handleOnChange={handleOnChange}
            setYear={setYear}
            setFuel={setFuel}
            setOwner={setOwner}
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
            formData={formData}
          />
        </>
      );
    default:
      break;
  }
};

export default SellerForm;
