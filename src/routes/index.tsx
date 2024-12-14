import PageNotFound from "@/components/not-found/page-not-found";
import privateRoute from "./private-route";
import publicRoute from "./public-route";

const routes = [
  ...privateRoute,
  ...publicRoute,
  { path: "*", element: <PageNotFound /> },
];

export default routes;
