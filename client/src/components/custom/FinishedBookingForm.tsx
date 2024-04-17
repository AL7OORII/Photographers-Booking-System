import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import SpinnerLoader from "../../components/custom/SpinnerLoader";
import { userSatisfiedSchema } from "../../schemas/bookingSchema";
import { useUpdateClientAcceptedStatus } from "../../apis/bookings";
import { useParams } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { useAuthContext } from "../../providers/AuthProvider";
import ALert from "./Alert";
import useDisclosure from "../../hooks/useDisclosure";

interface FinishedBookingFormProps {
  booking: BookingType;
}

const FinishedBookingForm: React.FC<FinishedBookingFormProps> = ({
  booking,
}) => {
  const { bookingId } = useParams();
  const { mutateAsync: update, isLoading } = useUpdateClientAcceptedStatus(
    bookingId!
  );
  const { user } = useAuthContext();
  const { isModalOpen, onModalClose, onModalOpen } = useDisclosure();
  const form = useForm<z.infer<typeof userSatisfiedSchema>>({
    resolver: zodResolver(userSatisfiedSchema),
    defaultValues: {
      satisfied: booking.client_accepted,
    },
  });

  const { control, getValues } = form;

  const handleModalOpen = () => {
    onModalOpen();
  };

  const handleFormSubmit = async () => {
    await update({ satisfied: getValues("satisfied") });
    onModalClose();
  };

  return (
    <div className="w-full space-y-4 p-4">
      <div>
        {user?.role === "client" && booking.status === "completed" && (
          <Form {...form}>
            <form className="space-y-6 w-full">
              <FormField
                control={control}
                name="satisfied"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-6 w-6"
                        disabled={booking.client_accepted}
                      />
                    </FormControl>
                    <FormLabel className="text-lg text-dark_blue">
                      I have checked the photos and I am satisfied
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="w-full max-w-[200px] h-12 rounded-full font-bold  mx-auto text-cream bg-dark_blue hover:bg-dark_blue/90 my-4"
                disabled={
                  isLoading ||
                  !getValues("satisfied") ||
                  booking.client_accepted
                }
                onClick={handleModalOpen}
              >
                {isLoading ? (
                  <SpinnerLoader conHeight="100%" className="text-xl" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        )}
        {user?.role !== "client" &&
          booking.status === "completed" &&
          !booking.client_accepted && (
            <h1 className="bg-light_red/50 text-dark_red w-fit p-4 rounded-2xl my-4">
              Awaiting Client confirmation
            </h1>
          )}

        {user?.role !== "client" && booking.client_accepted && (
          <h1 className="bg-green-800 text-green-400 w-fit p-4 rounded-2xl my-4">
            Booking completed
          </h1>
        )}

        {user?.role === "photographer" && booking.status !== "completed" && (
          <h1 className="bg-light_red/50 text-dark_red w-fit p-4 rounded-2xl my-4">
            Update booking status when photos are ready
          </h1>
        )}

        <ALert
          action={handleFormSubmit}
          close={onModalClose}
          isOpen={isModalOpen}
          message="Accepting this means booking has been completed, are you sure?"
          description="This action can not be undone"
          loadingAction={isLoading}
        />
      </div>
    </div>
  );
};

export default FinishedBookingForm;

{
  /* <FormLabel className="text-lg text-dark_blue">
                    {user?.role === "client"
                      ? "I have checked the photos and I am satisfied"
                      : "The client is satisfied with the photos"}
                  </FormLabel> */
}
