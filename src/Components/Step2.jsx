import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Step2({ setCurrentStep, currentStep }) {
  const savedData = JSON.parse(localStorage.getItem("step1FormData")) || {};
  
  const initialValues = {
    firstName: savedData.firstName || "",
    lastName: savedData.lastName || "",
    email: savedData.email || "",
    dob: savedData.dob || "",
    monthlyIncome: savedData.monthlyIncome || "",
  };

  const steps = [
    { title: "Loan detail", description: "Completed" },
    { title: "Tell us about yourself", description: "In progress" },
    { title: "Current address", description: "" },
    { title: "Loan authorization", description: "" },
    { title: "Information review", description: "" },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email("Invalid email address.").required("Email is required."),
    dob: Yup.string().required("Date of birth is required."),
    monthlyIncome: Yup.number()
      .typeError("Monthly income must be a number.")
      .positive("Monthly income must be positive.")
      .required("Monthly income is required."),
  });

  const handleSubmit = (values) => {
    localStorage.setItem("step2FormData", JSON.stringify(values));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="gap-4 md:p-8 max-w-4xl w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 bg-gray-200">
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col text-sm">
                <div className="flex items-center mb-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index === 0 || index === 1
                        ? "bg-green-500 text-white"
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
                      currentStep > index
                        ? "text-green-500"
                        : currentStep === index + 1
                        ? "text-blue-500"
                        : index === 0 || index === 1
                        ? "text-green-500"
                        : "text-gray-600"
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
                      : index === 0 || index === 1
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
        <div className="w-full md:w-2/3 pl-4 md:pl-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tell us about yourself</h2>
          <p className="text-gray-600 mb-6">Please provide your personal details.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {[
                  { name: "firstName", label: "First Name*", type: "text" },
                  { name: "lastName", label: "Last Name*", type: "text" },
                  { name: "email", label: "Email*", type: "email" },
                  { name: "dob", label: "Date of Birth*", type: "date" },
                  { name: "monthlyIncome", label: "Monthly Income*", type: "number" },
                ].map(({ name, label, type }) => (
                  <div className="mb-6" key={name}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                      {label}
                    </label>
                    <Field
                      id={name}
                      name={name}
                      type={type}
                      className=" appearance-none border-2 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <ErrorMessage
                      name={name}
                      component="p"
                      className="text-red-500 text-xs italic mt-2"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default Step2;
