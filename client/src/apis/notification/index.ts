import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GET_USER_NOTIFICATIONS_ENDPOINT,
  UPDATE_NOTIFICATION_STATUS_ENDPOINT,
} from "../endpoint";
import { configOptions } from "../config";

// GET USER NOTIFICATIONS
export const useGetUserNotifications = () => {
  return useQuery(
    ["user-notifications"],
    (): Promise<NotificationType[]> => {
      return axios
        .get(GET_USER_NOTIFICATIONS_ENDPOINT, {
          headers: {
            ...configOptions(),
          },
        })
        .then((res) => res.data.notifications);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      refetchInterval: 60000,
      refetchIntervalInBackground: true,
    }
  );
};

// UPDATE NOTIFICATION STATUS
export const useUpdateNotificationStatus = (notificationId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (values: { status: string }): Promise<{ message: string }> => {
      return axios
        .patch(
          UPDATE_NOTIFICATION_STATUS_ENDPOINT(notificationId),
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
        queryClient.invalidateQueries("user-notifications");
        // const message = res.message;
        // toast({
        //   title: "Success!",
        //   variant: "default",
        //   description: message,
        // });
      },
      // onError: (res: any) => {
      //   const message = res.response.data.message;
      //   toast({
      //     title: "Error!",
      //     variant: "destructive",
      //     description: message,
      //   });
      // },
      retry: true,
    }
  );
};
