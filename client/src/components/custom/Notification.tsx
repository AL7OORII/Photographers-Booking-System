import { Notification } from "iconsax-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  useGetUserNotifications,
  useUpdateNotificationStatus,
} from "../../apis/notification";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface NotificationDropDownProps {}

const NotificationDropDown: React.FC<NotificationDropDownProps> = () => {
  const { data: notifications } = useGetUserNotifications();
  const numberOfUnread =
    notifications?.filter((noti) => noti.status === "unread").length ?? 0;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <Notification size={30} className="text-cream" />
          {notifications && numberOfUnread > 0 && (
            <Avatar className="absolute top-4 -right-1 h-5 w-5">
              <AvatarFallback className="bg-light_red text-cream text-sm font-bold">
                {numberOfUnread}
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        {notifications && notifications.length > 0 && (
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="bg-light_blue  !min-w-80 !max-w-96 p-0 max-h-80 overflow-y-scroll"
            onFocusOutside={(e) => e.preventDefault()}
          >
            {notifications.map((noti) => {
              const { status, type, bookingId, photographerId } = noti;
              if (status === "unread") {
                return (
                  <>
                    <DropdownMenuItem
                      className=" cursor-pointer w-full bg-light flex-col rounded-none "
                      key={noti._id}
                    >
                      {type === "booking-status" ? (
                        <NotificationCard
                          href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                          notification={noti}
                          text="Booking status was updated"
                        />
                      ) : type === "new-booking" ? (
                        <NotificationCard
                          href={Routes.BOOKING_HOME_PAGE}
                          notification={noti}
                          text="You have a new Booking"
                        />
                      ) : type === "message" ? (
                        <NotificationCard
                          href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                          notification={noti}
                          text="You have a new Message"
                        />
                      ) : type === "photo-update" ? (
                        <NotificationCard
                          href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                          notification={noti}
                          text="You have a new Photo update"
                        />
                      ) : (
                        <NotificationCard
                          href={Routes.PHOTOGRAPHER_PROFILE_PAGE(
                            photographerId!
                          )}
                          notification={noti}
                          text="You have a new Review"
                        />
                      )}
                    </DropdownMenuItem>
                    <Separator className="bg-dark_blue" />
                  </>
                );
              }
              return (
                <>
                  <DropdownMenuItem
                    className=" cursor-pointer w-full flex-col hover:!bg-light_blue"
                    key={noti._id}
                  >
                    {type === "booking-status" ? (
                      <NotificationCard
                        href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                        notification={noti}
                        text="Booking status was updated"
                      />
                    ) : type === "new-booking" ? (
                      <NotificationCard
                        href={Routes.BOOKING_HOME_PAGE}
                        notification={noti}
                        text="You have a new Booking"
                      />
                    ) : type === "message" ? (
                      <NotificationCard
                        href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                        notification={noti}
                        text="You have a new Message"
                      />
                    ) : (
                      <NotificationCard
                        href={Routes.BOOKING_INFO_PAGE(bookingId!)}
                        notification={noti}
                        text="You have a new Photo update"
                      />
                    )}
                  </DropdownMenuItem>
                  <Separator className="bg-dark_blue" />
                </>
              );
            })}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
};

export default NotificationDropDown;

interface NotificationCardProps {
  notification: NotificationType;
  href: string;
  text: string;
}
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  href,
  text,
}) => {
  const { client, photographer, createdAt, _id } = notification;
  const { mutateAsync: update } = useUpdateNotificationStatus(_id);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
    update({ status: "read" });
  };

  return (
    <>
      <div onClick={handleClick} className="w-full">
        <div className="flex justify-between">
          <p className="text-sm font-semibold">{text}</p>
          <p className="text-sm font-semibold">
            {format(new Date(createdAt), "MMM dd")}
          </p>
        </div>
        <p>{client?.first_Name ?? photographer?.first_Name}</p>
      </div>
    </>
  );
};
