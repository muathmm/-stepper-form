"use client";
import { FC, useEffect } from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { TextField, InputAdornment } from "@mui/material";
import { Event } from "@mui/icons-material";

const Step2: FC<{ control: any; errors: any }> = ({ control, errors }) => {

  useEffect(() => {
    if (errors.startDate || errors.endDate) {
      console.log("Validation error:", errors);
    }
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">Start Date</label>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Event color="primary" />
                  </InputAdornment>
                ),
              }}
              className="rounded-md"
            />
          )}
        />
      </div>

      {/* حقل تاريخ الانتهاء */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-1">End Date</label>
        <Controller
          name="endDate"
          control={control}
          rules={{
            required: "End date is required",
            validate: (value, context) => {
              const startDate = context.startDate;
              if (startDate && value < startDate) {
                return "End date must be after the start date";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Event color="primary" />
                  </InputAdornment>
                ),
              }}
              className="rounded-md"
            />
          )}
        />
      </div>
    </motion.div>
  );
};

export default Step2;
