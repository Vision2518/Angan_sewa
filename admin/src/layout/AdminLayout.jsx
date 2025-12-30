import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar";
const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
