import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import FormCalendar from "./FormCalendar";
import SpinnerLoader from "./SpinnerLoader";
import { bookingSchema } from "../../schemas/bookingSchema";
import { useParams } from "react-router-dom";
import { useCreateBooking } from "../../apis/photographer";

interface BookPhotographerFormProps {
  isOpen: boolean;
  close: () => void;
}

const BookPhotographerForm: React.FC<BookPhotographerFormProps> = ({
  isOpen,
  close,
}) => {
  const { photographerId } = useParams();

  const { mutateAsync: createBooking, isLoading: isBooking } = useCreateBooking(
    photographerId!
  );
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    console.log(values);
    await createBooking(values);
    handleCloseModal();
  }

  const handleCloseModal = () => {
    reset();
    close();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text">
            Are you sure you want to Book this Photographer
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormCalendar
              control={control}
              name="date"
              label="Select date"
              errors={errors}
            />
            <AlertDialogFooter className="gap-4 items-center">
              <Button
                onClick={handleCloseModal}
                className="w-full max-w-[150px] bg-dark_blue text-cream hover:bg-dark_blue/80"
                disabled={isBooking}
              >
                Cancel
              </Button>
              <Button
                className="w-full max-w-[150px] bg-dark_blue text-cream hover:bg-dark_blue/80"
                disabled={isBooking}
                type="submit"
              >
                {isBooking ? (
                  <SpinnerLoader conHeight="100%" className="text-xl" />
                ) : (
                  "Book"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookPhotographerForm;
