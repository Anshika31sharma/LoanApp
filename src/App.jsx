import React, { useState } from "react";
import Step1 from "./Components/Step1";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Step4 from "./Components/Step4";
import Step5 from "./Components/Step5";
import Step6 from "./Components/Step6";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 setCurrentStep={setCurrentStep} />;
      case 2:
        return <Step2 setCurrentStep={setCurrentStep} />;
      case 3:
        return <Step3 setCurrentStep={setCurrentStep} />;
      case 4:
        return <Step4 setCurrentStep={setCurrentStep} />;
      case 5:
        return <Step5 setCurrentStep={setCurrentStep} />;
      case 6:
        return <Step6 setCurrentStep={setCurrentStep} />;
      default:
        return <Step1 setCurrentStep={setCurrentStep} />;
    }
  };

  return (
    <div className="min-h-screen ">
      {renderStep()}
    </div>
  );
}

export default App;
