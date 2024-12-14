import ErrorBoundaryFallback from "@/components/error-boundary/error-boundary-fallback";
import routes from "@/routes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    children: routes,
    errorElement: <ErrorBoundaryFallback />,
  },
]);

export default router;
