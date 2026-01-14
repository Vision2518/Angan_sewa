import BranchServices from "../components/pages/BranchServices";
import Home from "../components/pages/Home";
import Login from "../components/pages/login";
export const publicRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"services/:places",
    element:<BranchServices />
  }
];
