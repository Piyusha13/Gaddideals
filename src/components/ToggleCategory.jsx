import { useState } from "react";
import downArrow from "../assets/down-arrow.png";

const ToggleCategory = ({ children, categoryTitle }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="vehicle-stat">
      <div className="stat-label" onClick={() => setToggle(!toggle)}>
        <a href="#brand" onClick={() => setToggle(!toggle)}>
          {categoryTitle}
        </a>
        <img src={downArrow} alt="down arrow icon" />
      </div>
      {toggle ? children : ""}
    </div>
  );
};

export default ToggleCategory;
