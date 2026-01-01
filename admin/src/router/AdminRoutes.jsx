import BranchManagement from "../components/pages/BranchManagement";
import DistrictManagement from "../components/pages/DistrictManagement";
import ProfileManagement from "../components/pages/ProfileManagement";
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
    element: <DistrictManagement />,
  },
  {
    path: "branch",
    element: <BranchManagement />,
  },
  {
    path: "profile",
    element: <ProfileManagement />,
  },
];
