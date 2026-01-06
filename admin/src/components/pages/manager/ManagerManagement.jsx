import Select from "../../shared/Select";
import { useGetbranchManagerQuery } from "../../../redux/features/managerSlice";
import DetailsModal from "../../shared/Modal";
import { useState } from "react";
import { useGetProvinceQuery } from "../../../redux/features/provinceSlice";
import Input from "../../shared/Input";

const ManagerManagement = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { data: manager, isLoading, error } = useGetbranchManagerQuery();
  const { data: provinces } = useGetProvinceQuery();
  
  console.log("Manager API Response:", manager);
  console.log("Is Loading:", isLoading);
  console.log("Error:", error);
  console.log(provinces);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("API Error:", error);
    return (
      <div>Error loading managers: {error.message || "Unknown error"}</div>
    );
  }

  const managers = manager?.data || [];
  console.log("Managers array:", managers);
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
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
              onClick={() => setShowModal(true)}
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
              {managers?.length > 0 ? (
                managers?.map((item, index) => (
                  <tr
                    key={item.branch_id}
                    className="border-b hover:bg-gray-50"
                  >
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
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No managers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Add Manager"
        size="3xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-3">Province</label>
              <div className="w-full">
                <Select
                  // options={provinceOptions}
                  // value={selectedProvince}
                  // onChange={handleProvinceChange}
                  placeholder="Select Province"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">District</label>
              <div className="w-full">
                <Select
                  // options={districtOptions}
                  // value={selectedDistrict}
                  // onChange={handleDistrictChange}
                  placeholder="Select District"
                  // disabled={!selectedProvince}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Branch</label>
              <div className="w-full">
                <Select
                  // options={branchOptions}
                  // value={selectedBranch}
                  // onChange={(e) => setSelectedBranch(e.target.value)}
                  // placeholder="Select Branch"
                  // disabled={!selectedDistrict}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add Manager
            </button>
          </div>
        </div>
      </DetailsModal>
    </>
  );
};

export default ManagerManagement;
