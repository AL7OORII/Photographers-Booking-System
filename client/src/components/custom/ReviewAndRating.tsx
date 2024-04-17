import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { ratingAndReviewSchema } from "../../schemas/bookingSchema";
import FormTextArea from "./FormTextArea";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import ALert from "./Alert";
import useDisclosure from "../../hooks/useDisclosure";
import { useAddPhotographerReviewAndRating } from "../../apis/photographer";
import FeedbackForm from "./FeedbackForm";
import { ratingDes } from "../../schemas/feedbackSchema";

interface ReviewAndRatingProps {
  booking: BookingType;
}

const ReviewAndRating: React.FC<ReviewAndRatingProps> = ({ booking }) => {
  const { photographerId, createdBy, _id } = booking;
  const { isModalOpen, onModalClose, onModalOpen } = useDisclosure();
  const {
    isModalOpen: isFeedbackModalOpen,
    onModalClose: onFeedbackModalClose,
    onModalOpen: onFeedbackModalOpen,
  } = useDisclosure();

  const { mutateAsync: submit, isLoading } =
    useAddPhotographerReviewAndRating(_id);
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");

  const form = useForm<z.infer<typeof ratingAndReviewSchema>>({
    resolver: zodResolver(ratingAndReviewSchema),
    defaultValues: {
      rating: undefined,
      text: "",
      createdBy,
      photographerId,
    },
  });

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const onRatingChange = (value: number) => {
    setRating(value);
  };

  useEffect(() => {
    setValue("rating", rating);
  }, [rating]);

  useEffect(() => {
    if (rating === 0) {
      return setDesc("");
    }
    setDesc(ratingDes.find((rate) => rate.rating === rating)!.desc);
  }, [rating]);

  const handleSubmit = async () => {
    await submit({
      createdBy,
      photographerId,
      rating,
      text: getValues("text"),
    });
    onModalClose();
    // setTimeout(() => {
    onFeedbackModalOpen();
    // }, 1000);
  };

  return (
    <div className="bg-light p-6 h-fit">
      <h1 className="text-2xl mb-4 font-semibold text-dark_blue  text-left">
        Add review and rating
      </h1>
      <Form {...form}>
        <form className="space-y-8 w-full">
          <FormTextArea
            name="text"
            label="Review"
            control={control}
            placeholder=""
            errors={errors}
            rows={6}
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
          <Button
            type="button"
            className="w-full max-w-[200px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
            disabled={isLoading || (rating === 0 && getValues("text") === "")}
            onClick={onModalOpen}
          >
            {isLoading ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
      <ALert
        action={handleSubmit}
        close={onModalClose}
        isOpen={isModalOpen}
        message="Confirm action"
        loadingAction={isLoading}
      />
      <FeedbackForm
        booking={booking}
        close={onFeedbackModalClose}
        isOpen={isFeedbackModalOpen}
      />
    </div>
  );
};

export default ReviewAndRating;
