import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import { Navbar } from "@/components/layout/navbar/index";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserData } from "@/services/getAccessToken";
import { AppContextProvider } from "@/contexts/app-context-provider";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUserData();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppContextProvider userPromise={userPromise}>
            <Navbar />
            <main className="flex-1 p-8">{children}</main>
          </AppContextProvider>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
