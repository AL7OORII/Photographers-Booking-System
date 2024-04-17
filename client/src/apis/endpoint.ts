const baseUrl = "http://localhost:5000";

export const PHOTOGRAPHER_SIGNUP_ENDPOINT =
  baseUrl + "/auth/signup/photographer";
export const CLIENT_SIGNUP_ENDPOINT = baseUrl + "/auth/signup/client";
export const LOGIN_ENDPOINT = baseUrl + "/auth/login";
export const GET_USER_PROFILE_ENDPOINT = baseUrl + "/auth/profile";

//PHOTOGRAPHER
export const GET_PHOTOGRAPHER_DETAILS_ENDPOINT = (photographerId: string) =>
  baseUrl + `/photographer/details/${photographerId}`;

export const GET_PHOTOGRAPHER_PHOTOS_ENDPOINT = (photographerId: string) =>
  baseUrl + `/photographer/photos/${photographerId}`;

export const GET_TOP_PHOTOGRAPHERS_ENDPOINT =
  baseUrl + `/photographer/top-rated`;

export const UPLOAD_PHOTOGRAPHER_PICS_ENDPOINT = (photographerId: string) =>
  baseUrl + `/photographer/upload/${photographerId}`;

export const ADD_PHOTOGRAPHER_REVIEW_AND_RATING_ENDPOINT = (
  bookingId: string
) => baseUrl + `/photographer/review-and-rating/${bookingId}`;

export const GET_PHOTOGRAPHER_REVIEWS_ENDPOINT = (
  photographerId: string,
  page: number,
  limit: number
) =>
  baseUrl +
  `/photographer/reviews/${photographerId}?page=${page}&limit=${limit}`;

export const UPDATE_PHOTOGRAPHER_DETAILS_ENDPOINT = baseUrl + `/photographer`;
export const UPDATE_PHOTOGRAPHER_PASSWORD_ENDPOINT =
  baseUrl + `/photographer/password`;

export const DELETE_PHOTOGRAPHER_PHOTO_ENDPOINT = (photoId: string) =>
  baseUrl + `/photographer/photos/${photoId}`;

export const DELETE_PHOTOGRAPHER_ENDPOINT = (photographerId: string) =>
  baseUrl + `/photographer/${photographerId}`;

// BOOKINGS
export const BOOK_PHOTOGRAPHER_ENDPOINT = (photographerId: string) =>
  baseUrl + `/bookings/${photographerId}`;

export const GET_USER_BOOKINGS_ENDPOINT = baseUrl + `/bookings`;
export const GET_BOOKING_DETAILS_ENDPOINT = (bookingId: string) =>
  baseUrl + `/bookings/${bookingId}`;

export const SEND_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT =
  baseUrl + `/bookings/update`;

export const GET_PHOTOGRAPHER_BOOKIN_UPDATE_ENDPOINT = (bookingId: string) =>
  baseUrl + `/bookings/update/${bookingId}`;

//finished photod
export const UPLOAD_PHOTOGRAPHER_FINISHED_PHOTO_ENDPOINT = (
  photographerId: string
) => baseUrl + `/bookings/upload/${photographerId}`;
export const GET_PHOTOGRAPHER_FINISHED_PHOTOS_ENDPOINT = (bookingId: string) =>
  baseUrl + `/bookings/upload/${bookingId}`;
export const UPDATE_CLIENT_ACCEPTED_ENDPOINT = (bookingId: string) =>
  baseUrl + `/bookings/client-accepted/${bookingId}`;

export const DELETE_BOOKING_ENDPOINT = (bookingId: string) =>
  baseUrl + `/bookings/${bookingId}`;

export const DELETE_FINISHED_PHOTO_ENDPOINT = (photoId: string) =>
  baseUrl + `/bookings/upload/${photoId}`;

export const SEND_BOOKING_MESSAGE_ENDPOINT = baseUrl + `/bookings/message`;

export const GET_BOOKING_MESSAGES_ENDPOINT = (
  bookkingId: string,
  page: number,
  limit: number
) => baseUrl + `/bookings/message/${bookkingId}?page=${page}&limit=${limit}`;

// FEEDBACK
export const CREATE_FEEDBACK_ENDPOINT = baseUrl + `/feedback`;

//SEARCH
export const SEARCH_PHOTOGRAPHER_ENDPOINT = (
  page: number,
  limit: number,
  location?: string,
  name?: string,
  max_price?: string,
  min_price?: string,
  photography_style?: string
) =>
  baseUrl +
  `/search/?page=${page}&limit=${limit}&location=${location}&name=${name}&max_price=${max_price}&min_price=${min_price}&photography_style=${photography_style}`;

// NOTIFICATION
export const GET_USER_NOTIFICATIONS_ENDPOINT = baseUrl + `/notification`;
export const UPDATE_NOTIFICATION_STATUS_ENDPOINT = (notificationId: string) =>
  baseUrl + `/notification/${notificationId}`;

//CLIENT
export const DELETE_CLIENT_ENDPOINT = (clientId: string) =>
  baseUrl + `/client/${clientId}`;
