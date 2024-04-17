import { useAuthContext } from "../../providers/AuthProvider";
import PhotographerUpdatesForBooking from "./PhotographerUpdatesForBooking";
import PhotographerUpdatesForBookingForm from "./PhotographerUpdatesForBookingForm";
interface PhotoUpdatesProps {
  booking: BookingType;
}
const PhotoUpdates: React.FC<PhotoUpdatesProps> = ({ booking }) => {
  const { status } = booking;
  const { user } = useAuthContext();

  if (status === "pending")
    return (
      <h1 className="text-xl md:text-4xl font-medium text-dark_blue">
        Booking still pending !!
      </h1>
    );
  return (
    <div className="space-y-4">
      {user?.role === "photographer" ? (
        <p className="italic">
          Add notes on session and photo states to keep client updated 📸
        </p>
      ) : (
        <p className="italic">
          Updates from Photographer will be shown here, stay in touch 📸
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-2">
        <PhotographerUpdatesForBooking />
        {user?.role === "photographer" && (
          <PhotographerUpdatesForBookingForm booking={booking} />
        )}
      </div>
    </div>
  );
};

export default PhotoUpdates;
