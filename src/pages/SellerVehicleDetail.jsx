import { useRef, useEffect, useState, useCallback } from "react";
import "./sellervehicledetail.style.css";
import { FiCheckCircle } from "react-icons/fi";
import cloudIcon from "../assets/cloud.png";

import { imgurl } from "../constants";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Cropper from "react-easy-crop";
import getCroppedImg from "../Helpers/cropImage";

import Modal from "react-awesome-modal";
import "react-image-crop/dist/ReactCrop.css";
import { set } from "react-hook-form";

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
  frontsideCropImg,
  setFrontsideCropImg,
  backsideCropImg,
  setBackSideCropImg,
  engCropImg,
  setEngCropImg,
  fronttyreLeftCropImg,
  setFronttyreLeftCropImg,
  fronttyreRightCropImg,
  setFronttyreRightCropImg,
  sidePicLeftCropImg,
  setSidePicLeftCropImg,
  sidePicRightCropImg,
  setSidePicRightCropImg,
}) => {
  const engineInput = useRef();
  const frontsideInput = useRef();
  const backsideInput = useRef();
  const fronttyreLeftInput = useRef();
  const fronttyreRightInput = useRef();
  const sidePicLeftInput = useRef();
  const sidePicRightInput = useRef();

  const [showModal, setShowModal] = useState(false);
  const [backShowModal, setBackShowModal] = useState(false);
  const [engShowModal, setEngShowModal] = useState(false);
  const [frontTyreLeftShowModal, setFronttyreLeftShowModal] = useState(false);
  const [fronttyreRightShowModal, setFronttyreRightShowModal] = useState(false);
  const [sidePicLeftShowModal, setSidePicLeftShowModal] = useState(false);
  const [sidePicRightShowModal, setSidePicRightShowModal] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [backCrop, setBackCrop] = useState({ x: 0, y: 0 });
  const [engCrop, setEngCrop] = useState({ x: 0, y: 0 });
  const [fronttyreLeftCrop, setFronttyreLeftCrop] = useState({ x: 0, y: 0 });
  const [fronttyreRightCrop, setFronttyreRightCrop] = useState({ x: 0, y: 0 });
  const [sidePicLeftCrop, setSidePicLeftCrop] = useState({ x: 0, y: 0 });
  const [sidePicRightCrop, setSidePicRightCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1000px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(max-width: 1000px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  // frontside cropped
  const showCroppedImage = useCallback(async () => {
    setShowModal(!showModal);
    try {
      const croppedImage = await getCroppedImg(frontSideImg, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setFrontsideCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // backside cropped
  const backCroppedImage = useCallback(async () => {
    setBackShowModal(!backShowModal);
    try {
      const croppedImage = await getCroppedImg(backSideImg, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setBackSideCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // Eng Cropped
  const engCroppedImage = useCallback(async () => {
    setEngShowModal(!engShowModal);
    try {
      const croppedImage = await getCroppedImg(engImage, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setEngCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // fronttyre left cropped
  const fronttyreCroppedImage = useCallback(async () => {
    setFronttyreLeftShowModal(!frontTyreLeftShowModal);
    try {
      const croppedImage = await getCroppedImg(
        fronttyreLeftImg,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      setFronttyreLeftCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // fronttyre right cropped
  const fronttyreRightCroppedImage = useCallback(async () => {
    setFronttyreRightShowModal(!fronttyreRightShowModal);
    try {
      const croppedImage = await getCroppedImg(
        fronttyreRightImg,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      setFronttyreRightCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // sidepic left cropped
  const sidePicLeftCroppedImage = useCallback(async () => {
    setSidePicLeftShowModal(!sidePicLeftShowModal);
    try {
      const croppedImage = await getCroppedImg(sidePicLeft, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setSidePicLeftCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // sidepic Right cropped
  const sidePicRightCroppedImage = useCallback(async () => {
    setSidePicRightShowModal(!sidePicRightShowModal);
    try {
      const croppedImage = await getCroppedImg(sidePicRight, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setSidePicRightCropImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

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
    // if (e.target.files[0]) {
    //   if (e.target.name === "rc") {
    //     setRCImage(e.target.files[0]);
    //     setDocumentRCImg(true);
    //   }
    //   if (e.target.name === "engine") {
    //     setEngImage(e.target.files[0]);
    //     setDocumentEngImg(true);
    //   }
    //   if (e.target.name === "frontside") {
    //     // setFrontSideImg(e.target.files[0]);
    //     setSrc(URL.createObjectURL(e.target.files[0]));
    //     // setDocumentFrontSideImg(true);
    //     setShowModal(true);
    //   }
    //   if (e.target.name === "backside") {
    //     setBackSideImg(e.target.files[0]);
    //     setDocumentBackSideImg(true);
    //   }
    //   if (e.target.name === "fronttyreleft") {
    //     setFronttyreLeftImg(e.target.files[0]);
    //     setDocumentFronttyreLeft(true);
    //   }
    //   if (e.target.name === "fronttyreright") {
    //     setFronttyreRightImg(e.target.files[0]);
    //     setDocumentFronttyreRight(true);
    //   }
    //   if (e.target.name === "sidepicleft") {
    //     setSidePicLeft(e.target.files[0]);
    //     setDocumentSidePicLeft(true);
    //   }
    //   if (e.target.name === "sidepicright") {
    //     setSidePicRight(e.target.files[0]);
    //     setDocumentSidePicRight(true);
    //   }
    // }

    if (e.target.name === "frontside") {
      setShowModal(true);
      setFrontSideImg(URL.createObjectURL(e.target.files[0]));
      setDocumentFrontSideImg(true);
    }

    if (e.target.name === "backside") {
      setBackShowModal(true);
      setBackSideImg(URL.createObjectURL(e.target.files[0]));
      setDocumentBackSideImg(true);
    }

    if (e.target.name === "engine") {
      setEngShowModal(true);
      setEngImage(URL.createObjectURL(e.target.files[0]));
      setDocumentEngImg(true);
    }

    if (e.target.name === "fronttyreleft") {
      setFronttyreLeftShowModal(true);
      setFronttyreLeftImg(URL.createObjectURL(e.target.files[0]));
      setDocumentFronttyreLeft(true);
    }

    if (e.target.name === "fronttyreright") {
      setFronttyreRightShowModal(true);
      setFronttyreRightImg(URL.createObjectURL(e.target.files[0]));
      setDocumentFronttyreRight(true);
    }

    if (e.target.name === "sidepicleft") {
      setSidePicLeftShowModal(true);
      setSidePicLeft(URL.createObjectURL(e.target.files[0]));
      setDocumentSidePicLeft(true);
    }
    if (e.target.name === "sidepicright") {
      setSidePicRightShowModal(true);
      setSidePicRight(URL.createObjectURL(e.target.files[0]));
      setDocumentSidePicRight(true);
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
              Vehicle Detail
            </a>
          </div>

          <div className="route-nav">
            <div className="circle"></div>
            <a href="#preview">Preview</a>
          </div>
        </div>

        <div className="vehicle-detail-container">
          <div className="vehicle-detail-title">
            <h5>Vehicle Detail</h5>
          </div>
          <div className="container-wrapper">
            <div className="row-one">
              <div className="vehicle-document">
                <h6>
                  Front Side Picture <span className="front-req">*</span>
                </h6>

                <input
                  ref={frontsideInput}
                  type="file"
                  name="frontside"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={showModal}
                  onClickAway={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={frontSideImg}
                      crop={crop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={showCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() => setShowModal(!showModal)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

                <div
                  className="document"
                  onClick={handleFrontsideInput}
                  style={
                    frontSideImg ? { padding: "0px" } : { padding: "40px" }
                  }
                >
                  <img
                    src={
                      documentFrontSideImg
                        ? frontsideCropImg
                        : frontSideImg
                        ? imgurl + frontSideImg
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>

              <div className="vehicle-document">
                <h6>Back Side Picture</h6>
                <input
                  ref={backsideInput}
                  type="file"
                  name="backside"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={backShowModal}
                  onClickAway={() => {
                    setShowModal(!backShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={backSideImg}
                      crop={backCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setBackCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={backCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() => setBackShowModal(!backShowModal)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

                <div
                  className="document"
                  onClick={handleBacksideInput}
                  style={backSideImg ? { padding: "0px" } : { padding: "40px" }}
                >
                  <img
                    src={
                      documentBackSideImg
                        ? backsideCropImg
                        : backSideImg
                        ? imgurl + backSideImg
                        : cloudIcon
                    }
                    alt="cloud icon"
                  />
                </div>
              </div>

              <div className="vehicle-document">
                <h6>Engine Picture</h6>
                <input
                  ref={engineInput}
                  type="file"
                  name="engine"
                  onChange={handleImageChange}
                  accept="image/*"
                  hidden
                />

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={engShowModal}
                  onClickAway={() => {
                    setEngShowModal(!engShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={engImage}
                      crop={engCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setEngCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={engCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() => setEngShowModal(!engShowModal)}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

                <div
                  className="document"
                  onClick={handleEngineInput}
                  style={engImage ? { padding: "0px" } : { padding: "40px" }}
                >
                  <img
                    src={
                      documentEngImg
                        ? engCropImg
                        : engImage
                        ? imgurl + engImage
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

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={frontTyreLeftShowModal}
                  onClickAway={() => {
                    setFronttyreLeftShowModal(!frontTyreLeftShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={fronttyreLeftImg}
                      crop={fronttyreLeftCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setFronttyreLeftCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={fronttyreCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() =>
                        setFronttyreLeftShowModal(!frontTyreLeftShowModal)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

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
                        ? fronttyreLeftCropImg
                        : fronttyreLeftImg
                        ? imgurl + fronttyreLeftImg
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

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={fronttyreRightShowModal}
                  onClickAway={() => {
                    setFronttyreRightShowModal(!fronttyreRightShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={fronttyreRightImg}
                      crop={fronttyreRightCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setFronttyreRightCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={fronttyreRightCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() =>
                        setFronttyreRightShowModal(!fronttyreRightShowModal)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

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
                        ? fronttyreRightCropImg
                        : fronttyreRightImg
                        ? imgurl + fronttyreRightImg
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

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={sidePicLeftShowModal}
                  onClickAway={() => {
                    setSidePicLeftShowModal(!sidePicLeftShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={sidePicLeft}
                      crop={sidePicLeftCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setSidePicLeftCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={sidePicLeftCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() =>
                        setSidePicLeftShowModal(!sidePicLeftShowModal)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

                <div
                  className="document"
                  style={sidePicLeft ? { padding: "0px" } : { padding: "40px" }}
                  onClick={handleSidePicLeftInput}
                >
                  <img
                    src={
                      documentSidePicLeft
                        ? sidePicLeftCropImg
                        : sidePicLeft
                        ? imgurl + sidePicLeft
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

                <Modal
                  width={matches ? "80%" : "90%"}
                  height={matches ? "50%" : "100%"}
                  effect="fadeInUp"
                  visible={sidePicRightShowModal}
                  onClickAway={() => {
                    setSidePicRightShowModal(!sidePicRightShowModal);
                  }}
                >
                  <div>
                    <Cropper
                      image={sidePicRight}
                      crop={sidePicRightCrop}
                      zoom={zoom}
                      aspect={16 / 9}
                      onCropChange={setSidePicRightCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className="modal-btns">
                    <button onClick={sidePicRightCroppedImage}>Save</button>
                    <button
                      className="cancel-modal-btn"
                      onClick={() =>
                        setSidePicRightShowModal(!sidePicRightShowModal)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

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
                        ? sidePicRightCropImg
                        : sidePicRight
                        ? imgurl + sidePicRight
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
