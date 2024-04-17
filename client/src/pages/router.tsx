import { Route, Routes } from "react-router-dom";
import {
  authRoutes,
  bookingsRoutes,
  landingPages,
  photographerRoutes,
  sessionRoutes,
} from "./routes";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";

const Router = () => {
  const pageRoutes = landingPages.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  const authenticationRoutes = authRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`/auth/${path}`} element={element} />;
    }
  );
  const photographersRoutes = photographerRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`${path}`} element={element} />;
    }
  );

  const bookingRoutes = bookingsRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`${path}`} element={element} />;
    }
  );
  const sessionsRoutes = sessionRoutes.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={`${path}`} element={element} />;
    }
  );

  // useAutoLogout();

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {authenticationRoutes}
      </Route>

      <Route path="" element={<MainLayout />}>
        {pageRoutes}
        {bookingRoutes}
        {photographersRoutes}
        {sessionsRoutes}
      </Route>

      {/* <Route path="" element={<PhotographerPagesLayout />}>
        {bookingRoutes}
      </Route> */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default Router;
