import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { ThemeProvider } from "./components/theme-toggle/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
