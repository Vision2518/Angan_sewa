import Navbar from "../components/shared/navbar";
import Footer from "../components/shared/footer";
import { Outlet } from "react-router-dom";
const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default PublicLayout;
