import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import { Navbar } from "@/components/navbar/index";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiFetch } from "@/lib/api";
import { getAccessToken } from "@/services/getAccessToken";
import { User } from "@/models/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await getAccessToken();
  const me: User | null = accessToken
    ? await apiFetch("/api/v1/me/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar user={me} />
          <main className="flex-1 p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
