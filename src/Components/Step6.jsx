import { FaCheck } from 'react-icons/fa';

function Step6() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center">
          <FaCheck className="text-white text-4xl" />
        </div>
      </div>
      <p className="text-lg font-medium">Thank you! </p>
      <p className="text-lg font-medium">Your application has been successfully submitted.</p>
    </div>
  );
}

export default Step6;
