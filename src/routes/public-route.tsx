import PublicGuard from "@/components/guards/public-guard";
import { LoginPage, RegisterPage } from "@/routes/lazy-loaded-components";
import { RouteObject } from "react-router-dom";
import { getLoginLink, getRegisterLink } from "./router-link";

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: getLoginLink(), element: <LoginPage /> },
      { path: getRegisterLink(), element: <RegisterPage /> },
    ],
  },
];

export default publicRoute;
