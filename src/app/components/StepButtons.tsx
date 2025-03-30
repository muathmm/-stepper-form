"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/zustandStore";

interface StepButtonsProps {
  currentStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  steps: string[];
  trigger: (name?: string | string[]) => Promise<boolean>;
  resetForm: () => void;
  data: any;
  stepFields: string[][]; 
}

const StepButtons: FC<StepButtonsProps> = ({
  currentStep,
  setCurrentStep,
  steps,
  trigger,
  resetForm,
  data,
  stepFields,
}) => {
  const { setData, addRecord, records } = useStore();

  const handleNext = async () => {
    const skipValidation = currentStep >= 3;

    if (!skipValidation) {
      const isStepValid = await trigger(stepFields[currentStep]);
      if (!isStepValid) return;
    }

    setData(data);

    if (currentStep === steps.length - 2) {
      console.log("✅ Form data before adding record:", data);
      addRecord({ ...data });
      console.log("✅ Records after adding:", records);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      resetForm();
      if (window.confirm("Are you sure you want to finish and reset?")) {
        setCurrentStep(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex justify-between mt-8">
      {!(
        currentStep === steps.length - 1
      ) && ( // إخفاء زر "Previous" عند المرحلة الأخيرة
        <motion.button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 shadow-md ${
            currentStep === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          }`}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
        >
          Previous
        </motion.button>
      )}

      <motion.button
        type="button"
        onClick={handleNext}
        className={`px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 shadow-md ${
          currentStep === steps.length - 1
            ? "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-300"
            : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentStep === steps.length - 1 ? "Finish" : "Next"}
      </motion.button>
    </div>
  );
};

export default StepButtons;
