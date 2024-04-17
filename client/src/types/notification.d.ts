interface NotificationType {
  _id: string;
  type:
    | "new-booking"
    | "message"
    | "photo-update"
    | "booking-status"
    | "review";
  clientId: string;
  photographerId: string;
  status: "read" | "unread";
  source: "client" | "photographer";
  createdAt: string;
  bookingId?: string;
  client?: {
    _id: string;
    first_Name: string;
    last_Name: string;
  };
  photographer?: {
    _id: string;
    first_Name: string;
    last_Name: string;
  };
}
