import { Link } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import { Button } from "../ui/button";
import {
  clientSidebarLinks,
  photographerSidebarLinks,
} from "../../utils/links";
import { Trash } from "iconsax-react";
import { useDeleteClient } from "../../apis/client";
import ALert from "../custom/Alert";
import useDisclosure from "../../hooks/useDisclosure";
import { useDeletePhotographer } from "../../apis/photographer";

const Sidebar = () => {
  const { user, logout, activeLink } = useAuthContext();

  const { mutateAsync: deleteClient, isLoading: isLoadingClient } =
    useDeleteClient(user!.id ?? "");

  const { mutateAsync: deletePhotographer, isLoading: isLoadingPhotographer } =
    useDeletePhotographer(user!.id ?? "");

  const {
    isModalOpen: isClientModalOpen,
    onModalClose: onClientModalClose,
    onModalOpen: onClientModalOpen,
  } = useDisclosure();
  const {
    isModalOpen: isPhotographerModalOpen,
    onModalClose: onPhotographerModalClose,
    onModalOpen: onPhotographerModalOpen,
  } = useDisclosure();

  return (
    <div className="w-[250px] bg-cream h-screen sticky top-0  hidden lg:flex flex-col justify-between pt-0 ">
      {user && user.role === "client" && (
        <>
          <ul className="flex justify-center items-center flex-col mt-20 px-4 space-y-4">
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
                <li
                  className={` ${
                    activeLink === link.value
                      ? "bg-light_blue text-cream"
                      : " text-dark_blue hover:text-light_blue"
                  }  text-base font-medium text-start w-full py-1 px-2 rounded-lg h-10`}
                >
                  {link.label}
                </li>
              </Link>
            ))}
            <Button
              onClick={logout}
              className="text-dark_red h-10 w-full bg-light_red/50 font-bold hover:!bg-dark_red/50 hover:!text-dark_red  cursor-pointer"
            >
              Logout
            </Button>
          </ul>

          <Button
            className="text-base w-full bg-red-400 text-red-950 rounded-none hover:text-red-950 hover:bg-red-500"
            onClick={onClientModalOpen}
          >
            <Trash />
            Delete Account
          </Button>
          <ALert
            action={deleteClient}
            close={onClientModalClose}
            isOpen={isClientModalOpen}
            message="Delete Account"
            description="This account will be deleted permanently"
            loadingAction={isLoadingClient}
          />
        </>
      )}

      {user && user.role === "photographer" && (
        <>
          <ul className="flex justify-center items-center flex-col mt-20 px-4 space-y-4">
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
                <li
                  className={` ${
                    activeLink === link.value
                      ? "bg-light_blue text-cream"
                      : " text-dark_blue hover:text-light_blue"
                  }  text-base font-medium text-start w-full p-1 rounded-lg h-10`}
                >
                  {link.label}
                </li>
              </Link>
            ))}
            <Button
              onClick={logout}
              className="text-dark_red w-full bg-light_red/50 font-bold hover:!bg-dark_red/50 hover:!text-dark_red  cursor-pointer"
            >
              Logout
            </Button>
          </ul>
          <Button
            onClick={onPhotographerModalOpen}
            className="text-base w-full bg-red-400 text-red-950 rounded-none hover:text-red-950 hover:bg-red-500"
          >
            <Trash /> 
            Delete Account
          </Button>
          <ALert
            action={deletePhotographer}
            close={onPhotographerModalClose}
            isOpen={isPhotographerModalOpen}
            message="Delete Account"
            description="This account will be deleted permanently"
            loadingAction={isLoadingPhotographer}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
