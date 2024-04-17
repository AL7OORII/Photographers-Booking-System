import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DELETE_BOOKING_ENDPOINT,
  DELETE_FINISHED_PHOTO_ENDPOINT,
  GET_BOOKING_DETAILS_ENDPOINT,
  GET_BOOKING_MESSAGES_ENDPOINT,
  GET_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT,
  GET_PHOTOGRAPHER_FINISHED_PHOTOS_ENDPOINT,
  GET_USER_BOOKINGS_ENDPOINT,
  SEND_BOOKING_MESSAGE_ENDPOINT,
  SEND_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT,
  UPDATE_CLIENT_ACCEPTED_ENDPOINT,
  UPLOAD_PHOTOGRAPHER_FINISHED_PHOTO_ENDPOINT,
} from "../endpoint";
import axios from "axios";
import { configOptions } from "../config";
import { useToast } from "../../components/ui/use-toast";
import { z } from "zod";
import {
  photographerBookingUpdateSchema,
  sendMessageSchema,
  updateBokkingStatusSchema,
  userSatisfiedSchema,
} from "../../schemas/bookingSchema";

// GET USER BOOKINGS
export const useGetUserBookings = () => {
  return useQuery(
    ["user-bookings"],
    (): Promise<BookingType[]> => {
      return axios
        .get(GET_USER_BOOKINGS_ENDPOINT, {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data.bookings);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// GET  BOOKING DETAILS
export const useGetBooking = (bookingId: string) => {
  return useQuery(
    ["user-booking", bookingId],
    (): Promise<BookingType> => {
      return axios
        .get(GET_BOOKING_DETAILS_ENDPOINT(bookingId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data.booking);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// SEND MESSAGE
export const useSendMessage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (values: z.infer<typeof sendMessageSchema>) => {
      return axios
        .post(
          SEND_BOOKING_MESSAGE_ENDPOINT,
          { ...values },
          {
            headers: {
              ...configOptions(),
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("booking-messages");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// GET  BOOKING DETAILS
export const useGetBookingMessages = (
  bookingId: string,
  page: number,
  limit: number
) => {
  return useQuery(
    ["booking-messages", bookingId],
    (): Promise<BookingMessageDataType> => {
      return axios
        .get(GET_BOOKING_MESSAGES_ENDPOINT(bookingId, page, limit), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// UPDATE BOOKING STATUS
export const useUpdateBookingStatus = (bookingId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (values: z.infer<typeof updateBokkingStatusSchema>) => {
      return axios
        .patch(
          GET_BOOKING_DETAILS_ENDPOINT(bookingId),
          { ...values },
          {
            headers: {
              ...configOptions(),
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("user-booking");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// GET  PHOTOGRAPHER BOOKING UPDATES
export const useGetPhotographerBookingUpdates = (bookingId: string) => {
  return useQuery(
    ["get-booking-update", bookingId],
    (): Promise<BookingUpdatesType[]> => {
      return axios
        .get(GET_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT(bookingId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data.updates);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// SEND PHOTOGRAPHER BOOKING UPDATES
export const useSendPhotographerBookingUpdate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: z.infer<typeof photographerBookingUpdateSchema>) => {
      return axios
        .post(
          SEND_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT,
          { ...values },
          {
            headers: {
              ...configOptions(),
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("get-booking-update");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// UPLOAD PHOTOGRAPHER FINISHED PHOTO
export const useUploadPhotographerFinishedPhoto = (photographerId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (values: {
      image: string | ArrayBuffer | null;
      bookingId: string;
    }): Promise<{ message: string }> => {
      return axios
        .post(
          UPLOAD_PHOTOGRAPHER_FINISHED_PHOTO_ENDPOINT(photographerId),
          { ...values },
          {
            headers: {
              ...configOptions(),
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("finished-photos");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// GET  PHOTOGRAPHER FINISHED PHOTOS
export const useGetPhotographerFinishedPhotos = (bookingId: string) => {
  return useQuery(
    ["finished-photos", bookingId],
    (): Promise<FinishedPhotoType[]> => {
      return axios
        .get(GET_PHOTOGRAPHER_FINISHED_PHOTOS_ENDPOINT(bookingId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data.photos);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// UPDATE CLIENT ACCEPTED STATUSs
export const useUpdateClientAcceptedStatus = (bookingId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: z.infer<typeof userSatisfiedSchema>) => {
      return axios
        .patch(
          UPDATE_CLIENT_ACCEPTED_ENDPOINT(bookingId),
          { ...values },
          {
            headers: {
              ...configOptions(),
            },
          }
        )
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("user-booking");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// DELETE BOOKING
export const useDeleteBooking = (bookingId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return axios
        .delete(DELETE_BOOKING_ENDPOINT(bookingId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("user-bookings");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

// DELETE FINISHED PHOTO
export const useDeleteFinishedPhoto = (photoId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return axios
        .delete(DELETE_FINISHED_PHOTO_ENDPOINT(photoId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("finished-photos");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
      },
      onError: (res: any) => {
        const message = res.response.data.message;
        toast({
          title: "Error!",
          variant: "destructive",
          description: message,
        });
      },
    }
  );
};

export const handleDeleteFinishedPhoto = async (photoId: string) => {
  await axios
    .delete(DELETE_FINISHED_PHOTO_ENDPOINT(photoId), {
      headers: {
        ...configOptions(),
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.message;
    })
    .catch((error) => error.message);
};
