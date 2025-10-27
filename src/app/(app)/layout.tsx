import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import { Navbar } from "@/components/layout/navbar/index";
import { AppContextProvider } from "@/contexts/app-context-provider";
import { LayoutClient } from "./layout-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavbarRoute } from "@/models/navbarRoute";
import { UserResponse } from "@/models/user";
import { User } from "@supabase/supabase-js";
import { getNavbarRoutes } from "@/services/api/modules/navBar";
import { getAuthUser } from "@/services/api/modules/auth";
import { getUserProfile } from "@/services/api/modules/me";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserResponse | null = await getUserProfile();
  const authUser: User | null = await getAuthUser();
  const navbarRoutes: NavbarRoute[] | null = await getNavbarRoutes();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AppContextProvider user={user} authUser={authUser}>
          <Navbar navbarItems={navbarRoutes} />
          <main className="flex-1 p-6 lg:p-8 mt-2">
            <LayoutClient user={user}>{children}</LayoutClient>
          </main>
        </AppContextProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
