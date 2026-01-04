import Select from "../../shared/Select";
import { useGetbranchManagerQuery } from "../../../redux/features/managerSlice";
import DetailsModal from "../../shared/Modal";
import { useState } from "react";

const ManagerManagement = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const { data: manager, isLoading, error } = useGetbranchManagerQuery();

  console.log("Manager API Response:", manager);
  console.log("Is Loading:", isLoading);
  console.log("Error:", error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("API Error:", error);
    return <div>Error loading managers: {error.message || 'Unknown error'}</div>;
  }

  const managers = manager?.data || [];
  console.log("Managers array:", managers);

  const actionOptions = [{ value: "Delete", label: "Delete" }];
  const handleActionChange = (e, manager) => {
    const action = e.target.value;
  };
  return (
    <>
      <div>
        <div className="w-full bg-white shadow rounded-lg overflow-hidden">
          <div className="text-xl pb-7 font-bold flex justify-between">
            <h1>Managers List</h1>
            <button
              onClick={() => setShowModel(true)}
              className="bg-blue-600 text-white px-2 py-1 text-xs rounded-lg hover:bg-blue-700 ml-4 mr-4"
            >
              Add New Manager
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  S.N
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Branch ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {managers.length > 0 ? (
                managers.map((item, index) => (
                  <tr key={item.branch_id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.branch_id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Select
                        options={actionOptions}
                        placeholder="Action"
                        onChange={(e) => handleActionChange(e, item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    No managers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DetailsModal
        show={showModel}
        onClose={() => setShowModel(false)}
      ></DetailsModal>
    </>
  );
};

export default ManagerManagement;
