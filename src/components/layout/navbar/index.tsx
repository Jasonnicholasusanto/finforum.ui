"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { ModeToggle } from "../../ui/mode-theme-button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip";
import { cn } from "@/lib/utils";
import { logout } from "@/services/authActions";
import { redirect } from "next/navigation";
import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";
import { ExpandableSearch } from "@/components/layout/navbar/expandableSearch";
import SettingsMenu from "./SettingsMenu";
import { NavbarRoute } from "@/models/navbarRoute";
import NavbarMenu from "./navbarMenu";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSettingsItemClick?: (item: string) => void;
  navbarItems?: NavbarRoute[] | null;
}

export function Navbar({
  className,
  searchPlaceholder = "Search stocks, posts, users...",
  searchValue,
  onSearchChange,
  onSettingsItemClick,
  navbarItems,
  ...props
}: NavbarProps) {
  const { user } = useAppContext();
  const parsedUser = user ? User.fromJSON(user) : null;

  async function handleLogout() {
    await logout();
    redirect("/auth/login");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-20 px-4 md:px-8 lg:px-12 2xl:px-16",
        "backdrop-blur-md shadow-sm bg-header border-b border-border",
        className
      )}
      {...props}
    >
      <div className="flex h-full items-center justify-between">
        {/* ---------------- Left Side ---------------- */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/secondary-logo-light.png"
              alt="Finforum Secondary Logo Light"
              width={130}
              height={40}
              priority
              className="block dark:hidden"
            />
            <Image
              src="/images/secondary-logo-dark.png"
              alt="Finforum Secondary Logo Dark"
              width={130}
              height={40}
              priority
              className="hidden dark:block"
            />
          </Link>

          <NavbarMenu navbarItems={navbarItems || []} />
        </div>

        {/* ---------------- Right Side ---------------- */}
        <div className="flex items-center gap-4">
          <ExpandableSearch placeholder="Search stocks, posts, users..." />

          <SettingsMenu onItemClick={onSettingsItemClick} />
          <ModeToggle />

          <Separator
            orientation="vertical"
            className="mr-1 data-[orientation=vertical]:h-5"
          />

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full flex items-center justify-center border-4 border-transparent hover:border-accent transition-colors">
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={parsedUser?.profile?.profile_picture || ""}
                    />
                    <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400">
                      <FaUserCircle className="size-8" />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Account settings and more
                </TooltipContent>
              </Tooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col min-w-3xs p-3 gap-2">
              <DropdownMenuItem className="flex flex-col items-start gap-1">
                <Link
                  href={`/trader/${parsedUser?.profile.username}`}
                  prefetch
                  className="w-full"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition">
                      <AvatarImage
                        src={parsedUser?.profile?.profile_picture || ""}
                      />
                      <AvatarFallback className="flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-300">
                        <FaUserCircle className="size-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-md font-bold">
                        {parsedUser?.profile?.username}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        View Profile
                      </span>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm flex items-center gap-2">
                <MdOutlineSettings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm flex items-center gap-2"
                onClick={handleLogout}
              >
                <MdOutlineLogout className="h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
