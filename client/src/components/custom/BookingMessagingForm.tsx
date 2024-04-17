import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import FormTextArea from "./FormTextArea";
import { sendMessageSchema } from "../../schemas/bookingSchema";
import { useSendMessage } from "../../apis/bookings";
import { useAuthContext } from "../../providers/AuthProvider";
import { Refresh } from "iconsax-react";
import { useBookingMessagingContext } from "../../providers/BookingMessagingContext";
import { useEffect } from "react";

interface BookingMessagingFormProps {
  booking: BookingType;
}
const BookingMessagingForm: React.FC<BookingMessagingFormProps> = ({
  booking,
}) => {
  const { refetch } = useBookingMessagingContext();
  const { mutateAsync: send, isLoading, status } = useSendMessage();
  const { user } = useAuthContext();
  const { _id, photographerId, createdBy, client_accepted } = booking;
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      bookingId: _id,
      clientId: createdBy,
      photographerId,
      content: "",
      sender: user?.role,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    send(values);
  }
  useEffect(() => {
    if (status === "success") {
      reset();
    }
  }, [status]);
  return (
    <div className="w-full max-w-[600px]  sticky bottom-0 p-1 bg-dark_blue">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormTextArea
            name="content"
            //   @ts-ignore
            control={control}
            placeholder="Send a message"
            //   @ts-ignore
            errors={errors}
            className="bg-cream h-10  focus-visible:ring-0 focus:ring-offset-0 focus:outline-none focus:border-none text-base text-dark_blue font-medium"
            rows={4}
          />
          <Button
            type="submit"
            className="w-fit px-10 max-w-[200px] h-8   rounded-xl font-bold  mx-auto text-cream bg-light_red hover:bg-light_red/90"
            disabled={isLoading || client_accepted}
          >
            {isLoading ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Form>
      <Button
        className="absolute bottom-0 right-4 text-cream cursor-pointer bg-transparent hover:bg-transparent p-0"
        onClick={refetch}
      >
        <Refresh />
      </Button>
    </div>
  );
};

export default BookingMessagingForm;
