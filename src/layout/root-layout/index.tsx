import KBar from "@/components/kbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/layout/root-layout/app-sidebar";
import Header from "@/layout/root-layout/header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [defaultOpen, setDefaultOpen] = useState(false);

  // Check cookie for sidebar state on mount
  useEffect(() => {
    const sidebarState = Cookies.get("sidebar:state") === "true";
    setDefaultOpen(sidebarState);
  }, []);

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          <Outlet />
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default RootLayout;
