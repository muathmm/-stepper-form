"use client";
import { FC, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, AnimatePresence } from "framer-motion";
import { stepValidationSchemas } from "../utils/validationSchema"; 
import { useStore } from "../store/zustandStore";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import StepButtons from "../components/StepButtons";

const steps = ["Basic Information", "Select Duration", "Additional Settings", "Review Data", "Table"];

const stepFields = [
  ["name", "email", "countryCode", "phoneNumber"], // Step 1
  ["startDate", "endDate"], // Step 2
  ["accountType", "idNumber", "companyName", "registrationNumber"], // Step 3
  [], 
  [], 
];

const StepperForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, setData } = useStore();

  const methods = useForm({
    defaultValues: data,
    resolver: yupResolver(stepValidationSchemas[currentStep]),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors, isValid },
    trigger,
    getValues,
    reset,
  } = methods;

  useEffect(() => {
    trigger();
    console.log(getValues);
  }, [currentStep, trigger]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <motion.div
        className="max-w-3xl w-full bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 70 }}
        >
          {steps[currentStep]}
        </motion.h1>

        <FormProvider {...methods}>
          <form className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {currentStep === 0 && <Step1 control={control} errors={errors} />}
                {currentStep === 1 && <Step2 control={control} errors={errors} />}
                {currentStep === 2 && <Step3 control={control} errors={errors} />}
                {currentStep === 3 && <Step4 data={getValues()} />}
                {currentStep === 4 && <Step5 />}
              </motion.div>
            </AnimatePresence>

            <StepButtons
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              steps={steps}
              isValid={isValid}
              data={getValues()}
              stepFields={stepFields} 
              trigger={trigger} 
              resetForm={() => reset()} 
            />
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
};

export default StepperForm;
