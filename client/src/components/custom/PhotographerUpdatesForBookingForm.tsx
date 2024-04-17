import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { photographerBookingUpdateSchema } from "../../schemas/bookingSchema";
import { useSendPhotographerBookingUpdate } from "../../apis/bookings";
import FormTextArea from "./FormTextArea";

interface PhotographerUpdatesForBookingFormProps {
  booking: BookingType;
}

const PhotographerUpdatesForBookingForm: React.FC<
  PhotographerUpdatesForBookingFormProps
> = ({ booking }) => {
  const { mutateAsync: send, isLoading } = useSendPhotographerBookingUpdate();

  const form = useForm<z.infer<typeof photographerBookingUpdateSchema>>({
    resolver: zodResolver(photographerBookingUpdateSchema),
    defaultValues: {
      message: "",
      createdBy: booking.photographerId,
      image: undefined,
      bookingId: booking._id,
      clientId:booking.createdBy
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof photographerBookingUpdateSchema>) {
    send(values);
    reset();
  }
  return (
    <div className="w-full max-w-[600px] space-y-4 p-4 border">
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormTextArea
              rows={4}
              control={control}
              errors={errors}
              name="message"
              label="Update message"
            />
            <Button
              type="submit"
              className="w-full max-w-[200px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
              disabled={isLoading || booking.client_accepted}
            >
              {isLoading ? (
                <SpinnerLoader conHeight="100%" className="text-xl" />
              ) : (
                "Send update"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PhotographerUpdatesForBookingForm;
