"use client";
import { FC, useState, useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";
import axios from "axios";
import { TextField, MenuItem, CircularProgress, InputAdornment } from "@mui/material";
import { Person, Email, Public, Phone } from "@mui/icons-material";
import { motion } from "framer-motion";

const Step1: FC<{ control: any; errors: any }> = ({ control, errors }) => {
  const [countryCodes, setCountryCodes] = useState<{ name: string; code: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const codes = response.data
          .map((country: any) => ({
            name: country.name.common,
            code: country.cca2,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountryCodes(codes);
      } catch (error) {
        setFetchError("Error fetching country codes. Please try again later.");
        console.error("Error fetching country codes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountryCodes();
  }, []);

  const sortedCountryCodes = useMemo(() => countryCodes, [countryCodes]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required", minLength: { value: 3, message: "At least 3 characters" } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />


      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/, message: "Invalid email" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            type="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        name="countryCode"
        control={control}
        rules={{ required: "Country code is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Country Code"
            fullWidth
            variant="outlined"
            error={!!errors.countryCode}
            helperText={errors.countryCode?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Public color="primary" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setCountryCode(e.target.value);
              field.onChange(e);
            }}
          >
            {isLoading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : fetchError ? (
              <MenuItem disabled>{fetchError}</MenuItem>
            ) : (
              sortedCountryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </MenuItem>
              ))
            )}
          </TextField>
        )}
      />

  
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: "Phone number is required",
          pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid phone number (10-15 digits)" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            variant="outlined"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="primary" />
                </InputAdornment>
              ),
            }}
            disabled={!countryCode}  
            inputProps={{
              onlyNumeric: true,
            }}
          />
        )}
      />
    </motion.div>
  );
};

export default Step1;
