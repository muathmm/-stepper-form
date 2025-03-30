import { FC } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaIdCard, FaBuilding } from "react-icons/fa";

const Step3: FC<{ control: any; errors: any }> = ({ control, errors }) => {
  const { control: formControl } = useFormContext();
  const accountType = useWatch({ control: formControl, name: "accountType", defaultValue: "Personal" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-xl"
    >
      <h2 className="text-3xl font-extrabold text-gray-800 text-center">Account Information</h2>

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">Account Type</label>
        <Controller
          name="accountType"
          control={formControl}
          defaultValue="Personal" // تعيين القيمة الافتراضية
          rules={{
            required: "Account type is required", // إضافة الفاليديشن للـ accountType
          }}
          render={({ field }) => (
            <div className="relative w-full">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <select
                {...field}
                className="w-full p-4 pl-12 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>
            </div>
          )}
        />
        {errors?.accountType && (
          <span className="text-red-500 text-sm">{errors.accountType.message}</span>
        )}
      </div>

      {/* Conditional Fields */}
      {accountType === "Personal" ? (
        <PersonalFields control={control} errors={errors} />
      ) : (
        <BusinessFields control={control} errors={errors} />
      )}
    </motion.div>
  );
};

// Personal Fields Component
const PersonalFields = ({ control, errors }: any) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2">ID Number</label>
    <div className="relative w-full">
      <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <Controller
        name="idNumber"
        control={control}
        rules={{
          required: "ID number is required for personal accounts",
          pattern: {
            value: /^[A-Z0-9]{8,12}$/,
            message: "ID number must be 8-12 alphanumeric characters",
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="w-full p-4 pl-12 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Enter your ID number"
          />
        )}
      />
    </div>
    {errors?.idNumber && (
      <span className="text-red-500 text-sm">{errors.idNumber.message}</span>
    )}
  </div>
);

// Business Fields Component
const BusinessFields = ({ control, errors }: any) => (
  <>
    <div>
      <label className="block text-gray-700 text-sm font-semibold mb-2">Company Name</label>
      <div className="relative w-full">
        <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Controller
          name="companyName"
          control={control}
          rules={{
            required: "Company name is required for business accounts",
            minLength: { value: 3, message: "Company name must be at least 3 characters long" },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-4 pl-12 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter company name"
            />
          )}
        />
      </div>
      {errors?.companyName && (
        <span className="text-red-500 text-sm">{errors.companyName.message}</span>
      )}
    </div>

    <div>
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        Commercial Registration Number
      </label>
      <div className="relative w-full">
        <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Controller
          name="registrationNumber"
          control={control}
          rules={{
            required: "Registration number is required for business accounts",
            pattern: {
              value: /^[A-Z0-9]{6,15}$/,
              message: "Registration number must be 6-15 alphanumeric characters",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-4 pl-12 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter registration number"
            />
          )}
        />
      </div>
      {errors?.registrationNumber && (
        <span className="text-red-500 text-sm">{errors.registrationNumber.message}</span>
      )}
    </div>
  </>
);

export default Step3;
