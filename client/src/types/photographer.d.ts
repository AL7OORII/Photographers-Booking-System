interface PhotographerType {
  _id: string;
  first_Name: string;
  last_Name: string;
  phone_Number: string;
  email: string;
  description: string;
  photography_style: string[];
  location: string;
  role: string;
  ratings: number[];
  rate: number;
  createdAt: string;
  updatedAt: string;
  price_range: {
    min: number;
    max: number;
  };
  other_services: string;
  averageRating: number;
}
interface PhotographerPhotosType {
  _id: string;
  secure_url: string;
  asset_id: string;
  public_id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface PhotographerReviewDataType {
  data: PhotographerReviewType[];
  metadata: MetadataType;
}
interface PhotographerSearchDataType {
  data: PhotographerType[];
  metadata: MetadataType;
}

interface PhotographerReviewType {
  _id: string;
  text: string;
  createdBy: string;
  photographerId: string;
  createdAt: string;
  updatedAt: string;
  client: {
    _id: string;
    first_Name: string;
    last_Name: string;
  };
}
