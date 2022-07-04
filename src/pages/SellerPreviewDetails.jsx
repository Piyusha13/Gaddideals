import "./sellerpreviewdetails.style.css";
import { FiCheckCircle } from "react-icons/fi";
import editIcon from "../assets/edit.png";
// import { FaRegEdit } from "react-icons/fa";

import cloudIcon from "../assets/cloud.png";

const SellerPreviewDetails = () => {
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
              <h6>City</h6>
              <p>Pune</p>
            </div>

            <div className="detail">
              <h6>Vehicle Model</h6>
              <p>Tata V30</p>
            </div>

            <div className="detail">
              <h6>Manufacturing Year</h6>
              <p>2001</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Vehicle Number</h6>
              <p>MH01AT3321</p>
            </div>

            <div className="detail">
              <h6>Kilometers Driven</h6>
              <p>10,000</p>
            </div>

            <div className="detail">
              <h6>Number of owners</h6>
              <p>Second</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Tyre Condition</h6>
              <p>Good</p>
            </div>

            <div className="detail">
              <h6>Transmission</h6>
              <p>Manual</p>
            </div>

            <div className="detail">
              <h6>Fitness certificate</h6>
              <p>No</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Tax Validity Up To</h6>
              <p>2002</p>
            </div>

            <div className="detail">
              <h6>Vehicle Condition</h6>
              <p>Good</p>
            </div>

            <div className="detail">
              <h6>Do you want to Scrap Vehicle?</h6>
              <p>No</p>
            </div>
          </div>

          <div className="preview-line"></div>

          <div className="row">
            <div className="detail">
              <h6>Number of tyres</h6>
              <p>4</p>
            </div>

            <div className="detail">
              <h6>Pricing of the vehicle</h6>
              <p>15,00,00</p>
            </div>

            <div className="detail"></div>
          </div>

          <div className="preview-line"></div>

          <div className="preview-row-one">
            <div className="preview-vehicle-document">
              <h6>RC Document</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="preview-vehicle-document">
              <h6>Engine Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="preview-vehicle-document">
              <h6>Front Side Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
              </div>
            </div>

            <div className="preview-vehicle-document">
              <h6>Back Side Picture</h6>
              <div className="document">
                <img src={cloudIcon} alt="cloud icon" />
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
