import { useAuthContext } from "../../providers/AuthProvider";
import { Separator } from "../ui/separator";
import FinishedBookingForm from "./FinishedBookingForm";
import FinishedPhotos from "./FinishedPhotos";
import UploadCompletedPhotoForm from "./UploadCompletedPhotoForm";

interface PhotographerUploadCompletedPhotoProps {
  booking: BookingType;
}
const PhotographerUploadCompletedPhoto: React.FC<
  PhotographerUploadCompletedPhotoProps
> = ({ booking }) => {
  const { user } = useAuthContext();
  if (booking.status !== "completed" && user?.role === "client")
    return (
      <h1 className="text-xl md:text-4xl font-medium text-dark_blue">
        In progress.... !!
      </h1>
    );
  return (
    <div className="space-y-10">
      {user?.role === "photographer" && (
        <>
          <UploadCompletedPhotoForm booking={booking} />
          <Separator className="bg-dark_red" />
        </>
      )}
      <FinishedPhotos booking={booking} />
      <Separator className="bg-dark_red" />
      <FinishedBookingForm booking={booking} />
    </div>
  );
};

export default PhotographerUploadCompletedPhoto;
