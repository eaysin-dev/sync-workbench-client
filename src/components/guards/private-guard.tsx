import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
  const { isAuthenticate } = useAuthCheck();

  return isAuthenticate ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateGuard;
