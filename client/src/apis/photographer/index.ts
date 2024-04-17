import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import {
  ADD_PHOTOGRAPHER_REVIEW_AND_RATING_ENDPOINT,
  BOOK_PHOTOGRAPHER_ENDPOINT,
  DELETE_PHOTOGRAPHER_ENDPOINT,
  DELETE_PHOTOGRAPHER_PHOTO_ENDPOINT,
  GET_PHOTOGRAPHER_DETAILS_ENDPOINT,
  GET_PHOTOGRAPHER_PHOTOS_ENDPOINT,
  GET_PHOTOGRAPHER_REVIEWS_ENDPOINT,
  GET_TOP_PHOTOGRAPHERS_ENDPOINT,
  UPDATE_PHOTOGRAPHER_DETAILS_ENDPOINT,
  UPDATE_PHOTOGRAPHER_PASSWORD_ENDPOINT,
  UPLOAD_PHOTOGRAPHER_PICS_ENDPOINT,
} from "../endpoint";
import { useToast } from "../../components/ui/use-toast";
import { z } from "zod";
import { configOptions } from "../config";
import {
  bookingSchema,
  ratingAndReviewSchema,
} from "../../schemas/bookingSchema";
import {
  photographerUpdatePasswordSchema,
  photographerUpdateProfileSchema,
} from "../../schemas/authSchema";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

// GET USER PROFILE
export const useGetPhotographerDetails = (photographerId: string) => {
  return useQuery(
    ["photographer-details"],
    (): Promise<PhotographerType> => {
      return axios
        .get(GET_PHOTOGRAPHER_DETAILS_ENDPOINT(photographerId))
        .then((res) => res.data.photographer);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    }
  );
};

// UPLOAD PHOTOGRAPHER PICS
export const useUploadPhotographerPhotos = (photographerId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (values: string | ArrayBuffer | null): Promise<{ message: string }> => {
      return axios
        .post(
          UPLOAD_PHOTOGRAPHER_PICS_ENDPOINT(photographerId),
          { values },
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
        queryClient.invalidateQueries("photographer-photos");
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

// GET PHOTOGRAPER PHOTOS
export const useGetPhotographerPhotos = (photographerId: string) => {
  return useQuery(
    ["photographer-photos"],
    (): Promise<PhotographerPhotosType[]> => {
      return axios
        .get(GET_PHOTOGRAPHER_PHOTOS_ENDPOINT(photographerId))
        .then((res) => res.data.images);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// GET PHOTOGRAPER PHOTOS
export const useGetTopPhotographers = () => {
  return useQuery(
    ["top-photographers"],
    (): Promise<PhotographerType[]> => {
      return axios
        .get(GET_TOP_PHOTOGRAPHERS_ENDPOINT)
        .then((res) => res.data.photographers);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// CREATE BOOKING
export const useCreateBooking = (photographerId: string) => {
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof bookingSchema>): Promise<any> => {
      return axios
        .post(
          BOOK_PHOTOGRAPHER_ENDPOINT(photographerId),
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

// ADD PHOTOGRAPHER REVIEW AND RATING
export const useAddPhotographerReviewAndRating = (bookingId: string) => {
  const { toast } = useToast();

  return useMutation(
    (values: z.infer<typeof ratingAndReviewSchema>) => {
      return axios
        .post(
          ADD_PHOTOGRAPHER_REVIEW_AND_RATING_ENDPOINT(bookingId),
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

// GET PHOTOGRAPER REVIEWS
export const useGetPhotographerReviews = (
  photographerId: string,
  page: number,
  limit: number
) => {
  return useQuery(
    ["photographer-review"],
    (): Promise<PhotographerReviewDataType> => {
      return axios
        .get(GET_PHOTOGRAPHER_REVIEWS_ENDPOINT(photographerId, page, limit))
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};

// UPDATE PHOTOGRAPHER DETAILS
export const useUpdatePhotographerDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (values: z.infer<typeof photographerUpdateProfileSchema>) => {
      return axios
        .patch(
          UPDATE_PHOTOGRAPHER_DETAILS_ENDPOINT,
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
      onSuccess: (res, variables) => {
        console.log(res);
        console.log(variables);

        queryClient.invalidateQueries("photographer-details");
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
        // navigate(Routes.PHOTOGRAPHER_PROFILE_PAGE(variables))
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

// UPDATE PHOTOGRAPHER PASSWORD
export const useUpdatePhotographerPassword = () => {
  const { toast } = useToast();
  const { logout } = useAuthContext();
  return useMutation(
    (values: z.infer<typeof photographerUpdatePasswordSchema>) => {
      return axios
        .patch(
          UPDATE_PHOTOGRAPHER_PASSWORD_ENDPOINT,
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
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
        logout();
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

// DELETE PHOTOGRAPHER PHOTO
export const handleDeletePhotographerPhoto = async (photoId: string) => {
  await axios
    .delete(DELETE_PHOTOGRAPHER_PHOTO_ENDPOINT(photoId), {
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

// DELETE PHOTOGRAPHER ACCOUNT
export const useDeletePhotographer = (photographerId: string) => {
  const { toast } = useToast();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  return useMutation(
    () => {
      return axios
        .delete(DELETE_PHOTOGRAPHER_ENDPOINT(photographerId), {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        const message = res.message;
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
        logout();
        navigate("/");
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
