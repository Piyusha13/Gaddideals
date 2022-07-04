import { useState } from "react";

import SellerFormVehicle from "./SellerFormVehicle";
import SellerFormRegistration from "./SellerFormRegistration";
import SellerVehicleDetail from "./SellerVehicleDetail";
import SellerPreviewDetails from "./SellerPreviewDetails";

const SellerForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return (
        <>
          <SellerFormVehicle nextStep={nextStep} />
        </>
      );
    case 2:
      return (
        <>
          <SellerFormRegistration nextStep={nextStep} />
        </>
      );
    case 3:
      return (
        <>
          <SellerVehicleDetail nextStep={nextStep} />
        </>
      );
    case 4:
      return (
        <>
          <SellerPreviewDetails />
        </>
      );
    default:
      break;
  }
};

export default SellerForm;
