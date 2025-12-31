import DistrictManagement from "../components/pages/DistrictManagement";
import ProvinceManagement from "../components/pages/ProvinceManagement";

const Dashboard = () => <div>Dashboard</div>;
export const adminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "province",
    element: <ProvinceManagement />,
  },
  {
    path: "district",
    element: <DistrictManagementManagement />,
  },
];
