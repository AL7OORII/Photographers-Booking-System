export const Routes = {
  HOME: "/",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  PHOTOGRAPHER_PROFILE_PAGE: (photographerId: string) =>
    `/photographer/${photographerId}`,

  PHOTOGRAPHER_UPLOAD_PIC_PAGE: (photographerId: string) =>
    `/upload/photographer/${photographerId}`,
  BOOKING_HOME_PAGE: "/bookings",
  BOOKING_INFO_PAGE: (bookingId: string) => `/bookings/${bookingId}`,
  SESSION_PAGE: (userId: string) => `/session/${userId}`,
};
