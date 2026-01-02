import Select from "../../shared/Select";
import { useGetBranchQuery } from "../../../redux/features/branchSlice";
const BranchManagement = () => {
  const { data: branch, isLoading } = useGetBranchQuery();
  console.log(branch);
  if (isLoading) {
    return <div>isLoading</div>;
  }

  const data = branch.data || [];
  const actionOptions = [
    { value: "Delete", label: "Delete" },
    { value: "view", label: "View" },
  ];

  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden">
      <div className="text-3xl pb-7 font-bold ">
        <h1 className="text-green">Branch Management Dashboard</h1>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              S.N
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              District Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Branch ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Branch Name
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
                {item.district_name}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_id}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.branch_name}
              </td>
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

export default BranchManagement;
