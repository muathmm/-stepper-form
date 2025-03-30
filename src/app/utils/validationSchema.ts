import * as Yup from "yup";
export const stepValidationSchemas = [
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    countryCode: Yup.string().required("Country code is required"),
    phoneNumber: Yup.string().matches(/^[0-9]{7,15}$/, "Phone number must be 7-15 digits").required("Phone number is required"),
  }),
  Yup.object().shape({
    startDate: Yup.date().min(new Date(), "Start date must be today or later").required("Start date is required"),
    endDate: Yup.date().min(Yup.ref("startDate"), "End date must be after start date").required("End date is required"),
  }),
  Yup.object().shape({
    accountType: Yup.string()
      .oneOf(["Personal", "Business"])
      .required("Account type is required")
      .default("Personal"), 
    idNumber: Yup.string().when("accountType", {
      is: "Personal",
      then: (schema) => schema.required("ID number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    companyName: Yup.string().when("accountType", {
      is: "Business",
      then: (schema) => schema.required("Company name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    registrationNumber: Yup.string().when("accountType", {
      is: "Business",
      then: (schema) => schema.required("Registration number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
];
