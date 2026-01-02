import Select from "../../shared/Select";
import { useGetbranchManagerQuery } from "../../../redux/features/managerSlice";
const ManagerManagement = () => {
  const { data: manager, isLoading } = useGetbranchManagerQuery();
  console.log(manager);
  if (isLoading) {
    return <div>isLoading</div>;
  }

  const data = manager?.data || [];
  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];

  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-3xl pb-7 font-bold ">
        <h1 className="text-green">Manager Management Dashboard</h1>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Manager ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Manager Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.branch_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-slate-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_id}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">{item.email}</td>
              <td className="px-4 py-3 text-sm">
                <Select
                  options={actionOptions}
                  placeholder="Action"
                  onChange={(e) => console.log(e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerManagement;
