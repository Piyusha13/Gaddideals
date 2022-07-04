import { useRef } from "react";
import "./sellervehicledetail.style.css";
import { FiCheckCircle } from "react-icons/fi";
import cloudIcon from "../assets/cloud.png";

const SellerVehicleDetail = ({ nextStep }) => {
  const fileInput = useRef();

  const handleFileInput = () => {
    fileInput.current.click();
  };

  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
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
            <div className="vehicle-document" onClick={handleFileInput}>
              <h6>RC Document</h6>
              <input
                type="file"
                ref={fileInput}
                accept="image/*"
                multiple
                hidden
              />
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="vehicle-document" onClick={handleFileInput}>
              <h6>Engine Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="vehicle-document" onClick={handleFileInput}>
              <h6>Front Side Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="vehicle-document" onClick={handleFileInput}>
              <h6>Back Side Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>
          </div>

          <div className="row-two">
            <h6>Pictures of front tyre from both the sides of the vehicle.</h6>
            <div className="vehicle-documents">
              <div className="document" onClick={handleFileInput}>
                <img src={cloudIcon} alt="cloud icon" />
              </div>

              <div className="document" onClick={handleFileInput}>
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>
          </div>

          <div className="row-three">
            <h6>Side pictures of the vehicle including the tyres.</h6>
            <div className="vehicle-documents">
              <div className="document" onClick={handleFileInput}>
                <img src={cloudIcon} alt="cloud icon" />
              </div>

              <div className="document" onClick={handleFileInput}>
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>
          </div>

          <div className="continue-btn">
            <button onClick={continueNext}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerVehicleDetail;
