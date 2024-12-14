import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import ErrorBoundaryFallback from "./components/error-boundary/error-boundary-fallback.tsx";
import ErrorBoundary from "./components/error-boundary/error-boundary.tsx";
import Loader from "./components/loader/loader.tsx";
import { ThemeProvider } from "./components/theme-toggle/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          <Suspense fallback={<Loader />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
