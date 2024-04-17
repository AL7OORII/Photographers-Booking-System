import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Button } from "../ui/button";
import SpinnerLoader from "./SpinnerLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/routeNames";
import { useLogin } from "../../apis/auth/auth";
import { feedbackSchema, ratingDes } from "../../schemas/feedbackSchema";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import FormPhotographyStyles from "./FormInputPhotoGraphyStyles";
import FormTextArea from "./FormTextArea";
import ALert from "./Alert";
import useDisclosure from "../../hooks/useDisclosure";
import { useCreateFeedback } from "../../apis/feedback";

interface FeedbackFormProps {
  booking: BookingType;
  isOpen: boolean;
  close: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  booking,
  close,
  isOpen,
}) => {
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const navigate = useNavigate();

  const {
    isModalOpen: isConfirmationModalOpen,
    onModalClose: onConfirmationModalClose,
    onModalOpen: onConfirmationModalOpen,
  } = useDisclosure();

  const onRatingChange = (value: number) => {
    setRating(value);
  };

  const { mutateAsync: send, isLoading } = useCreateFeedback();

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: "",
      createdBy: booking.createdBy,
      photography_style: [],
      rating: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (rating === 0) {
      return setDesc("");
    }
    setDesc(ratingDes.find((rate) => rate.rating === rating)!.desc);
  }, [rating]);

  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  useEffect(() => {
    setValue("photography_style", styles);
  }, [styles]);

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    await send(values);
    onConfirmationModalOpen();
    setTimeout(() => {
      onConfirmationModalClose();
      navigate(Routes.HOME);
    }, 3000);
  }

  const handleModalClose = () => {
    onConfirmationModalClose();
    navigate(Routes.HOME);
  };
  const handleFeedbackFormClose = () => {
    close();
    navigate(Routes.HOME);
  };

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="w-[96%] bg-light space-y-2 !max-w-[700px] !max-h-[95vh] overflow-y-scroll">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark_blue text-lg">
              Service feedback
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-dark_blue">
              Please share your feedback with us to help us enhance your
              experience.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-cream rounded-2xl p-6 flex flex-col h-fit w-[96%] max-w-[700px] items-center">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                <FormTextArea
                  name="comment"
                  label="Comment"
                  rows={4}
                  control={control}
                  placeholder=""
                  errors={errors}
                />
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-dark_blue">
                    Rating
                  </h3>
                  <Rating
                    rating={rating}
                    edit={true}
                    size={30}
                    onChange={onRatingChange}
                  />
                  <p className="text-sm font-medium">{desc}</p>
                </div>

                <FormPhotographyStyles setStyles={setStyles} styles={styles} />
                <AlertDialogFooter className="gap-4 items-center">
                  <Button
                    type="submit"
                    className="w-full h-10 rounded-2xl font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <SpinnerLoader conHeight="100%" className="text-xl" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    onClick={handleFeedbackFormClose}
                    className="w-full h-10 rounded-2xl font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
                    disabled={isLoading}
                    type="button"
                  >
                    Cancel
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <ALert
        action={() => {}}
        close={handleModalClose}
        isOpen={isConfirmationModalOpen}
        message="Thank you for your response"
        description="You're being redirected"
        justAlert={true}
      />
    </>
  );
};

export default FeedbackForm;
