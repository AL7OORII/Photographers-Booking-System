import { Outlet, useParams } from "react-router";
import Navbar from "../nav/Navbar";
import PhotographerPagesSideBar from "../nav/PhotographerPagesSideBar";
import { useAuthContext } from "../../providers/AuthProvider";

const PhotographerPagesLayout = () => {
  const { user } = useAuthContext();
  const { photographerId } = useParams();

  return (
    <div className="bg-dark_blue max-w-[1450px" >
      <div className="flex">
        {user?.role === "photographer" && user.id === photographerId && (
          <PhotographerPagesSideBar />
        )}
        <div
          className={`flex-1 min-h-screen ${
            user?.role === "photographer" &&
            user.id === photographerId &&
            "max-w-[1450px]"
          }`}
        >
          <Navbar />
          <div className="p-4 md:p-8 max-w-[1450px] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerPagesLayout;
