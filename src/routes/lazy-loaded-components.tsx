import { lazy } from "react";

export const OverViewPage = lazy(
  () => import("@/pages/overview/_components/overview")
);
export const UsersPage = lazy(() => import("@/pages/users"));
export const RolesPage = lazy(() => import("@/pages/role"));

export const LoginPage = lazy(() => import("@/pages/auth/login"));
export const RegisterPage = lazy(() => import("@/pages/auth/register"));
