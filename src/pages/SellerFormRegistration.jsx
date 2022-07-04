import { FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

import "./sellerformregister.style.css";

import ToggleActive from "../components/ToggleActive";

const tagsArray = [
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
];

const SellerFormRegistration = ({ nextStep }) => {
  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };
  return (
    <div className="seller-form-container">
      <div className="form-routes">
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
          <div className="circle"></div>
          <a href="#vehicledetail">vehicle Detail</a>
        </div>

        <div className="route-nav">
          <div className="circle"></div>
          <a href="#preview">Preview</a>
        </div>
      </div>

      <div className="form-registration-container">
        <div className="filter-tags">
          {tagsArray.map((tag, index) => (
            <div className="tag" key={index}>
              <span>{tag.text}</span>
              {tag.cancelIcon}
            </div>
          ))}
        </div>

        <div className="line"></div>

        <div className="form-register">
          <form>
            <div className="form-register-controls">
              <label htmlFor="insurancepermit">Insurance Permit</label>
              <div className="permits">
                <ToggleActive>
                  <span>Yes</span>
                </ToggleActive>
                <ToggleActive>
                  <span>No</span>
                </ToggleActive>
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="taxvalidity">Tax Validity up to</label>
              <input type="text" name="taxvalidity" placeholder="2002" />
            </div>

            <div className="form-register-controls">
              <label htmlFor="vehiclecondition">Vehicle Condition</label>
              <div className="conditions">
                <ToggleActive>
                  <span>Excellant</span>
                </ToggleActive>
                <ToggleActive>
                  <span>Good</span>
                </ToggleActive>
                <ToggleActive>
                  <span>Average</span>
                </ToggleActive>
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="scrapvehicle">
                Do you want to Scrap Vehicle?
              </label>
              <div className="permits">
                <ToggleActive>
                  <span>Yes</span>
                </ToggleActive>
                <ToggleActive>
                  <span>No</span>
                </ToggleActive>
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="nooftyres">Number of tyres</label>
              <input type="text" name="nooftyres" placeholder="4" />
            </div>

            <div className="form-register-controls">
              <label htmlFor="tyrecondition">Tyre condition</label>
              <div className="conditions">
                <ToggleActive>
                  <span>Excellant</span>
                </ToggleActive>
                <ToggleActive>
                  <span>Good</span>
                </ToggleActive>
                <ToggleActive>
                  <span>Average</span>
                </ToggleActive>
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="pricingvehicle">Pricing of the vehicle</label>
              <input type="text" name="pricingvehicle" placeholder="₹5,00,00" />
            </div>

            <div className="form-register-controls">
              <label htmlFor="fitnesscertificate">Fitness certificate</label>
              <div className="permits">
                <ToggleActive>
                  <span>Yes</span>
                </ToggleActive>
                <ToggleActive>
                  <span>No</span>
                </ToggleActive>
              </div>
            </div>

            <div className="btn-next">
              <button type="submit" onClick={continueNext}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerFormRegistration;
