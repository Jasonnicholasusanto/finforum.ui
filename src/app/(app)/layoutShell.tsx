"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { OnboardingGate } from "./(components)/onboardingGate";
import { UserResponse } from "@/models/user";
import { Navbar } from "@/components/layout/navbar/appNavbar";
import { AppContextProvider } from "@/contexts/app-context-provider";

export function LayoutShell({
  user,
  authUser,
  navbarRoutes,
  children,
}: {
  user: UserResponse | null;
  authUser: import("@supabase/supabase-js").User | null;
  navbarRoutes: import("@/models/navbarRoute").NavbarRoute[] | null;
  children: React.ReactNode;
}) {
  const [showOnboarding, setShowOnboarding] = useState(user === null);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AppContextProvider user={user} authUser={authUser}>
          <Navbar navbarItems={navbarRoutes} />
          <main className="p-8">
            {showOnboarding && (
              <OnboardingGate onComplete={() => setShowOnboarding(false)} />
            )}
            {children}
          </main>
        </AppContextProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
