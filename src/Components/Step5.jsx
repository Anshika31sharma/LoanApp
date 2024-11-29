import React, { useState, useEffect } from "react";
import Step6 from "./Step6";

function Step5({ setCurrentStep, currentStep }) {
  const [formData, setFormData] = useState({
    loanInfo: {},
    personalInfo: {},
    addressInfo: {},
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loanInfo = JSON.parse(localStorage.getItem("loanDetails"));
    const personalInfo = JSON.parse(localStorage.getItem("step2FormData"));
    const addressInfo = JSON.parse(localStorage.getItem("step3FormData"));

    setFormData({
      loanInfo: loanInfo || {},
      personalInfo: personalInfo || {},
      addressInfo: addressInfo || {},
    });
  }, []);

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <Step6 />;
  }

  const stepDescriptions = [
    "Completed",
    "Completed",
    "Completed",
    "Completed",
    "In Progress",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 bg-gray-200 mb-6 lg:mb-0">
          <ul className="space-y-4">
            {["Loan detail", "Tell us about yourself", "Current address", "Loan authorization", "Information review"].map(
              (step, index) => (
                  <li key={index} className="flex flex-col text-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center bg-green-500 text-white`}
                    >
                      {index === 4 ? <i className="fas fa-check"></i> : <i className="fas fa-circle"></i>}
                    </div>
                    <span className="ml-2 text-green-500">Step {index + 1}</span>
                  </div>
                  <div className="text-lg font-medium text-green-500">{step}</div>
                  <div className="text-sm text-blue-600">{stepDescriptions[index]}</div> {/* Description added here */}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="w-full lg:w-2/3 pl-0 lg:pl-8">
          <h1 className="text-2xl font-semibold mb-4">Review Your Information</h1>

          <h2 className="text-lg font-semibold mb-4">Loan Details</h2>
          <div className="mb-4">
            <p>Loan Amount: ${formData.loanInfo.loanAmount || "N/A"}</p>
            <p>Loan Term: {formData.loanInfo.loanTerm || "N/A"} months</p>
            <p>Interest Rate: {formData.loanInfo.interestRate || "N/A"}%</p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="mb-4">
            <p>
              Name: {formData.personalInfo.firstName && formData.personalInfo.lastName
                ? `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`
                : "N/A"}
            </p>
            <p>Email: {formData.personalInfo.email || "N/A"}</p>
            <p>Date of Birth: {formData.personalInfo.dob || "N/A"}</p>
            <p>Monthly Income: {formData.personalInfo.monthlyIncome || "N/A"}</p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="mb-6">
            <p>Address: {formData.addressInfo.address || "N/A"}</p>
            <p>City: {formData.addressInfo.city || "N/A"}</p>
            <p>State: {formData.addressInfo.state || "N/A"}</p>
            <p>ZIP Code: {formData.addressInfo.zip || "N/A"}</p>
            <p>Phone: {formData.addressInfo.phone || "N/A"}</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step5;
