import { Button } from "../../components/ui/button";
import { Danger } from "iconsax-react";

interface FetchingErrorProp {
  message: string;
  retryFunction?: () => void;
  refetching: boolean;
}
const FetchingError: React.FC<FetchingErrorProp> = ({
  message,
  retryFunction,
  refetching,
}) => {
  return (
    <div
      className={`${
        refetching && "pointer-events-none opacity-50"
      } w-fit mx-auto flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-cream my-10`}
    >
      <div className="flex flex-wrap justify-center items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Danger size="32" className="text-light_red" />
          <p className="text-sm md:text-base text-light_red">{message}</p>
        </div>
        <Button
          className="h-8 w-14 text-dark p-0 px-4 py-1 text-base rounded-xl bg-dark_blue text-cream"
          onClick={retryFunction}
        >
          Retry
        </Button>
      </div>
    </div>
  );
};

export default FetchingError;
