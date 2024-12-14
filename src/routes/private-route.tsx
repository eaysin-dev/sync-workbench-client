import PrivateGuard from "@/components/guards/private-guard";
import RootLayout from "@/layout/root-layout";
import { RouteObject } from "react-router-dom";
import {
  getDashboardLink,
  getEmployeeLink,
  getRoleLink,
  getUserLink,
  getUserProfileLink,
} from "./router-link";

// Lazy-loaded components
import {
  EmployeePage,
  OverViewPage,
  ProductPage,
  Profile,
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

          {
            path: getUserProfileLink(),
            element: <Profile />,
          },
          { path: getEmployeeLink(), element: <EmployeePage /> },
          { path: "/product", element: <ProductPage /> },
        ],
      },
    ],
  },
];

export default privateRoute;
