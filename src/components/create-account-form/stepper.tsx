import React from "react";

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 3;

  return (
    <div>
      <h4 className="md:text-sm text-[10px] font-semibold text-gray-700 mb-2">
        Step {currentStep}
      </h4>
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 mx-1 rounded-full ${
              i + 1 <= currentStep ? "bg-yellow-400" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Stepper;
