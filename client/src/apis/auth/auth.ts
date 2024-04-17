import { useNavigate } from "react-router";

import {
  QueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { z } from "zod";
import {
  clientSignUpSchema,
  loginSchema,
  photographerSignUpSchema,
} from "../../schemas/authSchema";
import axios from "axios";
import {
  CLIENT_SIGNUP_ENDPOINT,
  GET_USER_PROFILE_ENDPOINT,
  LOGIN_ENDPOINT,
  PHOTOGRAPHER_SIGNUP_ENDPOINT,
} from "../endpoint";
import { useToast } from "../../components/ui/use-toast";
import { Routes } from "../../utils/routeNames";
import { useAuthContext } from "../../providers/AuthProvider";
import { configOptions } from "../config";
import config from "../../utils/config";

// PHOTOGRAPHER SIGN UP
export const usePhotographerSignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: z.infer<typeof photographerSignUpSchema>) => {
      return axios
        .post(PHOTOGRAPHER_SIGNUP_ENDPOINT, { ...values })
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
        navigate(Routes.LOGIN);
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

// CLIENT SIGN UP
export const useClientSignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (values: z.infer<typeof clientSignUpSchema>) => {
      return axios
        .post(CLIENT_SIGNUP_ENDPOINT, { ...values })
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
        navigate(Routes.LOGIN);
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

// LOGIN
export const useLogin = () => {
  const { toast } = useToast();
  const { login } = useAuthContext();
  const queryClient = useQueryClient();
  return useMutation(
    (values: z.infer<typeof loginSchema>) => {
      return axios.post(LOGIN_ENDPOINT, { ...values }).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        const message = res.message;
        if (res.client) {
          login({
            token: res.token,
            role: res.client.role,
            email: res.client.email,
            first_Name: res.client.first_Name,
            last_Name: res.client.last_Name,
            id: res.client._id,
          });
        }
        if (res.photographer) {
          login({
            token: res.token,
            role: res.photographer.role,
            email: res.photographer.email,
            first_Name: res.photographer.first_Name,
            last_Name: res.photographer.last_Name,
            id: res.photographer._id,
          });
        }
        toast({
          title: "Success!",
          variant: "default",
          description: message,
        });
        queryClient.invalidateQueries("user-profile");
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

// GET USER PROFILE
export const useGetUserProfile = () => {
  const { logout } = useAuthContext();
  return useQuery(
    ["user-profile"],
    (): Promise<UserProfileRespData> => {
      return axios
        .get(GET_USER_PROFILE_ENDPOINT, { headers: configOptions() })
        .then((res) => res.data.user);
    },

    {
      onError: () => {
        logout();
      },
      retry: false,
      cacheTime: 0,
    }
  );
};
