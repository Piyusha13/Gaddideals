import { useRef, useEffect } from "react";
import "./sellervehicledetail.style.css";
import { FiCheckCircle } from "react-icons/fi";
import cloudIcon from "../assets/cloud.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SellerVehicleDetail = ({
  prevStep,
  nextStep,
  documentRCImg,
  setDocumentRCImg,
  setRCImage,
  rcImage,
  documentEngImg,
  setDocumentEngImg,
  engImage,
  setEngImage,
  documentFrontSideImg,
  setDocumentFrontSideImg,
  frontSideImg,
  setFrontSideImg,
  documentBackSideImg,
  setDocumentBackSideImg,
  backSideImg,
  setBackSideImg,
  documentFronttyreLeft,
  setDocumentFronttyreLeft,
  fronttyreLeftImg,
  setFronttyreLeftImg,
  documentFronttyreRight,
  setDocumentFronttyreRight,
  fronttyreRightImg,
  setFronttyreRightImg,
  documentSidePicLeft,
  setDocumentSidePicLeft,
  sidePicLeft,
  setSidePicLeft,
  documentSidePicRight,
  setDocumentSidePicRight,
  sidePicRight,
  setSidePicRight,
}) => {
  const fileInput = useRef();
  const engineInput = useRef();
  const frontsideInput = useRef();
  const backsideInput = useRef();
  const fronttyreLeftInput = useRef();
  const fronttyreRightInput = useRef();
  const sidePicLeftInput = useRef();
  const sidePicRightInput = useRef();

  const handleFileInput = () => {
    fileInput.current.click();
  };

  const handleEngineInput = () => {
    engineInput.current.click();
  };

  const handleFrontsideInput = () => {
    frontsideInput.current.click();
  };

  const handleBacksideInput = () => {
    backsideInput.current.click();
  };

  const handleFrontTyreInput = () => {
    fronttyreLeftInput.current.click();
  };

  const handleFrontTyreRightInput = () => {
    fronttyreRightInput.current.click();
  };

  const handleSidePicLeftInput = () => {
    sidePicLeftInput.current.click();
  };

  const handleSidePicRightInput = () => {
    sidePicRightInput.current.click();
  };
  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previousStep = () => {
    prevStep();
  };

  const handleImageChange = (e) => {
    // console.log(e.target.name);
    if (e.target.files[0]) {
      if (e.target.name === "rc") {
        setRCImage(e.target.files[0]);
        setDocumentRCImg(true);
      }
      if (e.target.name === "engine") {
        setEngImage(e.target.files[0]);
        setDocumentEngImg(true);
      }
      if (e.target.name === "frontside") {
        setFrontSideImg(e.target.files[0]);
        setDocumentFrontSideImg(true);
      }
      if (e.target.name === "backside") {
        setBackSideImg(e.target.files[0]);
        setDocumentBackSideImg(true);
      }
      if (e.target.name === "fronttyreleft") {
        setFronttyreLeftImg(e.target.files[0]);
        setDocumentFronttyreLeft(true);
      }
      if (e.target.name === "fronttyreright") {
        setFronttyreRightImg(e.target.files[0]);
        setDocumentFronttyreRight(true);
      }
      if (e.target.name === "sidepicleft") {
        setSidePicLeft(e.target.files[0]);
        setDocumentSidePicLeft(true);
      }
      if (e.target.name === "sidepicright") {
        setSidePicRight(e.target.files[0]);
        setDocumentSidePicRight(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="seller-form-container">
        <div className="form-routes vehicledetail">
          <div className="route-nav">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#vehicleinfo" className="active">
              Vehicle Information
            </a>
          </div>

          <div className="route-nav">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#registration" className="active">
              Registration Detail
            </a>
          </div>

          <div className="route-nav">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#vehicledetail" className="active">
              vehicle Detail
            </a>
          </div>

          <div className="route-nav">
            <div className="circle"></div>
            <a href="#preview">Preview</a>
          </div>
        </div>

        <div className="vehicle-detail-container">
          <div className="container-wrapper">
            <div className="row-one">
              {/* <div className="vehicle-document" onClick={handleFileInput}>
                <h6>RC Document</h6>
                <input
                  type="file"
                  name="rc"
                  ref={fileInput}
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    documentRCImg ? { padding: "0px" } : { padding: "40px" }
                  }
                >
                  <img
                    src={
                      documentRCImg ? URL.createObjectURL(rcImage) : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div> */}

              <div className="vehicle-document" onClick={handleEngineInput}>
                <h6>Engine Picture</h6>
                <input
                  ref={engineInput}
                  type="file"
                  name="engine"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    documentEngImg ? { padding: "0px" } : { padding: "40px" }
                  }
                >
                  <img
                    src={
                      documentEngImg ? URL.createObjectURL(engImage) : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>

              <div className="vehicle-document" onClick={handleFrontsideInput}>
                <h6>Front Side Picture</h6>
                <input
                  ref={frontsideInput}
                  type="file"
                  name="frontside"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    frontSideImg ? { padding: "0px" } : { padding: "40px" }
                  }
                >
                  <img
                    src={
                      documentFrontSideImg
                        ? URL.createObjectURL(frontSideImg)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>

              <div className="vehicle-document" onClick={handleBacksideInput}>
                <h6>Back Side Picture</h6>
                <input
                  ref={backsideInput}
                  type="file"
                  name="backside"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={backSideImg ? { padding: "0px" } : { padding: "40px" }}
                >
                  <img
                    src={
                      documentBackSideImg
                        ? URL.createObjectURL(backSideImg)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>
            </div>

            <div className="row-two">
              <h6>
                Pictures of front tyre from both the sides of the vehicle.
              </h6>
              <div className="vehicle-documents">
                <input
                  ref={fronttyreLeftInput}
                  type="file"
                  name="fronttyreleft"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    fronttyreLeftImg ? { padding: "0px" } : { padding: "40px" }
                  }
                  onClick={handleFrontTyreInput}
                >
                  <img
                    src={
                      documentFronttyreLeft
                        ? URL.createObjectURL(fronttyreLeftImg)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>

                <input
                  ref={fronttyreRightInput}
                  type="file"
                  name="fronttyreright"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    fronttyreRightImg ? { padding: "0px" } : { padding: "40px" }
                  }
                  onClick={handleFrontTyreRightInput}
                >
                  <img
                    src={
                      documentFronttyreRight
                        ? URL.createObjectURL(fronttyreRightImg)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>
            </div>

            <div className="row-three">
              <h6>Side pictures of the vehicle including the tyres.</h6>
              <div className="vehicle-documents">
                <input
                  ref={sidePicLeftInput}
                  type="file"
                  name="sidepicleft"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={sidePicLeft ? { padding: "0px" } : { padding: "40px" }}
                  onClick={handleSidePicLeftInput}
                >
                  <img
                    src={
                      documentSidePicLeft
                        ? URL.createObjectURL(sidePicLeft)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>

                <input
                  ref={sidePicRightInput}
                  type="file"
                  name="sidepicright"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />
                <div
                  className="document"
                  style={
                    sidePicRight ? { padding: "0px" } : { padding: "40px" }
                  }
                  onClick={handleSidePicRightInput}
                >
                  <img
                    src={
                      documentSidePicRight
                        ? URL.createObjectURL(sidePicRight)
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>
            </div>

            <div className="continue-btn">
              <button onClick={previousStep}>Previous</button>
              <button onClick={continueNext}>Continue</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerVehicleDetail;
