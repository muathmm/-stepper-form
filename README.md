# 📚 **README for Multi-Step Form Application**

---

### 🎯 **Project Overview**

The **Multi-Step Form Application** is built using **Next.js (latest version)** and provides a seamless, step-by-step form submission process. The form is designed to collect and validate user inputs across multiple steps with real-time feedback and a responsive UI.

✅ **Key Features:**
- Multi-step form with dynamic navigation.
- State management using **Zustand** for persisting data across steps.
- Form validation using **React Hook Form** and **Yup**.
- Fetching country codes dynamically from `restcountries.com` with a dropdown selection.
- Input validation for emails, dates, and conditionally required fields.
- Table to display submitted data with **search, sorting, and pagination**.
- Smooth transitions and animations between steps using **Framer Motion**.

---

### 🛠️ **Tech Stack**

| Technology        | Purpose                       |
|-------------------|-------------------------------|
| **Next.js**        | Core framework for the application |
| **Tailwind CSS**   | Styling and responsive design |
| **Zustand**        | State management across steps |
| **React Hook Form**| Form handling and validations |
| **Yup**            | Schema validation for input fields |
| **Framer Motion**  | Smooth animations and transitions |

---

### ⚡️ **Features and Functionalities**

---

### 1️⃣ **Basic Information**
- Input fields: `Name`, `Email`.
- Country code fetched dynamically from `restcountries.com` and displayed in a dropdown.
- Phone number input enabled after selecting a country code.
- ✅ **Validation:** Email format and required fields.

---

### 2️⃣ **Select Duration**
- Select **Start Date** (must be today or a future date).
- Select **End Date** (must be after the start date).
- ✅ **Validation:** Date constraints to ensure correct input.

---

### 3️⃣ **Additional Settings**
- Choose account type: `Personal` or `Business`.
- If `Personal` → Input `ID Number`.
- If `Business` → Input `Company Name` and `Commercial Registration Number`.
- ✅ **Conditional Fields:** Dynamically change inputs based on selection.

---

### 4️⃣ **Review Data**
- Display a summary of all input data.
- Option to **Edit** previous steps before submission.
- Button to **Confirm Data** and save it to Zustand.

---

### 5️⃣ **Display Data in a Table**
- After submission, all data is displayed in a table.
- ✅ **Search and Sort:** Users can search and sort records.
- ✅ **Pagination:** Efficient data handling with pagination.

---

### 🎨 **UI/UX Enhancements**
- Smooth transitions between steps using **Framer Motion**.
- Conditional rendering for `Previous` and `Next` buttons.
- Real-time feedback for form errors and validation.
- Intuitive and responsive design with **Tailwind CSS**.

---

### 📈 **State Management with Zustand**
- **setData():** Save form data between steps.
- **addRecord():** Add validated data to the records.
- **records:** Store all submitted records for display.

---

### ✅ **Validation and Error Handling**
- **React Hook Form** manages the form state and submissions.
- **Yup** ensures proper validation of fields, including:
  - Email format validation.
  - Date constraints (start and end dates).
  - Conditional validations based on account type.

---

### 🗂️ **Project Structure**

