import { useState, useEffect } from "react";

import { FiCheckCircle } from "react-icons/fi";

import "./sellerformregister.style.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTags from "../components/FilterTags";

const SellerFormRegistration = ({
  nextStep,
  handleOnChange,
  formData,
  setPermit,
  permit,
  setScrap,
  scrap,
  categoryTractorTitle,
  caetgoryBusTitle,
  setTyreCondition,
  tyreCondition,
  yearTitle,
  setYearTitle,
  setOwner,
  owner,
  fuelTitle,
  setFuelTitle,
  prevStep,
  isPermitActive,
  setIsPermitActive,
  isScrapActive,
  setIsScrapActive,
  isTyreCondActive,
  setIsTyreCondActive,
  permitsArray,
  scrapArray,
  tyreConditionArray,
  RCArray,
  isRCActive,
  setIsRCActive,
  setRC,
  rc,
  bodyTypeArray,
  bodyTypeTitle,
  setBodyTypeTitle,
  isBodyTypeActive,
  setIsBodyTypeActive,
  setBodyTypeId,
}) => {
  const continueNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  const previousStep = (e) => {
    e.preventDefault();
    prevStep();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
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
          <div className="wizard-register-title">
            <h5>Registration Detail</h5>
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
                        setScrap(scraps.scrap.toLowerCase());
                        setIsScrapActive(index);
                      }}
                    >
                      <span>{scraps.scrap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {categoryTractorTitle === "Tractors" ? (
                <div className="form-register-controls">
                  <label htmlFor="horsepower">Horse Power</label>
                  <input
                    type="text"
                    value={formData.horsepower}
                    name="horsepower"
                    onChange={handleOnChange}
                    placeholder="990Bhp"
                  />
                </div>
              ) : caetgoryBusTitle === "Buses" ? (
                <div className="form-register-controls">
                  <label htmlFor="noofseats">Number of seats</label>
                  <input
                    type="text"
                    value={formData.noofseats}
                    name="noofseats"
                    onChange={handleOnChange}
                    placeholder="50"
                  />
                </div>
              ) : (
                <div className="form-register-controls">
                  <label htmlFor="nooftyres">Number of tyres</label>
                  <input
                    type="number"
                    value={formData.nooftyres}
                    name="nooftyres"
                    onChange={handleOnChange}
                    placeholder="4"
                  />
                </div>
              )}

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
                  type="number"
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

              <div className="form-register-controls">
                <label htmlFor="bodytype">Body Type</label>
                <div className="bodys">
                  {bodyTypeArray.map((types, index) => (
                    <div
                      key={index}
                      className={
                        isBodyTypeActive === index ? "body active" : "body"
                      }
                      onClick={() => {
                        setBodyTypeTitle(types.title);
                        setBodyTypeId(types._id);
                        setIsBodyTypeActive(index);
                      }}
                    >
                      <span>{types.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-register-controls">
                <label htmlFor="rcdocument">RC</label>
                <div className="rcs">
                  {RCArray.map((rcs, index) => (
                    <div
                      key={index}
                      className={isRCActive === index ? "rc active" : "rc"}
                      onClick={() => {
                        setRC(rcs.rc);
                        setIsRCActive(index);
                      }}
                    >
                      <span>{rcs.rc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="btn-next">
                <button onClick={previousStep}>Previous</button>
                <button type="submit" onClick={continueNext}>
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerFormRegistration;
