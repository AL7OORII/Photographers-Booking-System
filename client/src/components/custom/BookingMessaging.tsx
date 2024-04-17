import BookingMessageThread from "./BookingMessageThread";
import BookingMessagingForm from "./BookingMessagingForm";

interface BookingMessagingProps {
  booking: BookingType;
}

const BookingMessaging: React.FC<BookingMessagingProps> = ({ booking }) => {
  return (
    <div className="border min-h-screen space-y-4 relative">
      <div className="space-y-8 w-full relative flex  flex-col justify-between min-h-screen">
        <BookingMessageThread />
        <BookingMessagingForm booking={booking} />
      </div>
    </div>
  );
};

export default BookingMessaging;
