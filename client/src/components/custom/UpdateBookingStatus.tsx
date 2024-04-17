import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import FormSelectBookingStatus from "./FormSelectBookingStatus";
import { updateBokkingStatusSchema } from "../../schemas/bookingSchema";
import { useUpdateBookingStatus } from "../../apis/bookings";
import { useParams } from "react-router-dom";
interface UpdateBookingStatusProps {
  booking: BookingType;
}

const UpdateBookingStatus: React.FC<UpdateBookingStatusProps> = ({
  booking,
}) => {
  const { bookingId } = useParams();
  const { mutateAsync: update, isLoading } = useUpdateBookingStatus(bookingId!);

  const form = useForm<z.infer<typeof updateBokkingStatusSchema>>({
    resolver: zodResolver(updateBokkingStatusSchema),
    defaultValues: {
      status: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  function onSubmit(values: z.infer<typeof updateBokkingStatusSchema>) {
    update(values);
    reset();
  }

  return (
    <div className="w-full max-w-[600px] space-y-4">
      <h1 className="text-lg text-dark_blue font-semibold underline underline-offset-2">
        Update booking status
      </h1>
      <h2 className="italic">
        Current status:{" "}
        <span className="text-light_red capitalize">{booking.status}</span>
      </h2>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormSelectBookingStatus
              name="status"
              control={control}
              errors={errors}
              status={booking.status}
            />
            <Button
              type="submit"
              className="w-full max-w-[200px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
              disabled={isLoading || booking.client_accepted}
            >
              {isLoading ? (
                <SpinnerLoader conHeight="100%" className="text-xl" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateBookingStatus;
