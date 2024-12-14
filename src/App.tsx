import { RouterProvider } from "react-router-dom";
import Loader from "./components/loader/loader";
import useAuthCheck from "./hooks/auth/useAuthCheck";
import router from "./routes/router";

function App() {
  const { isAuthChecking } = useAuthCheck();
  return isAuthChecking ? <Loader /> : <RouterProvider router={router} />;
}

export default App;
