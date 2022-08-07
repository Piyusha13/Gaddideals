import { useEffect } from "react";

import "./sellerpreviewdetails.style.css";
import { FiCheckCircle } from "react-icons/fi";
import editIcon from "../assets/edit.png";

import cloudIcon from "../assets/cloud.png";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { imgurl } from "../constants";

const SellerPreviewDetails = ({
  stateTitle,
  cityTitle,
  formData,
  engImage,
  frontSideImg,
  backSideImg,
  fronttyreLeftImg,
  fronttyreRightImg,
  sidePicLeft,
  sidePicRight,
  handlePostData,
  handlePublishPostData,
  handleUpdateData,
  modelTitle,
  yearTitle,
  setStep,
  bodyTypeTitle,
  categoryTractorTitle,
  caetgoryBusTitle,
  saveLoading,
  pubLoading,
  documentEngImg,
  documentFrontSideImg,
  documentBackSideImg,
  documentFronttyreLeft,
  documentFronttyreRight,
  documentSidePicLeft,
  documentSidePicRight,
  vehicleID,
  handlePublishPutData,
  frontsideCropImg,
  backsideCropImg,
  engCropImg,
  fronttyreLeftCropImg,
  fronttyreRightCropImg,
  sidePicLeftCropImg,
  sidePicRightCropImg,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="seller-preview-container">
        <div className="form-routes preview">
          <div className="route-nav route-nav-mob">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#vehicleinfo" className="active">
              Vehicle Information
            </a>
          </div>

          <div className="route-nav route-nav-mob">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#registration" className="active">
              Registration Detail
            </a>
          </div>

          <div className="route-nav route-nav-mob">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#vehicledetail" className="active">
              Vehicle Detail
            </a>
          </div>

          <div className="route-nav route-nav-mob">
            <div className="circle active">
              <FiCheckCircle color="#050F56" />
            </div>
            <a href="#preview" className="active">
              Preview
            </a>
          </div>
        </div>

        <div className="preview-detail-container">
          <div className="preview-title">
            <h5>Preview</h5>
          </div>
          <div className="preview-details-wrapper">
            <img
              src={editIcon}
              alt="edit icon"
              className="edit-icon"
              onClick={() => setStep(1)}
            />
            <div className="row">
              <div className="detail">
                <h6>State</h6>
                <p>{stateTitle}</p>
              </div>

              <div className="detail">
                <h6>City</h6>
                <p>{cityTitle}</p>
              </div>

              <div className="detail">
                <h6>Vehicle Model</h6>
                <p>{modelTitle}</p>
              </div>
            </div>

            <div className="preview-line"></div>

            <div className="row">
              <div className="detail">
                <h6>Manufacturing Year</h6>
                <p>{yearTitle}</p>
              </div>
              <div className="detail">
                <h6>Vehicle Number</h6>
                <p>{formData.vehiclenumber}</p>
              </div>

              {categoryTractorTitle === "Tractors" ? (
                <div className="detail">
                  <h6>Number of Hours</h6>
                  <p>{formData.noofhrs}</p>
                </div>
              ) : (
                <div className="detail">
                  <h6>Kilometers Driven</h6>
                  <p>{formData.kmsdriven}</p>
                </div>
              )}
            </div>

            <div className="preview-line"></div>

            <div className="row">
              <div className="detail">
                <h6>Number of owners</h6>
                <p>{formData.owner}</p>
              </div>

              <div className="detail">
                <h6>Tyre Condition</h6>
                <p>{formData.tyreCondition}</p>
              </div>

              <div className="detail">
                <h6>Fitness certificate</h6>
                <p>{formData.fitnesscertificate}</p>
              </div>
            </div>

            <div className="preview-line"></div>

            <div className="row">
              <div className="detail">
                <h6>Tax Validity Up To</h6>
                <p>{formData.taxvalidity}</p>
              </div>

              {/* <div className="detail">
                <h6>Do you want to Scrap Vehicle?</h6>
                <p>{formData.scrap}</p>
              </div> */}

              {categoryTractorTitle === "Tractors" ? (
                <div className="detail">
                  <h6>Horse Power</h6>
                  <p>{formData.horsepower}</p>
                </div>
              ) : caetgoryBusTitle === "Buses" ? (
                <div className="detail">
                  <h6>Number of Seats</h6>
                  <p>{formData.noofseats}</p>
                </div>
              ) : (
                <div className="detail">
                  <h6>Number of tyres</h6>
                  <p>{formData.nooftyres}</p>
                </div>
              )}

              <div className="detail">
                <h6>Pricing of the vehicle</h6>
                <p>{formData.pricingvehicle}</p>
              </div>
            </div>

            <div className="preview-line"></div>

            <div className="row">
              <div className="detail">
                <h6>Body Type</h6>
                <p>{bodyTypeTitle}</p>
              </div>

              <div className="detail">
                <h6>RC</h6>
                <p>{formData.rc}</p>
              </div>

              <div className="detail"></div>
            </div>

            <div className="preview-line"></div>

            <div className="preview-row-one">
              <div className="preview-vehicle-document">
                <h6>Front Side Picture</h6>
                <div
                  className="document"
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

              <div className="preview-vehicle-document">
                <h6>Back Side Picture</h6>
                <div
                  className="document"
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

              <div className="preview-vehicle-document">
                <h6>Engine Picture</h6>
                <div
                  className="document"
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

            <div className="preview-row-two">
              <h6>
                Pictures of front tyre from both the sides of the vehicle.
              </h6>
              <div className="vehicle-documents">
                <div
                  className="document"
                  style={
                    fronttyreLeftImg ? { padding: "0px" } : { padding: "40px" }
                  }
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

                <div
                  className="document"
                  style={
                    fronttyreRightImg ? { padding: "0px" } : { padding: "40px" }
                  }
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

            <div className="preview-row-three">
              <h6>Side pictures of the vehicle including the tyres.</h6>
              <div className="vehicle-documents">
                <div
                  className="document"
                  style={sidePicLeft ? { padding: "0px" } : { padding: "40px" }}
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

                <div
                  className="document"
                  style={
                    sidePicRight ? { padding: "0px" } : { padding: "40px" }
                  }
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

            <div className="preview-btns">
              <button className="edit" onClick={() => setStep(1)}>
                Edit
              </button>
              {vehicleID ? (
                <button onClick={handleUpdateData} className="save">
                  {saveLoading ? "Updating..." : "Update"}
                </button>
              ) : (
                <button onClick={handlePostData} className="save">
                  {saveLoading ? "Saving..." : "Save Now"}
                </button>
              )}

              {vehicleID ? (
                <button onClick={handlePublishPutData}>
                  {pubLoading ? "Uploading..." : "Upload Vehicle"}
                </button>
              ) : (
                <button onClick={handlePublishPostData}>
                  {pubLoading ? "Uploading..." : "Upload Vehicle"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerPreviewDetails;
