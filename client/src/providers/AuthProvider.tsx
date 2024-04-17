import config from "../utils/config";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserProfile } from "../apis/auth/auth";
import { Routes } from "../utils/routeNames";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  token: string;
  setEmail: (arg: string) => void;
  login: (args: LoginResp) => void;
  logout: () => void;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  email: "",
  token: "",
  setEmail: () => {},
  login: () => {},
  logout: () => {},
  user: null,
  setUser: () => {},
  activeLink: "",
  setActiveLink: () => {},
  setIsLoggedIn: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(config.key.isLoggedIn)
  );
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") ?? ""
  );
  const [user, setUser] = useState<UserData | null>(null);
  const [email, setEmail] = useState("");
  const [token] = useState(localStorage.getItem(config.key.token) || "");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const value = location.pathname.split("/")[1];
    localStorage.setItem("activeLink", value);
    setActiveLink(value);
  }, [location]);

  const {
    data,
    isLoading: fetchingUser,
    refetch: refetchUser,
    remove,
    status,
    error,
    isError,
    isPreviousData,
  } = useGetUserProfile();

  const login = async (args: LoginResp) => {
    localStorage.setItem(config.key.token, args.token);
    localStorage.setItem(config.key.register_email, args.email);
    localStorage.setItem(config.key.user_id, args.id);
    localStorage.setItem(config.key.role, args.role);
    localStorage.setItem(config.key.last_name, args.last_Name);
    localStorage.setItem(config.key.first_name, args.first_Name);
    localStorage.setItem(config.key.isLoggedIn, "true");
    setIsLoggedIn(true);
    if (args.role === "photographer") {
      navigate(Routes.PHOTOGRAPHER_PROFILE_PAGE(args.id));
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    console.log("called 3");
    localStorage.removeItem(config.key.token);
    localStorage.removeItem(config.key.first_name);
    localStorage.removeItem(config.key.last_name);
    localStorage.removeItem(config.key.register_email);
    localStorage.removeItem(config.key.isLoggedIn);
    localStorage.removeItem(config.key.expiresAt);
    localStorage.removeItem(config.key.user_id);
    localStorage.removeItem(config.key.role);
    localStorage.setItem(config.key.redirect, location.pathname);
    setIsLoggedIn(false);
    setUser(null);
      remove();
    navigate(Routes.HOME);
  };

  useEffect(() => {
    if (data) {
      setUser({
        email: data.email,
        first_Name: data.first_Name,
        last_Name: data.last_Name,
        role: data.role,
        id: data._id,
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(status);
    console.log(data);
    if (status === "error" && data) logout();
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        email,
        setEmail,
        token,
        setUser,
        user,
        activeLink,
        setActiveLink,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
