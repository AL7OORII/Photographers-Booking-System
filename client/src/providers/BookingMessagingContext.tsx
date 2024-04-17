import config from "../utils/config";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUserProfile } from "../apis/auth/auth";
import { Routes } from "../utils/routeNames";
import useUrlQuery from "../hooks/useUrlQuery";
import { useGetBookingMessages } from "../apis/bookings";

interface BookingMessagingContextType {
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  messagesData: BookingMessageDataType | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  refetch: () => void;
}

const BookingMessagingContext = createContext<BookingMessagingContextType>({
  limit: 0,
  page: 0,
  setPage: () => {},
  messagesData: undefined,
  isLoading: false,
  isRefetching: false,
  isError: false,
  refetch: () => {},
});

export const useBookingMessagingContext = () =>
  useContext(BookingMessagingContext);

export default function BookingMessagingProvider({
  children,
}: PropsWithChildren) {
  const { bookingId } = useParams();
  const { limit, page, setPage } = useUrlQuery();
  const {
    data: messagesData,
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = useGetBookingMessages(bookingId!, page, limit);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <BookingMessagingContext.Provider
      value={{
        limit,
        page,
        setPage,
        messagesData,
        isLoading,
        isRefetching,
        isError,
        refetch,
      }}
    >
      {children}
    </BookingMessagingContext.Provider>
  );
}
