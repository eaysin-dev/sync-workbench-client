import useAuthCheck from "@/hooks/auth/use-auth-check";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
  const { isAuthenticate } = useAuthCheck();

  return isAuthenticate ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateGuard;
