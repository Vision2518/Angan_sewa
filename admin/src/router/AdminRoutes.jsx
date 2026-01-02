import BranchManagement from "../components/pages/branch/BranchManagement";
import DistrictManagement from "../components/pages/districts/DistrictManagement";
import ProfileManagement from "../components/pages/profile/ProfileManagement";
import ProvinceManagement from "../components/pages/province/ProvinceManagement";
import DashboardManagement from "../components/pages/DashboardManagement";
import ManagerManagement from "../components/pages/manager/ManagerManagement";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <DashboardManagement />,
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
  {
    path: "manager",
    element: <ManagerManagement />,
  },
];
