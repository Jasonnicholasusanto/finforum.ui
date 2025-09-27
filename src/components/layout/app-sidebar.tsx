"use client";

import * as React from "react";
import { LuHouse, LuChartCandlestick, LuChartPie } from "react-icons/lu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SidebarLogo } from "../ui/sidebar-logo";
import { usePathname } from "next/navigation"; // ✅ get current path
import { cn } from "@/lib/utils"; // ✅ merge Tailwind classes

const sidebarContents = [
  { label: "Dashboard", url: "/dashboard", icon: LuHouse },
  { label: "Stocks", url: "/stocks", icon: LuChartCandlestick },
  { label: "Analytics", url: "/analytics", icon: LuChartPie },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar
      className="backdrop-blur-md shadow-sm border-r-border"
      collapsible="icon"
      {...props}
    >
      <SidebarLogo />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {sidebarContents.map((item) => {
                const isActive = mounted && pathname.startsWith(item.url); // check match
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
