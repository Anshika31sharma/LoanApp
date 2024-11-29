import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

function Step1() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { title: "Loan detail", description: "In Progress" },
    { title: "Tell us about yourself", description: "" },
    { title: "Current Address", description: "" },
    { title: "Loan authorization", description: "" },
    { title: "Information Review", description: "" }
  ];

  const validationSchema = Yup.object({
    loanAmount: Yup.number()
      .min(50000, "Minimum loan amount is ₹50,000")
      .max(5000000, "Maximum loan amount is ₹50,00,000")
      .required("Loan amount is required"),
    loanTerm: Yup.number()
      .min(12, "Minimum term is 12 months")
      .max(72, "Maximum term is 72 months")
      .required("Loan term is required"),
    interestRate: Yup.number()
      .min(10.85, "Interest rate must be at least 10.85%")
      .max(16.25, "Interest rate must be at most 16.25%")
      .required("Interest rate is required")
  });

  const handleSubmit = (values) => {
    localStorage.setItem("loanDetails", JSON.stringify(values));
    setCurrentStep(2);
  };

  if (currentStep === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className=" w-full max-w-4xl">
          <div className="flex flex-col  gap-4 lg:flex-row">
            <div className="w-full lg:w-1/3 p-4 mb-8 lg:mb-0 bg-gray-200">
              {steps.map((step, index) => (
                <div key={index} className="mb-8">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        currentStep > index
                          ? "bg-green-500 text-white"
                          : currentStep === index + 1
                          ? "bg-blue-500 text-white"
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
                        currentStep > index
                          ? "text-green-500"
                          : currentStep === index + 1
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      Step {index + 1}
                    </span>
                  </div>
                  <div
                    className={`text-lg font-medium ${
                      currentStep > index
                        ? "text-green-500"
                        : currentStep === index + 1
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-blue-600">{step.description}</div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-medium mb-2">Loan Detail</h2>
              <p className="text-gray-500 mb-6">
                Provide the essential details of your loan application, including the amount and term.
              </p>
              <Formik
                initialValues={{
                  loanAmount: 230000,
                  loanTerm: 14,
                  interestRate: 11
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values, errors, touched }) => (
                  <Form>
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Loan Amount*</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={`₹ ${values.loanAmount.toLocaleString()}`}
                        readOnly
                      />
                      <div className="flex justify-between text-gray-500 text-sm">
                        <span>₹ 50,000</span>
                        <span>₹ 50,00,000</span>
                      </div>
                      <input
                        type="range"
                        className="w-full mt-2"
                        min="50000"
                        max="5000000"
                        value={values.loanAmount}
                        onChange={(e) =>
                          setFieldValue("loanAmount", parseInt(e.target.value))
                        }
                      />
                      {errors.loanAmount && touched.loanAmount && (
                        <div className="text-red-500 text-sm">{errors.loanAmount}</div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Loan Term*</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={`${values.loanTerm} Months`}
                        readOnly
                      />
                      <div className="flex justify-between text-gray-500 text-sm">
                        <span>12 Months</span>
                        <span>72 Months</span>
                      </div>
                      <input
                        type="range"
                        className="w-full mt-2"
                        min="12"
                        max="72"
                        value={values.loanTerm}
                        onChange={(e) =>
                          setFieldValue("loanTerm", parseInt(e.target.value))
                        }
                      />
                      {errors.loanTerm && touched.loanTerm && (
                        <div className="text-red-500 text-sm">{errors.loanTerm}</div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">Interest Rate*</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={`${values.interestRate}%`}
                        readOnly
                      />
                      <div className="flex justify-between text-gray-500 text-sm">
                        <span>10.85% p.a.</span>
                        <span>16.25% p.a.</span>
                      </div>
                      <input
                        type="range"
                        className="w-full mt-2"
                        min="10.85"
                        max="16.25"
                        step="0.01"
                        value={values.interestRate}
                        onChange={(e) =>
                          setFieldValue("interestRate", parseFloat(e.target.value))
                        }
                      />
                      {errors.interestRate && touched.interestRate && (
                        <div className="text-red-500 text-sm">{errors.interestRate}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 rounded"
                    >
                      Next
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return <Step2 setCurrentStep={setCurrentStep} />;
  }
  if (currentStep === 3) {
    return <Step3 setCurrentStep={setCurrentStep} />;
  }
  if (currentStep === 4) {
    return <Step4 setCurrentStep={setCurrentStep} />;
  }
  if (currentStep === 5) {
    return <Step5 setCurrentStep={setCurrentStep} />;
  }
  if (currentStep === 6) {
    return <Step6 setCurrentStep={setCurrentStep} />;
  }
}

export default Step1;
