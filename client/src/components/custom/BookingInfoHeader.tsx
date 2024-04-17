import { format } from "date-fns";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import BookingMessaging from "./BookingMessaging";
import { Link } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import { useAuthContext } from "../../providers/AuthProvider";
import {
  AcceptedButton,
  ClosedButton,
  CompletedButton,
  PendingButton,
  RejectedButton,
} from "./StatusButtons";

interface BookingInfoHeaderProps {
  booking: BookingType;
}
const BookingInfoHeader: React.FC<BookingInfoHeaderProps> = ({ booking }) => {
  const { user } = useAuthContext();
  return (
    <div>
      <header className="bg-light_blue p-4">
        <div className="flex justify-between gap-4 flex-wrap items-start">
          <div className="space-y-6">
            <h2 className="text-xl text-cream font-semibold">
              Date :{" "}
              <span className="font-bold">
                {format(new Date(booking.date), "MMMM dd yyy")}
              </span>
            </h2>
            {booking.client && (
              <div>
                <h2 className="text-cream text-lg font-medium">
                  {booking.client?.first_Name} {booking.client.last_Name}
                </h2>
                <h2 className="text-cream text-lg font-medium">
                  {booking.client.email}
                </h2>
              </div>
            )}
            {booking.photographer && (
              <div className="space-y-4">
                <h2 className="text-light_red text-lg font-medium underline">
                  Photographer
                </h2>
                <h2 className="text-cream text-base font-medium">
                  {booking.photographer?.first_Name}{" "}
                  {booking.photographer.last_Name}
                </h2>
                <h2 className="text-cream text-base font-medium">
                  {booking.photographer.email}
                </h2>
                <h2 className="text-cream text-base font-medium">
                  Rate: $ {booking.photographer.price_range.min} -{" "}
                  {booking.photographer.price_range.max}
                </h2>
              </div>
            )}
          </div>

          {booking.status === "accepted" ? (
            <AcceptedButton />
          ) : booking.status === "completed" ? (
            <CompletedButton />
          ) : booking.status === "pending" ? (
            <PendingButton />
          ) : booking.status === "rejected" ? (
            <RejectedButton />
          ) : <ClosedButton />}
        </div>

        <Sheet>
          <div className="flex justify-between w-full items-center  my-2">
            {user?.role === "client" && (
              <Link
                to={Routes.PHOTOGRAPHER_PROFILE_PAGE(booking.photographerId)}
                className="bg-cream p-2 rounded-lg text-dark_blue font-medium"
              >
                View Profile
              </Link>
            )}
            <SheetTrigger>
              <Button className="text-xl bg-dark_blue text-cream h-12 hover:bg-dark_blue/80 hover:text-cream">
                Start Conversation
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="!w-full  !max-w-[600px] overflow-x-scroll p-0">
            <BookingMessaging booking={booking} />
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default BookingInfoHeader;
