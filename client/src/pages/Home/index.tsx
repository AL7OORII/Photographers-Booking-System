import { Navigate } from "react-router-dom";
import MainSearch from "../../components/custom/MainSearch";
import Recommendation from "../../components/custom/Recommendation";
import { useAuthContext } from "../../providers/AuthProvider";
import { Routes } from "../../utils/routeNames";

const HomePage = () => {
  const { user } = useAuthContext();

  if (user?.role === "photographer")
    return (
      <Navigate to={Routes.PHOTOGRAPHER_PROFILE_PAGE(user.id)} replace={true} />
    );

  return (
    <div className="w-full">
      <section>
        <MainSearch />
        <Recommendation />
      </section>
    </div>
  );
};

export default HomePage;
