import { useMutation } from "react-query";
import { useToast } from "../../components/ui/use-toast";
import { z } from "zod";
import { feedbackSchema } from "../../schemas/feedbackSchema";
import axios from "axios";
import { CREATE_FEEDBACK_ENDPOINT } from "../endpoint";
import { configOptions } from "../config";

// CREATE FEEDBACK
export const useCreateFeedback = () => {
  const { toast } = useToast();
  return useMutation(
    (values: z.infer<typeof feedbackSchema>): Promise<any> => {
      return axios
        .post(
          CREATE_FEEDBACK_ENDPOINT,
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
