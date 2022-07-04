import { FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import "./sellerformvehicle.style.css";

import arrowDown from "../assets/down-arrow.png";

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
  {
    text: "Lorem Ipsum",
    cancelIcon: <FaTimes size={12} className="cancel-icon" />,
  },
];

const SellerFormVehicle = ({ nextStep }) => {
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
          <div className="circle"></div>
          <a href="#registration">Registration Detail</a>
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

      <div className="form-details-container">
        <div className="filter-tags">
          {tagsArray.map((tag, index) => (
            <div className="tag" key={index}>
              <span>{tag.text}</span>
              {tag.cancelIcon}
            </div>
          ))}
        </div>

        <div className="line"></div>

        <div className="form-details">
          <form>
            <div className="form-controls">
              <label htmlFor="whichcity">Which City</label>
              <input type="text" name="whichcity" placeholder="Pune" />
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclebrand">Vehicle Brand</label>
              <input type="text" name="vehiclebrand" placeholder="TATA" />
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclebmodel">Vehicle Brand</label>
              <input type="text" name="vehiclemodel" placeholder="Intra V30" />
            </div>

            <div className="form-controls">
              <label htmlFor="manufacturing">Manufacturing Year</label>
              <div className="years">
                <ToggleActive>
                  <span>2004</span>
                </ToggleActive>
                <ToggleActive>
                  <span>2005</span>
                </ToggleActive>

                <ToggleActive>
                  <span>2006</span>
                </ToggleActive>

                <ToggleActive>
                  <span>2007</span>
                </ToggleActive>

                <ToggleActive>
                  <span>2008</span>
                </ToggleActive>

                <ToggleActive>
                  <span>2009</span>
                </ToggleActive>

                <ToggleActive>
                  <span>2010</span>
                </ToggleActive>

                <div className="see-more">
                  <span>See More</span>
                  <img src={arrowDown} alt="down arrow icon" />
                </div>
              </div>
            </div>

            <div className="form-controls">
              <label htmlFor="vehiclebnumber">Vehicle Number</label>
              <input
                type="text"
                name="vehiclebnumber"
                placeholder="MH01BH3321"
              />
            </div>

            <div className="form-controls">
              <label htmlFor="kilometers">Kilometers Driven</label>
              <input type="text" name="kilometers" placeholder="10,00,00" />
            </div>

            <div className="form-controls">
              <label htmlFor="owners">Number of owners</label>
              <div className="owners">
                <ToggleActive>
                  <span>First</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Second</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Third</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Fourth</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Fifth</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Other</span>
                </ToggleActive>
              </div>
            </div>

            <div className="form-controls">
              <label htmlFor="transmission">Transmission</label>
              <div className="transmission">
                <ToggleActive>
                  <span>Manual</span>
                </ToggleActive>

                <ToggleActive>
                  <span>Automatic</span>
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

export default SellerFormVehicle;
