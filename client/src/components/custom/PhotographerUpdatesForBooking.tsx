import { useParams } from "react-router-dom";
import { useGetPhotographerBookingUpdates } from "../../apis/bookings";
import SpinnerLoader from "./SpinnerLoader";
import { formatDistance } from "date-fns";

const PhotographerUpdatesForBooking = () => {
  const { bookingId } = useParams();
  const { data: updates, isLoading } = useGetPhotographerBookingUpdates(
    bookingId!
  );

  return (
    <div className="space-y-3">
      {isLoading && (
        <SpinnerLoader conHeight="100%" className="text-dark_blue text-6xl" />
      )}
      {updates &&
        !isLoading &&
        updates?.map((update) => (
          <div className={` bg-light_blue/50 p-2 rounded-xl `} key={update._id}>
            <div className="flex justify-start gap-2 ">
              <h1 className="flex-1 text-sm font-medium">{update.message}</h1>
            </div>
            <p className="text-xs text-right">
              {formatDistance(new Date(update.createdAt), Date.now())} ago
            </p>
          </div>
        ))}
    </div>
  );
};

export default PhotographerUpdatesForBooking;
