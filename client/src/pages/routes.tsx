import { Navigate } from "react-router";
import HomePage from "./Home";
import LoginPage from "./auth/login";
import SignUpPage from "./auth/signup";
import PhotographerProfilePage from "./photographer/photographer";
import UploadPicsPage from "./photographer/upload-pics";
import BookingsHomePage from "./bookings/bookings";
import BookingInfoPage from "./bookings/booking-info";
import SessionPage from "./sessions/session";
import EditProfilePage from "./photographer/edit-profile";

export const landingPages: RouterType[] = [
  {
    path: "",
    element: <HomePage />,
    title: "home",
  },
];

export const authRoutes: RouterType[] = [
  {
    path: "/auth",
    element: <Navigate to="/login" />,
    title: "auth",
  },
  {
    path: "/login",
    element: <LoginPage />,
    title: "login",
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    title: "signup",
  },
];

export const photographerRoutes: RouterType[] = [
  {
    path: "/photographer/:photographerId",
    element: <PhotographerProfilePage />,
    title: "photographer-profile-page",
  },
  {
    path: "/upload/photographer/:photographerId",
    element: <UploadPicsPage />,
    title: "photographer-upload-pic-page",
  },
  {
    path: "/edit/photographer/:photographerId",
    element: <EditProfilePage />,
    title: "photographer-edit-profile-page",
  },
];

export const bookingsRoutes: RouterType[] = [
  {
    path: "/bookings",
    element: <BookingsHomePage />,
    title: "bookings-home-page",
  },
  {
    path: "/bookings/:bookingId",
    element: <BookingInfoPage />,
    title: "bookings-info-page",
  },
];
export const sessionRoutes: RouterType[] = [
  {
    path: "/session/:userId",
    element: <SessionPage />,
    title: "session-page",
  },
];
