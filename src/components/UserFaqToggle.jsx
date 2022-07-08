import { useState } from "react";

import downArrowIcon from "../assets/down-arrow.png";
import upArrowIcon from "../assets/up-arrow.png";

const UserFaqToggle = ({ children, question }) => {
  const [toggle, SetToggle] = useState(false);

  return (
    <div className="user-faq" onClick={() => SetToggle(!toggle)}>
      <div className="user-faq-question">
        <div className="user-faq-question-title">
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

export default UserFaqToggle;
