// app/page.tsx


import StepperForm from "./components/StepperForm";

export default function Home() {
  const initialData = {
    accountType: "Personal",
    idNumber: "",
    companyName: "",
    registrationNumber: "",
  };

  return <StepperForm initialData={initialData} />;
}
