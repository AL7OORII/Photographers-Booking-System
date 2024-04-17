import { useDeleteBooking } from "../../apis/bookings";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import SpinnerLoader from "./SpinnerLoader";

interface DeleteBookingModalProps {
  isOpen: boolean;
  toggle: () => void;
  booking: BookingType;
}

const DeleteBookingModal: React.FC<DeleteBookingModalProps> = ({
  isOpen,
  toggle,
  booking,
}) => {
  const { _id } = booking;

  const { isLoading, mutateAsync: deleteBooking } = useDeleteBooking(_id);

  const handleDelete = async () => {
    await deleteBooking();
    // toggle();
  };
  return (
    <Dialog open={isOpen} modal>
      <DialogContent className="w-[96%] bg-dark_blue space-y-4">
        <DialogHeader>
          <DialogTitle className="text-light text-lg">
            Delete booking
          </DialogTitle>
          <DialogDescription className="text-base text-light">
            Are you sure you want to delete this Booking, action can not be
            undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button
            className="w-full text-light bg-red-500 hover:bg-red-600 border-transparent"
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <SpinnerLoader conHeight="100%" className="text-xl" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            className="w-full text-light bg-transparent border border-green hover:bg-green/70"
            type="button"
            onClick={toggle}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookingModal;
