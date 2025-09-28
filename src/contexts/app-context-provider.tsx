"use client";

import { createContext, ReactNode } from "react";
import { UserResponse } from "@/models/user";
import React from "react";

interface AppContextType {
  user: UserResponse | null;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserResponse | null;
}) {
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
