import { formatDistance } from "date-fns";
import { useAuthContext } from "../../providers/AuthProvider";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ClientMessageBubbleProps {
  message: BookingMessageType;
}

const ClientMessageBubble: React.FC<ClientMessageBubbleProps> = ({
  message,
}) => {
  const { content, client, createdAt } = message;
  const { user } = useAuthContext();
  const style = user?.id === client._id ? " mr-14" : "flex-row-reverse ml-14";
  return (
    <div className={`${style} bg-light_red/50 rounded-xl p-2`}>
      <div className="flex justify-start gap-2 ">
        <Avatar className="relative z-[-2]">
          <AvatarFallback className=" text-light_red text-sm font-semibold bg-dark_red relative">
            {client.first_Name.slice(0, 1)} {client.last_Name.slice(0, 1)}
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

export default ClientMessageBubble;
