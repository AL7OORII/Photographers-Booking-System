import { FaSpinner } from "react-icons/fa6";
import { cn } from "../../lib/lib";

interface SpinnerLoaderProps {
  className?: string;
  conHeight: string;
}
const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  className,
  conHeight,
}) => {
  return (
    <div className={cn(`h-[${conHeight}] flex justify-center items-center`)}>
      <FaSpinner className={cn("animate-spin text-cream text-4xl", className)} />
    </div>
  );
};

export default SpinnerLoader;
