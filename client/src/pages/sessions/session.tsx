import { format } from "date-fns";
import { useGetUserBookings } from "../../apis/bookings";
import { DataTable } from "../../components/custom/DataTable";
import PageLoader from "../../components/custom/PageLoader";
import { ColumnDef } from "@tanstack/react-table";
import { More } from "iconsax-react";
import useDisclosure from "../../hooks/useDisclosure";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { ReactNode } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import FetchingError from "../../components/custom/FetchingError";
import DeleteBookingModal from "../../components/custom/DeleteBookingModal";
import { AcceptedButton, CompletedButton, PendingButton, RejectedButton } from "../../components/custom/StatusButtons";

const SessionPage = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetUserBookings();
  const { user } = useAuthContext();

  const columns: ColumnDef<BookingType>[] = user
    ? [
        {
          accessorKey: "date",
          header: () => <div className="text-left">Date</div>,
          cell: ({ row }) => {
            const date = row.original.date;
            const formatted = format(new Date(date), "MMMM dd yyy");
            return <div className="text-left font-medium">{formatted}</div>;
          },
        },
        {
          accessorKey: "email",
          header: () => <div className="text-left">Email</div>,
          cell: ({ row }) => {
            const email =
              row.original.client?.email ?? row.original.photographer?.email;
            return <div className="text-left font-medium">{email}</div>;
          },
        },
        {
          accessorKey: "status",
          header: () => <div className="text-left">Status</div>,
          cell: ({ row }) => {
            const status = row.original.status;
            if (status === "accepted") return <AcceptedButton />;
            if (status === "pending") return <PendingButton />;
            if (status === "rejected") return <RejectedButton />;
            if (status === "completed") return <CompletedButton />;
          },
        },
        {
          accessorKey: `${user?.role === "client" ? "photographer" : "client"}`,
          header: () => (
            <div className="text-left">
              {user?.role === "client" ? "Photographer" : "User"}
            </div>
          ),
          cell: ({ row }) => {
            const first_name = row.original.client
              ? row.original.client.first_Name
              : row.original.photographer?.first_Name;
            const last_name = row.original.client
              ? row.original.client.last_Name
              : row.original.photographer?.last_Name;
            return (
              <div className="text-left font-medium">
                {first_name} {last_name}
              </div>
            );
          },
        },
        {
          accessorKey: "action",
          header: () => <div className="text-left">Actions</div>,
          cell: ({ row }) => {
            return (
              <div className="text-left font-medium">
                <ActionMenu
                  trigger={
                    <More size="32" className="text-dark_blue cursor-pointer" />
                  }
                  user={user}
                  booking={row.original}
                />
              </div>
            );
          },
        },
      ]
    : [];

  const sessionBookings =
    bookings?.filter(
      (booking) =>
        booking.status === "accepted" || booking.status === "completed"
    ) ?? [];

  return (
    <div className="space-y-10 p-4 md:p-8">
      <h1 className="text-2xl text-cream md:text-4xl mb-4 font-semibold underline underline-offset-2">
        Sessions
      </h1>
      <div>
        {isLoading && <PageLoader className="text-6xl text-cream" />}

        {bookings && <DataTable columns={columns} data={sessionBookings} />}

        {isError && !isLoading && (
          <FetchingError
            message="Error fetching Bookings"
            refetching={isFetching}
            retryFunction={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default SessionPage;

interface ActionMenuProps {
  trigger: ReactNode;
  user: UserData;
  booking: BookingType;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ trigger, booking }) => {
  const {
    isModalOpen: isDeleteOpen,
    onModalOpen: onDeleteOpen,
    onModalClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to={Routes.BOOKING_INFO_PAGE(booking._id)}>
              <DropdownMenuItem className="cursor-pointer">
                View
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="bg-red-200 text-red-900 hover:!bg-red-300  cursor-pointer"
            onClick={onDeleteOpen}
          >
            Delete booking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DELETE MODAL */}
      <DeleteBookingModal
        isOpen={isDeleteOpen}
        toggle={onDeleteClose}
        booking={booking}
      />
    </>
  );
};
