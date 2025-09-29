"use client";

import * as React from "react";
import { use, useId } from "react";
import { SearchIcon } from "lucide-react";
import InfoMenu from "./InfoMenu";
import NotificationMenu from "./NotificationMenu";
import SettingsMenu from "./SettingsMenu";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../../ui/mode-theme-button";
import { Separator } from "../../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { logout } from "@/services/logout";
import { redirect } from "next/navigation";
import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    unread?: boolean;
  }>;
  onSearchChange?: (value: string) => void;
  onLayoutClick?: () => void;
  onAddClick?: () => void;
  onInfoItemClick?: (item: string) => void;
  onNotificationClick?: (notificationId: string) => void;
  onSettingsItemClick?: (item: string) => void;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      searchPlaceholder = "Search stocks, posts, users...",
      searchValue,
      notifications,
      onSearchChange,
      onLayoutClick,
      onAddClick,
      onInfoItemClick,
      onNotificationClick,
      onSettingsItemClick,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const { user } = useAppContext();
    const parsedUser = user ? User.fromJSON(user) : null;

    async function handleLogout() {
      await logout();
      redirect("/auth/login");
    }

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 h-16 px-4 md:px-6",
          "backdrop-blur-md shadow-md bg-header border-b-1 border-b-border",
          className
        )}
        {...props}
      >
        <div className="flex h-full items-center justify-between gap-4">
          <div className="relative flex-1">
            <Input
              id={`input-${id}`}
              className="peer h-8 w-full max-w-lg ps-8 pe-2"
              placeholder={searchPlaceholder}
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <NotificationMenu
                notifications={notifications}
                onNotificationClick={onNotificationClick}
              /> */}
              <SettingsMenu onItemClick={onSettingsItemClick} />
              <ModeToggle />
            </div>
            <Separator
              orientation="vertical"
              className="mr-1 data-[orientation=vertical]:h-5"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full flex items-center justify-center border-4 border-transparent hover:border-accent transition-colors">
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="" />
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
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
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
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm flex items-center gap-2">
                  <MdOutlineSettings className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-sm flex items-center gap-2"
                  onClick={() => {
                    handleLogout();
                  }}
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
);

Navbar.displayName = "Navbar";

export { InfoMenu, NotificationMenu, SettingsMenu };
