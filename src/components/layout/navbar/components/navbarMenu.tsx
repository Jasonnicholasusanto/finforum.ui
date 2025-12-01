"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavbarRoute } from "@/models/navbarRoute";

export default function NavbarMenu({
  navbarItems,
}: {
  navbarItems: NavbarRoute[];
}) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navbarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <NavigationMenuItem key={item.id}>
              {item.children && item.children.length > 0 ? (
                <>
                  <NavigationMenuTrigger
                    variant="header"
                    className={cn(
                      "font-medium text-sm transition",
                      isActive && "font-bold text-foreground"
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="p-4 grid gap-3 w-[300px] sm:w-[400px] md:w-[500px]">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <NavigationMenuLink
                          asChild
                          key={child.id}
                          className={cn(
                            "block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground transition",
                            isChildActive && "font-semibold text-foreground"
                          )}
                        >
                          <Link href={child.href}>{child.label}</Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  variant="header"
                  className={cn(
                    "font-medium text-sm text-muted-foreground hover:font-semibold hover:text-foreground transition",
                    isActive && "font-bold text-foreground"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
