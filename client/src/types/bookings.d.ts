interface BookingType {
  _id: string;
  createdBy: string;
  date: string;
  status: "pending" | "accepted" | "rejected" | "completed" |"closed";
  photographerId: string;
  clientPhotos: string;
  createdAt: string;
  updatedAt: string;
  client?: UserProfileRespData;
  photographer?: PhotographerType;
  client_accepted: boolean;
  photographer_done: boolean;
  client_rated: boolean;
}

interface BookingMessageDataType {
  metadata: MetadataType;
  messages: BookingMessageType[];
}

interface MetadataType {
  totalMessages: number;
  totalPages: number;
  currentPage: string;
  perPage: string;
  nextPage: boolean;
  previousPage: boolean;
}

interface BookingMessageType {
  _id: string;
  content: string;
  status: string;
  photographerId: string;
  clientId: string;
  sender: "client" | "photographer";
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  photographer: { _id: string; first_Name: string; last_Name: string };
  client: { _id: string; first_Name: string; last_Name: string };
}

interface BookingUpdatesType {
  _id: string;
  createdBy: string;
  bookingId: string;
  message: string;
  updatePhotos: string[];
  createdAt: string;
  updatedAt: string;
}

interface FinishedPhotoType {
  _id: string;
  secure_url: string;
  asset_id: string;
  public_id: string;
  createdBy: string;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}
