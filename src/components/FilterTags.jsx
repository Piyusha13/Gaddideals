import "./filtertags.style.css";

import { FaTimes } from "react-icons/fa";

const FilterTags = ({
  yearTitle,
  setYearTitle,
  owner,
  setOwner,
  fuelTitle,
  setFuelTitle,
  permit,
  setPermit,
  scrap,
  setScrap,
  tyreCondition,
  setTyreCondition,
  setIsYearActive,
  setIsOwnerActive,
  setIsFuelActive,
  setIsPermitActive,
  setIsScrapActive,
  setIsTyreCondActive,
}) => {
  return (
    <div className="filter-tags">
      {yearTitle && (
        <div className="tag">
          <span>{yearTitle}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setYearTitle("");
              setIsYearActive(null);
            }}
          />
        </div>
      )}

      {owner && (
        <div className="tag">
          <span>{owner}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setOwner("");
              setIsOwnerActive(null);
            }}
          />
        </div>
      )}

      {fuelTitle && (
        <div className="tag">
          <span>{fuelTitle}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setFuelTitle("");
              setIsFuelActive(null);
            }}
          />
        </div>
      )}

      {permit && (
        <div className="tag">
          <span>{permit}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setPermit("");
              setIsPermitActive(null);
            }}
          />
        </div>
      )}

      {scrap && (
        <div className="tag">
          <span>{scrap}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setScrap("");
              setIsScrapActive(null);
            }}
          />
        </div>
      )}

      {tyreCondition && (
        <div className="tag">
          <span>{tyreCondition}</span>
          <FaTimes
            className="cancel-icon"
            onClick={() => {
              setTyreCondition("");
              setIsTyreCondActive(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FilterTags;
