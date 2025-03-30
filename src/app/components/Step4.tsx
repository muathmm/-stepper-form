import { FC, useState, useEffect } from "react";
import { useStore } from "../store/zustandStore";
import Modal from "react-modal";

const Step4: FC = () => {
  const { data, setData } = useStore(); // استخدام البيانات من Zustand
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log("Step4 received data:", data);
  }, [data]);

  const handleEdit = (
    e: React.MouseEvent,
    field: string,
    value: string | undefined
  ) => {
    e.preventDefault();
    setEditingField(field);
    setFieldValue(value);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingField) {
      const updatedData = {
        ...data,
        [editingField]: fieldValue,
      };
      setData(updatedData); // تحديث البيانات في Zustand
      console.log(`Updated ${editingField} with value:`, fieldValue);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Review Your Information
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg space-y-5">
        {/* Editable fields */}
        {[
          { label: "Name", field: "name", value: data.name },
          { label: "Email", field: "email", value: data.email },
          { label: "Country Code", field: "countryCode", value: data.countryCode },
          { label: "Phone Number", field: "phoneNumber", value: data.phoneNumber },
        ].map(({ label, field, value }) => (
          <div key={field} className="flex justify-between items-center border-b pb-4">
            <p className="font-medium text-gray-700">
              <strong>{label}:</strong> {value || "N/A"}
            </p>
            <button
              onClick={(e) => handleEdit(e, field, value)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>
        ))}

        {/* Static fields */}
        <div className="flex justify-between items-center border-b pb-4">
          <p className="font-medium text-gray-700">
            <strong>Start Date:</strong> {data.startDate || "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center border-b pb-4">
          <p className="font-medium text-gray-700">
            <strong>End Date:</strong> {data.endDate || "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center border-b pb-4">
          <p className="font-medium text-gray-700">
            <strong>Account Type:</strong> {data.accountType || "N/A"}
          </p>
        </div>

        {/* Conditional fields for Personal and Business */}
        {data.accountType === "Personal" && (
          <div className="flex justify-between items-center border-b pb-4">
            <p className="font-medium text-gray-700">
              <strong>ID Number:</strong> {data.idNumber || "N/A"}
            </p>
            <button
              onClick={(e) => handleEdit(e, "idNumber", data.idNumber)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          </div>
        )}

        {data.accountType === "Business" && (
          <>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-medium text-gray-700">
                <strong>Company Name:</strong> {data.companyName || "N/A"}
              </p>
              <button
                onClick={(e) => handleEdit(e, "companyName", data.companyName)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-medium text-gray-700">
                <strong>Registration Number:</strong>{" "}
                {data.registrationNumber || "N/A"}
              </p>
              <button
                onClick={(e) =>
                  handleEdit(e, "registrationNumber", data.registrationNumber)
                }
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Field"
        ariaHideApp={false}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Edit {editingField}
          </h3>
          <input
            type="text"
            value={fieldValue || ""}
            onChange={(e) => setFieldValue(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Step4;
