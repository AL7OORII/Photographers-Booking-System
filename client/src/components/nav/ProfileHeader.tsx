import { useAuthContext } from "../../providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import {
  clientSidebarLinks,
  photographerSidebarLinks,
} from "../../utils/links";
import { HambergerMenu } from "iconsax-react";
import NotificationDropDown from "../custom/Notification";
interface ProfileHeaderProps {}

const ProfileHeader: React.FC<ProfileHeaderProps> = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="flex gap-3">
      {user && (
        <>
          <h1 className="text-cream text-2xl hidden md:block">
            Welcome{" "}
            <span>
              {user?.first_Name} {user?.last_Name}
            </span>
          </h1>
          <NotificationDropDown />
          <ProfileDropDown user={user} logout={logout} />
        </>
      )}
    </div>
  );
};

export default ProfileHeader;

interface ProfileDropDownProps {
  user: UserData;
  logout: () => void;
}

export const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  user,
  logout,
}) => {
  return (
    <>
      {user?.role === "client" ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HambergerMenu size={30} className="text-cream lg:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="bg-light_blue space-y-4"
          >
            {clientSidebarLinks.map((link, i) => (
              <Link
                to={
                  typeof link.link === "function"
                    ? link.link(user.id)
                    : link.link
                }
                className={` w-full py-1 px-1`}
                key={i}
              >
                <DropdownMenuItem className="text-cream font-medium cursor-pointer">
                  {link.label}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuItem
              onClick={logout}
              className="text-dark_red bg-light_red/50 font-bold hover:!bg-dark_red/50 hover:!text-dark_red  cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HambergerMenu size={30} className="text-cream lg:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="bg-light_blue !w-56"
          >
            {photographerSidebarLinks.map((link, i) => (
              <Link
                to={
                  typeof link.link === "function"
                    ? link.link(user.id)
                    : link.link
                }
                className={` w-full py-1 px-1`}
                key={i}
              >
                <DropdownMenuItem className="text-cream font-medium cursor-pointer">
                  {link.label}
                </DropdownMenuItem>
              </Link>
            ))}
            <DropdownMenuItem
              onClick={logout}
              className="text-dark_red bg-light_red/50 font-bold hover:!bg-dark_red/50 hover:!text-dark_red  cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
