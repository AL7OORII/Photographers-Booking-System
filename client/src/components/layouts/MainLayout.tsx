import { Outlet } from "react-router";
import Navbar from "../nav/Navbar";
import Sidebar from "./Sidebar";
import { useAuthContext } from "../../providers/AuthProvider";

const MainLayout = () => {
  const { user } = useAuthContext();
  return (
    <div className="bg-dark_blue max-w-[1550px]">
      <div className="flex">
        {user?.id && <Sidebar />}
        <div
          className={`flex-1 min-h-screen ${
            user?.role === "photographer" && user.id && "w-full"
          }`}
        >
          <Navbar />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
