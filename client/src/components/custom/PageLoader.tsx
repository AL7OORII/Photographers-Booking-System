import { FaPhotoFilm } from "react-icons/fa6";
import { cn } from "../../lib/lib";

interface PageLoaderProps {
  className?: string;
}
const PageLoader: React.FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <FaPhotoFilm className={cn("animate-bounce", className)} />
    </div>
  );
};

export default PageLoader;
