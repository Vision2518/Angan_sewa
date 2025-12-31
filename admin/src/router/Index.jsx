import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./AdminRoutes";
import AdminLayout from "../layout/AdminLayout";
import Login from "../components/Login";
import Guard from "./Guard";
const NotFound = () => <div>Not Found</div>;
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Guard>
        <AdminLayout />,
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
