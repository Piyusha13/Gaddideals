import { useState } from "react";

import { FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

import "./sellerformregister.style.css";

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
    condition: "Excellant",
  },
  {
    condition: "Good",
  },
  {
    condition: "Average",
  },
];

const SellerFormRegistration = ({
  nextStep,
  handleOnChange,
  formData,
  setPermit,
  setScrap,
  setTyreCondition,
}) => {
  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const [isPermitActive, setIsPermitActive] = useState();
  const [isScrapActive, setIsScrapActive] = useState();
  const [isTyreCondActive, setIsTyreCondActive] = useState();

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
              <label htmlFor="insurancevalidity">Insurance Validity</label>
              <input
                type="date"
                value={formData.insurancevalidity}
                name="insurancevalidity"
                onChange={handleOnChange}
                placeholder="2002"
              />
            </div>

            <div className="form-register-controls">
              <label htmlFor="taxvalidity">Tax Validity up to</label>
              <input
                type="date"
                value={formData.taxvalidity}
                name="taxvalidity"
                onChange={handleOnChange}
                placeholder="2002"
              />
            </div>

            <div className="form-register-controls">
              <label htmlFor="permits">Permits</label>
              <div className="permits">
                {permitsArray.map((permits, index) => (
                  <div
                    key={index}
                    className={
                      isPermitActive === index ? "permit active" : "permit"
                    }
                    onClick={() => {
                      setPermit(permits.permit);
                      setIsPermitActive(index);
                    }}
                  >
                    <span>{permits.permit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="scrapvehicle">
                Do you want to Scrap Vehicle?
              </label>
              <div className="scraps">
                {scrapArray.map((scraps, index) => (
                  <div
                    key={index}
                    className={
                      isScrapActive === index ? "scrap active" : "scrap"
                    }
                    onClick={() => {
                      setScrap(scraps.scrap);
                      setIsScrapActive(index);
                    }}
                  >
                    <span>{scraps.scrap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="nooftyres">Number of tyres</label>
              <input
                type="text"
                value={formData.nooftyres}
                name="nooftyres"
                onChange={handleOnChange}
                placeholder="4"
              />
            </div>

            <div className="form-register-controls">
              <label htmlFor="tyrecondition">Tyre Condition</label>
              <div className="conditions">
                {tyreConditionArray.map((conditions, index) => (
                  <div
                    className={
                      isTyreCondActive === index
                        ? "condition active"
                        : "condition"
                    }
                    key={index}
                    onClick={() => {
                      setTyreCondition(conditions.condition);
                      setIsTyreCondActive(index);
                    }}
                  >
                    <span>{conditions.condition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-register-controls">
              <label htmlFor="pricingvehicle">Pricing of the vehicle</label>
              <input
                type="text"
                value={formData.pricingvehicle}
                name="pricingvehicle"
                onChange={handleOnChange}
                placeholder="₹5,00,00"
              />
            </div>

            <div className="form-register-controls">
              <label htmlFor="fitnesscertificate">Fitness certificate</label>
              <input
                type="date"
                value={formData.fitnesscertificate}
                name="fitnesscertificate"
                onChange={handleOnChange}
              />
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
