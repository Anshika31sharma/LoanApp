import React, { useState, useEffect } from "react";

function Step3({ setCurrentStep, currentStep }) {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const steps = [
    { title: "Loan detail", description: "Completed" },
    { title: "Tell us about yourself", description: "Completed" },
    { title: "Current address", description: "In Progress" },
    { title: "Loan authorization", description: "" },
    { title: "Information review", description: "" },
  ];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("step3FormData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip.trim() || isNaN(formData.zip)) {
      newErrors.zip = "Valid ZIP code is required.";
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit phone number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("step3FormData", JSON.stringify(formData));
      setCurrentStep(4);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className=" max-w-4xl w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 mr-0 lg:mr-10 bg-gray-200">
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col text-sm">
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index === 0 || index === 1 || index === 2
                        ? "bg-green-500 text-white"
                        : currentStep === index + 1
                        ? "bg-blue-500 text-white"
                        : currentStep > index
                        ? "bg-green-500 text-white"
                        : "border border-gray-300 text-gray-500"
                    }`}
                  >
                    {currentStep > index ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-circle"></i>
                    )}
                  </div>
                  <span
                    className={`ml-2 font-medium ${
                      index === 0 || index === 1 || index === 2
                        ? "text-green-500"
                        : currentStep === index + 1
                        ? "text-blue-500"
                        : currentStep > index
                        ? "text-green-500"
                        : "text-gray-600"
                    }`}
                  >
                    Step {index + 1}
                  </span>
                </div>
                <div
                  className={`text-lg font-medium ${
                    index === 0 || index === 1 || index === 2
                      ? "text-green-500"
                      : currentStep === index + 1
                      ? "text-blue-500"
                      : currentStep > index
                      ? "text-green-500"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-blue-600">{step.description}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-2/3 pl-0 lg:pl-8">
          <h2 className="text-2xl font-semibold mb-4">Address Details</h2>
          <p className="text-gray-600 mb-6">Please provide your address details.</p>
          <form>
            {[{ id: "address", label: "Street Address*", type: "text" },
              { id: "city", label: "City*", type: "text" },
              { id: "state", label: "State*", type: "text" },
              { id: "zip", label: "ZIP Code*", type: "text" },
              { id: "phone", label: "Phone Number*", type: "text" }].map(({ id, label, type }) => (
              <div className="mb-4" key={id}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                  {label}
                </label>
                <input
                  className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  ${
                    errors[id] ? "border-red-500" : ""
                  }`}
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                />
                {errors[id] && <p className="text-red-500 text-xs italic">{errors[id]}</p>}
              </div>
            ))}

            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Step3;
