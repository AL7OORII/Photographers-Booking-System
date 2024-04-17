import { cn } from "../../lib/lib";
import { Button } from "../ui/button";

interface AcceptedButtonProps {
  className?: string;
}
export const AcceptedButton: React.FC<AcceptedButtonProps> = ({
  className,
}) => {
  return (
    <Button
      disabled
      className={cn(
        "text-yellow-800 bg-yellow-400 disabled:opacity-100",
        className
      )}
    >
      Accepted
    </Button>
  );
};



interface PendingButtonProps {
  className?: string;
}
export const PendingButton: React.FC<PendingButtonProps> = ({ className }) => {
  return (
    <Button
      disabled
      className={cn(
        "text-blue-800 bg-blue-400 disabled:opacity-100",
        className
      )}
    >
      Pending
    </Button>
  );
};


interface RejectedButtonProps {
  className?: string;
}
export const RejectedButton: React.FC<RejectedButtonProps> = ({ className }) => {
  return (
    <Button
      disabled
      className={cn(
        "text-red-800 bg-red-400 disabled:opacity-100",
        className
      )}
    >
      Rejected
    </Button>
  );
};
interface ClosedButtonProps {
  className?: string;
}
export const ClosedButton: React.FC<ClosedButtonProps> = ({ className }) => {
  return (
    <Button
      disabled
      className={cn(
        "text-red-800 bg-red-400 disabled:opacity-100",
        className
      )}
    >
      Closed by Client
    </Button>
  );
};




interface CompletedButtonProps {
  className?: string;
}
export const CompletedButton: React.FC<CompletedButtonProps> = ({ className }) => {
  return (
    <Button
      disabled
      className={cn(
        "text-green-800 bg-green-400 disabled:opacity-100",
        className
      )}
    >
      Completed
    </Button>
  );
};
