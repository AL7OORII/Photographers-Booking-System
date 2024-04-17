import { formatDistance } from "date-fns";
import { useAuthContext } from "../../providers/AuthProvider";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface PhotographerMessageBubbleProps {
  message: BookingMessageType;
}

const PhotographerMessageBubble: React.FC<PhotographerMessageBubbleProps> = ({
  message,
}) => {
  const { content, photographer, createdAt } = message;
  const { user } = useAuthContext();
  const style =
    user?.id === photographer._id ? " mr-14" : "flex-row-reverse ml-14";
  return (
    <div
      className={`${style} bg-light_blue/50 p-2 rounded-xl `}
    >
      <div className="flex justify-start gap-2 ">
        <Avatar className="relative z-[-1]">
          <AvatarFallback className=" text-light_blue text-sm font-semibold bg-dark_blue">
            {photographer.first_Name.slice(0, 1)}{" "}
            {photographer.last_Name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <h1 className="flex-1 text-sm font-medium">{content}</h1>
      </div>
      <p className="text-xs text-right">
        {formatDistance(new Date(createdAt), Date.now())} ago
      </p>
    </div>
  );
};

export default PhotographerMessageBubble;
