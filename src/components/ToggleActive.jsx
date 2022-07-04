import { useState } from "react";

const ToggleActive = ({ children }) => {
  const [activeTab, setActiveTab] = useState(false);

  const handleActiveTab = () => {
    setActiveTab(!activeTab);
  };
  return (
    <div
      className={`owner year transmission-type permit condition ${
        activeTab ? "active" : ""
      }`}
      onClick={handleActiveTab}
    >
      {children}
    </div>
  );
};

export default ToggleActive;
