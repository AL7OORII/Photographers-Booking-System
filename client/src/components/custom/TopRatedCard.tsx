import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import DisplayPhotographyStyles from "./DisplayPhotographyStyles";
import Rating from "./Rating";
import { Routes } from "../../utils/routeNames";
import { Location } from "iconsax-react";

interface TopRatedCardProps {
  photographer: PhotographerType;
}

const TopRatedCard: React.FC<TopRatedCardProps> = ({ photographer }) => {
  const {
    _id,
    first_Name,
    last_Name,
    averageRating,
    photography_style,
    price_range,
    description,
  } = photographer;

  return (
    <div className="bg-dark_blue p-4 space-y-4 rounded-2xl flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-cream font-bold text-base md:text-2xl">
            {first_Name} {last_Name}
          </h1>
          <h1 className="text-cream font-semibold">
            $ {Number(price_range.min).toLocaleString()} -{" "}
            {Number(price_range.max).toLocaleString()}
          </h1>
        </div>
        <h1 className="text-cream flex gap-1">
          <Location /> {photographer.location}
        </h1>
        <Rating edit={false} size={30} rating={averageRating} />
        <DisplayPhotographyStyles styles={photography_style} />
        <p className="text-cream text-sm">{description.slice(0, 300)}.....</p>
      </div>
      <Link to={Routes.PHOTOGRAPHER_PROFILE_PAGE(_id)}>
        <Button className="bg-cream text-dark_blue hover:bg-cream/50 hover:text-cream my-4">
          View Profile
        </Button>
      </Link>
    </div>
  );
};

export default TopRatedCard;
