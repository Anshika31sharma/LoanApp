import React from "react";
import { Formik, Field, Form } from "formik";

function Step4({ setCurrentStep, currentStep }) {
  const steps = [
    { title: "Loan detail", description: "Completed" },
    { title: "Tell us about yourself", description: "Completed" },
    { title: "Current address", description: "Completed" },
    { title: "Loan authorization", description: "In Progress" },
    { title: "Information review", description: "" },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.agreed) {
      errors.agreed = "You must agree to the terms and conditions.";
    }
    return errors;
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = (values) => {
    if (values.agreed) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className=" max-w-4xl w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 bg-gray-200">
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col text-sm">
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      currentStep > index || index === 0 || index === 1 || index === 2 || index === 3
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
                      currentStep > index || index === 0 || index === 1 || index === 2 || index === 3
                        ? "text-green-500"
                        : "text-gray-600"
                    }`}
                  >
                    Step {index + 1}
                  </span>
                </div>
                <div
                  className={`text-lg font-medium ${
                    currentStep > index || index === 0 || index === 1 || index === 2 || index === 3
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
          <h1 className="text-2xl font-semibold mb-4">Loan Authorization</h1>
          <p className="text-gray-600 mb-6">
            Review and agree to the terms and conditions to authorize the loan application.
          </p>

          <Formik
            initialValues={{ agreed: false }}
            validate={validate}
            onSubmit={handleNext}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <div className="bg-gray-100 p-4 border border-gray-300 rounded mb-6">
                  <h2 className="text-lg font-semibold mb-2">Authorization Agreement*</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    By checking this box, you authorize [Lender's Name] to review, process, and assess your personal loan application based on the information provided. You confirm that all details submitted in this application are accurate and complete to the best of your knowledge.
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Furthermore, you agree to the following:
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    1. Credit Check Authorization: You grant permission to obtain and review your credit report and financial history as part of the loan assessment process. This may include inquiries with credit reporting agencies and other relevant financial institutions.
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    2. Information Sharing: You consent to sharing your information with third parties as necessary for the purpose of loan processing and verification. This may include, but is not limited to, employment verification, income verification, and identity checks.
                  </p>
                  <p className="text-sm text-gray-600">
                    You understand that checking this box does not guarantee approval.
                  </p>
                </div>

                <div className="flex items-center mb-2">
                  <Field
                    type="checkbox"
                    id="agree"
                    name="agreed"
                    className="mr-2"
                    onChange={(e) => setFieldValue("agreed", e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree to the terms and conditions
                  </label>
                </div>
                {errors.agreed && touched.agreed && (
                  <div className="text-red-500 mb-2 text-xs">{errors.agreed}</div>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={!values.agreed}
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Step4;
