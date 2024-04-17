import { useParams } from "react-router-dom";
import { useGetBooking } from "../../apis/bookings";
import PageLoader from "../../components/custom/PageLoader";
import BookingInfoHeader from "../../components/custom/BookingInfoHeader";
import FetchingError from "../../components/custom/FetchingError";
import BookingSettingPanel from "../../components/custom/BookingSettingPanel";
import BookingMessagingProvider from "../../providers/BookingMessagingContext";
import { Separator } from "../../components/ui/separator";
import ReviewAndRating from "../../components/custom/ReviewAndRating";
import { useAuthContext } from "../../providers/AuthProvider";
const BookingInfoPage = () => {
  const { bookingId } = useParams();
  const { user } = useAuthContext();
  const {
    data: booking,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetBooking(bookingId!);
  return (
    <BookingMessagingProvider>
      {isLoading && <PageLoader className="text-cream text-6xl" />}

      {booking && !isLoading && (
        <>
          <BookingInfoHeader booking={booking} />
          <Separator className="" />

          {/* REVIEW AND RATING FORM */}
          {booking.client_accepted &&
            user?.role === "client" &&
            !booking.client_rated && <ReviewAndRating booking={booking} />}

          {/* //FEEDBACK FORM
          <FeedbackForm booking={booking} /> */}

          {/* SETTINGS PANEL */}
          {((!booking.client_accepted && user?.role === "client") ||
            user?.role === "photographer") && (
            <BookingSettingPanel booking={booking} />
          )}
        </>
      )}

      {isError && !isLoading && (
        <FetchingError
          message="Error fetching Booking info"
          refetching={isFetching}
          retryFunction={refetch}
        />
      )}
    </BookingMessagingProvider>
  );
};

export default BookingInfoPage;
