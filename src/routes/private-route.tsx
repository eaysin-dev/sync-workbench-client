import PrivateGuard from "@/components/guards/private-guard";
import RootLayout from "@/layout/root-layout";
import { RouteObject } from "react-router-dom";
import { getDashboardLink, getRoleLink, getUserLink } from "./router-link";

import {
  OverViewPage,
  RolesPage,
  UsersPage,
} from "@/routes/lazy-loaded-components";

const privateRoute: RouteObject[] = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: getDashboardLink(), element: <OverViewPage /> },
          { path: getUserLink(), element: <UsersPage /> },
          { path: getRoleLink(), element: <RolesPage /> },
        ],
      },
    ],
  },
];

export default privateRoute;
