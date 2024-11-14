import { RouterProvider } from "react-router-dom";
import Loader from "./components/loader/loader";
import useAuthCheck from "./hooks/auth/useAuthCheck";
import routes from "./routes";

function App() {
  const { isAuthChecking } = useAuthCheck();
  return isAuthChecking ? <Loader /> : <RouterProvider router={routes} />;
}

export default App;
