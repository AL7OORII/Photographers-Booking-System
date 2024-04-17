import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { Button } from "../ui/button";

interface PhotographerPagesSideBarProps {}

const PhotographerPagesSideBar: React.FC<
  PhotographerPagesSideBarProps
> = () => {
  const { user, logout } = useAuthContext();
  const links = [
    {
      label: "Bookings",
      link: `/bookings`,
    },
    {
      label: "Home",
      link: `/`,
    },
    {
      label: "Profile",
      link: `/photographer/${user?.id}`,
    },
    {
      label: "Upload pictures",
      link: `/photographer/${user?.id}/upload`,
    },
  ];

  return (
    <div className="w-[250px] bg-cream h-screen sticky top-0  hidden md:block py-8">
      <ul className="flex justify-center items-center flex-col mt-20 px-4 space-y-6">
        {links.map((link, i) => (
          <li
            className="text-dark_blue hover:text-light_blue text-base font-medium text-start w-full"
            key={i}
          >
            <Link to={link.link}> {link.label}</Link>
          </li>
        ))}
        <Button
          onClick={logout}
          className="text-dark_red w-full bg-light_red/50 font-bold hover:!bg-dark_red/50 hover:!text-dark_red  cursor-pointer"
        >
          Logout
        </Button>
      </ul>
    </div>
  );
};

export default PhotographerPagesSideBar;
