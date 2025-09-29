"use client";

import { createContext, ReactNode, useState } from "react";
import { UserResponse } from "@/models/user";
import React from "react";

interface AppContextType {
  user: UserResponse | null;
  authUser: any;
  setUser: (user: UserResponse | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
  user: initialUser,
  authUser,
}: {
  children: ReactNode;
  user: UserResponse | null;
  authUser: any;
}) {
  const [user, setUser] = useState(initialUser);
  return (
    <AppContext.Provider value={{ user, authUser, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
