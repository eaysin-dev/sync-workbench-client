import { lazy } from "react";

export const OverViewPage = lazy(
  () => import("@/pages/overview/_components/overview")
);
export const UsersPage = lazy(() => import("@/pages/users"));
export const RolesPage = lazy(() => import("@/pages/role"));
export const Profile = lazy(() => import("@/pages/profile"));
export const EmployeePage = lazy(() => import("@/pages/employee"));
export const ProductPage = lazy(() => import("@/pages/product"));

export const LoginPage = lazy(() => import("@/pages/auth/login"));
export const RegisterPage = lazy(() => import("@/pages/auth/register"));
