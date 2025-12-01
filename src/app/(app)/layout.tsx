import "../../styles/globals.css";
import { LayoutShell } from "./layoutShell";
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
    <LayoutShell user={user} authUser={authUser} navbarRoutes={navbarRoutes}>
      {children}
    </LayoutShell>
  );
}
