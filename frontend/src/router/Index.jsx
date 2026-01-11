import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./AdminRoutes";
import { publicRoutes } from "./PublicRoutes";
import AdminLayout from "../layout/AdminLayout";
import PublicLayout from "../layout/PublicLayout";
const NotFound = () => <div>Not Found</div>;
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "",
    element: <PublicLayout />,
    children: publicRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
