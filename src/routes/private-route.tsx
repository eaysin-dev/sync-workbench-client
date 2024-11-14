import PrivateGuard from "@/components/guards/private-guard";
import RootLayout from "@/layout/root-layout";
import EmployeePage from "@/pages/employee";
import OverViewPage from "@/pages/overview/_components/overview";
import ProductPage from "@/pages/product";
import {
  default as Profile,
  default as ProfileViewPage,
} from "@/pages/profile";
import { RouteObject } from "react-router-dom";
import {
  getDashboardLink,
  getEmployeeLink,
  getUserProfileLink,
} from "./router-link";

const privateRoute: RouteObject[] = [
  {
    element: <PrivateGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: getDashboardLink(), element: <OverViewPage /> },
          {
            path: getUserProfileLink(),
            element: <Profile />,
          },
          { path: getUserProfileLink(), element: <ProfileViewPage /> },
          { path: getEmployeeLink(), element: <EmployeePage /> },
          { path: "/product", element: <ProductPage /> },
        ],
      },
    ],
  },
];

export default privateRoute;
