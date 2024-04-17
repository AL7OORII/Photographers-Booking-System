import { Outlet } from "react-router";
import Navbar from "../nav/Navbar";

const AuthLayout = () => {
  return (
    <div className="bg-dark_blue min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
