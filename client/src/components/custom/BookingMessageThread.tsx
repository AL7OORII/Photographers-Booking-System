import ClientMessageBubble from "./ClientMessageBubble";
import PhotographerMessageBubble from "./PhotographerMessageBubble";
import SpinnerLoader from "./SpinnerLoader";
import PaginationComponent from "./PaginationComponent";
import FetchingError from "./FetchingError";
import { useBookingMessagingContext } from "../../providers/BookingMessagingContext";
import { useEffect } from "react";

interface BookingMessageThreadProps {}

const BookingMessageThread: React.FC<BookingMessageThreadProps> = () => {
  const {
    isLoading,
    messagesData,
    page,
    isRefetching,
    setPage,
    isError,
    refetch,
  } = useBookingMessagingContext();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center h-60">
          <SpinnerLoader conHeight="100%" className="text-dark_blue" />
        </div>
      )}

      {messagesData && messagesData.messages.length > 0 && (
        <>
          <div className="sticky top-0  bg-cream p-1">
            <PaginationComponent
              metadata={messagesData.metadata}
              page={page}
              setPage={setPage}
              isFetching={isRefetching}
            />
          </div>
          <div
            className={`p-4 ${
              isRefetching
                ? "pointer-events-none opacity-50 relative -z-10"
                : ""
            } space-y-2`}
          >
            {messagesData.messages.map((message) => {
              const { sender } = message;
              if (sender === "client")
                return (
                  <ClientMessageBubble message={message} key={message._id} />
                );
              return (
                <PhotographerMessageBubble
                  message={message}
                  key={message._id}
                />
              );
            })}
          </div>
        </>
      )}

      {isError && !isLoading && (
        <FetchingError
          message="Error fetching messages"
          refetching={isRefetching}
          retryFunction={refetch}
        />
      )}
    </div>
  );
};

export default BookingMessageThread;
