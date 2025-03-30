import { FC, useEffect, useState } from "react";
import { useStore } from "../store/zustandStore";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa"; 

const Step5: FC = () => {
  const { records } = useStore();

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]); 

  useEffect(() => {
    filterData(search);
  }, [search, records]);


  const columns = [
    { name: "Name", selector: (row: any) => row.name, sortable: true },
    { name: "Email", selector: (row: any) => row.email, sortable: true },
    { name: "Country Code", selector: (row: any) => row.countryCode },
    { name: "Phone Number", selector: (row: any) => row.phoneNumber },
    { name: "Start Date", selector: (row: any) => row.startDate },
    { name: "End Date", selector: (row: any) => row.endDate },
    { name: "Account Type", selector: (row: any) => row.accountType },
    { name: "ID Number", selector: (row: any) => row.idNumber || "N/A" },
    { name: "Company Name", selector: (row: any) => row.companyName || "N/A" },
    {
      name: "Registration Number",
      selector: (row: any) => row.registrationNumber || "N/A",
    },
  ];


  const filterData = (searchTerm: string) => {
    const filtered = records.filter((record) => {
      return Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center">All Submitted Records</h2>
      <div className="flex items-center space-x-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          noHeader
          className="rounded-lg border border-gray-200 mt-6 shadow-lg"
          theme="solarized"
        />
      ) : (
        <p className="text-gray-500 text-center mt-6">No records found.</p>
      )}
    </div>
  );
};

export default Step5;
