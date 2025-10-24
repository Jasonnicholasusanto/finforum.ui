"use client";

import Link from "next/link";
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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navbarItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            {item.children && item.children.length > 0 ? (
              <>
                {/* Parent item with dropdown */}
                <NavigationMenuTrigger variant="header">
                  {item.label}
                </NavigationMenuTrigger>

                <NavigationMenuContent className="p-4 grid gap-3 w-[300px] sm:w-[400px] md:w-[500px]">
                  {item.children.map((child) => (
                    <NavigationMenuLink
                      asChild
                      key={child.id}
                      className={cn(
                        "block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground transition"
                      )}
                    >
                      <Link href={child.href}>{child.label}</Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              // Single link without submenu
              <NavigationMenuLink
                asChild
                variant="header"
                className="font-medium text-sm text-muted-foreground hover:font-semibold hover:text-foreground transition"
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
