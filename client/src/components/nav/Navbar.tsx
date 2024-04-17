import { Link } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import { Button } from "../ui/button";
import { useAuthContext } from "../../providers/AuthProvider";
import ProfileHeader from "./ProfileHeader";

const Navbar = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <header className="p-4  border-b-2 border-cream sticky top-0 bg-dark_blue z-10">
      <nav className="flex justify-between items-center max-w-[1400px] mx-auto flex-wrap">
        <Link to={Routes.HOME}>
          <h1 className="text-2xl text-cream">Photography</h1>
        </Link>

        {!isLoggedIn ? (
          <div className="flex gap-6 items-center">
            <Link to={Routes.LOGIN}>
              <Button>Login</Button>
            </Link>
            <Link to={Routes.SIGNUP}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        ) : (
          <ProfileHeader />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
