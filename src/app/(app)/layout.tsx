import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import { Navbar } from "@/components/layout/navbar/index";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAuthUser, getUserData } from "@/services/getUserDataActions";
import { AppContextProvider } from "@/contexts/app-context-provider";
import { OnboardingGate } from "./onboarding-gate";
import { LayoutClient } from "./layout-client";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  const authUser = await getAuthUser();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppContextProvider user={user} authUser={authUser}>
            <Navbar />
            <main className="flex-1 p-8">
              <LayoutClient user={user}>{children}</LayoutClient>
            </main>
          </AppContextProvider>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
