import "./sellerpreviewdetails.style.css";
import { FiCheckCircle } from "react-icons/fi";
import editIcon from "../assets/edit.png";

import cloudIcon from "../assets/cloud.png";

const SellerPreviewDetails = ({
  formData,
  rcImage,
  engImage,
  frontSideImg,
  backSideImg,
}) => {
  return (
    <div className="seller-preview-container">
      <div className="form-routes preview">
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
          <div className="circle active">
            <FiCheckCircle color="#050F56" />
          </div>
          <a href="#preview" className="active">
            Preview
          </a>
        </div>
      </div>

      <div className="preview-detail-container">
        <div className="preview-details-wrapper">
          <img src={editIcon} alt="edit icon" className="edit-icon" />

          <div className="row">
            <div className="detail">
              <h6>State</h6>
              <p>{formData.whichstate}</p>
            </div>

            <div className="detail">
              <h6>City</h6>
              <p>{formData.whichcity}</p>
            </div>

            <div className="detail">
              <h6>Vehicle Model</h6>
              <p>{formData.vehiclemodel}</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Manufacturing Year</h6>
              <p>{formData.year}</p>
            </div>
            <div className="detail">
              <h6>Vehicle Number</h6>
              <p>{formData.vehiclenumber}</p>
            </div>

            <div className="detail">
              <h6>Kilometers Driven</h6>
              <p>{formData.kmsdriven}</p>
            </div>
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

            <div className="detail">
              <h6>Vehicle Condition</h6>
              <p>Good</p>
            </div>

            <div className="detail">
              <h6>Do you want to Scrap Vehicle?</h6>
              <p>{formData.scrap}</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Number of tyres</h6>
              <p>{formData.nooftyres}</p>
            </div>

            <div className="detail">
              <h6>Pricing of the vehicle</h6>
              <p>{formData.pricingvehicle}</p>
            </div>

            <div className="detail"></div>
          </div>

          <div className="preview-line"></div>

          <div className="preview-row-one">
            <div className="preview-vehicle-document">
              <h6>RC Document</h6>
              <div
                className="document"
                style={rcImage ? { padding: "0px" } : { padding: "40px" }}
              >
                <img
                  src={rcImage ? URL.createObjectURL(rcImage) : cloudIcon}
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
                  src={engImage ? URL.createObjectURL(engImage) : cloudIcon}
                  alt="cloud icon"
                />
              </div>
            </div>

            <div className="preview-vehicle-document">
              <h6>Front Side Picture</h6>
              <div
                className="document"
                style={frontSideImg ? { padding: "0px" } : { padding: "40px" }}
              >
                <img
                  src={
                    frontSideImg ? URL.createObjectURL(frontSideImg) : cloudIcon
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
                    backSideImg ? URL.createObjectURL(backSideImg) : cloudIcon
                  }
                  alt="cloud icon"
                />
              </div>
            </div>
          </div>

          <div className="preview-row-two">
            <h6>Pictures of front tyre from both the sides of the vehicle.</h6>
            <div className="vehicle-documents">
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>

              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>
          </div>

          <div className="preview-row-three">
            <h6>Side pictures of the vehicle including the tyres.</h6>
            <div className="vehicle-documents">
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>

              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>
          </div>

          <div className="preview-btns">
            <button className="edit">Edit</button>
            <button className="save">Save Now</button>
            <button>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPreviewDetails;
