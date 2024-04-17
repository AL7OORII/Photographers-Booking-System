import { useMutation } from "react-query";
import { useToast } from "../../components/ui/use-toast";
import { useAuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { configOptions } from "../config";
import { DELETE_CLIENT_ENDPOINT } from "../endpoint";
import { useNavigate } from "react-router-dom";

// DELETE CLIENT ACCOUNT
export const useDeleteClient = (clientId: string) => {
  const { toast } = useToast();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  return useMutation(
    () => {
      return axios
        .delete(DELETE_CLIENT_ENDPOINT(clientId), {
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
