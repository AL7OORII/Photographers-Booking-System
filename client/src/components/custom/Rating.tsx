//@ts-ignore
import ReactStars from "react-rating-stars-component";

interface RatingProps {
  rating: number;
  edit: boolean;
  size: number;
  onChange?: (value: number) => void;
  isHalf?: boolean;
}
const Rating: React.FC<RatingProps> = ({
  rating,
  edit,
  size,
  onChange,
  isHalf,
}) => {
  return (
    <ReactStars
      count={5}
      onChange={onChange}
      edit={edit}
      size={size}
      activeColor="#ffd700"
      value={rating}
      isHalf={isHalf}
    />
  );
};

export default Rating;
