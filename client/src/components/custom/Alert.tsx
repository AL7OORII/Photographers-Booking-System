import { TickCircle } from "iconsax-react";
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

interface ALertProps {
  isOpen: boolean;
  message: string;
  description?: string;
  action: () => void;
  close: () => void;
  loadingAction?: boolean;
  justAlert?: boolean;
}

const ALert: React.FC<ALertProps> = ({
  isOpen,
  message,
  description,
  action,
  close,
  loadingAction,
  justAlert,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[96%] bg-dark_blue space-y-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-light text-lg">
            {message}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-light">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {justAlert && (
          <div className="flex justify-center items-center">
            <TickCircle size="60" color="#fdf0d5" />
          </div>
        )}
        {!justAlert && (
          <AlertDialogFooter className="gap-4 items-center">
            <>
              <Button
                onClick={action}
                className="w-full text-light  border-transparent"
                disabled={loadingAction}
              >
                {loadingAction ? (
                  <SpinnerLoader conHeight="100%" className="text-xl" />
                ) : (
                  "Continue"
                )}
              </Button>
              <Button
                onClick={close}
                className="w-full text-light bg-transparent border border-green hover:bg-green/70"
                disabled={loadingAction}
              >
                Cancel
              </Button>
            </>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ALert;
