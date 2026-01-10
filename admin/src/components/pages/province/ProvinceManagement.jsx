import Select from "../../shared/Select";
import { useGetProvinceQuery } from "../../../redux/features/provinceSlice";
import { useState } from "react";
import DetailsModal from "../../shared/Modal";

const ProvinceManagement = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProvince, setDeletingProvince] = useState(false);
  const { data: province, isLoading } = useGetProvinceQuery();
  if (isLoading) {
    return <div>isLoading</div>;
  }

  const data = province.data || [];
  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];
  const handleActionChange = (e, province) => {
    const action = e.target.value;
    if (action === "view") {
      setSelectedProvince(province);
      setShowModal(true);
    } else if (action === "Delete") {
      setShowDeleteModal(true);
      setDeletingProvince(province);
    }
    e.target.value = "";
  };
  return (
    <>
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="text-3xl pb-7 font-bold ">
          <h1>Province Management Dashboard</h1>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                S.N
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Province Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.province_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-slate-600">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_id}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {item.province_name}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Select
                    options={actionOptions}
                    placeholder="Action"
                    onChange={(e) => handleActionChange(e, item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Districts in ${selectedProvince?.province_name}`}
        size="lg"
      >
        <div className="space-y-2">
          {selectedProvince?.district_name ? (
            selectedProvince.district_name.split(",").map((district, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <span className="font-medium">{district}</span>
              </div>
            ))
          ) : (
            <div>No district Found</div>
          )}
        </div>
      </DetailsModal>
      <DetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Province"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this province?{" "}
            <strong>{deletingProvince?.province_name}</strong>
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700
                  disabled:bg-red-400"
            >
              Delete
              {/*{deleteLoading ? "Deleting...":"Delete"}*/}
            </button>
          </div>
        </div>
      </DetailsModal>
    </>
  );
};

export default ProvinceManagement;
