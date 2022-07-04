import { useState } from "react";

import downArrowIcon from "../assets/down-arrow.png";
import upArrowIcon from "../assets/up-arrow.png";

const FAQToggle = ({ children, question }) => {
  const [toggle, SetToggle] = useState(false);

  return (
    <div className="faq" onClick={() => SetToggle(!toggle)}>
      <div className="faq-question">
        <div className="faq-question-title">
          <h2>Q.</h2>
          <h3>{question}</h3>
        </div>

        {toggle ? (
          <img src={upArrowIcon} alt="up arrow icon" />
        ) : (
          <img src={downArrowIcon} alt="down arrow icon" />
        )}
      </div>

      {toggle ? children : ""}
    </div>
  );
};

export default FAQToggle;
