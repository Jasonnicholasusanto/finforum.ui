"use client";

import { createContext, ReactNode, useCallback, useState } from "react";
import { UserResponse } from "@/models/user";
import type { User } from "@supabase/supabase-js";
import React from "react";
import { getUserProfile } from "@/services/api/modules/me";

interface AppContextType {
  user: UserResponse | null;
  authUser: User | null;
  setUser: (user: UserResponse | null) => void;
  refreshUser: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
  user: initialUser,
  authUser,
}: {
  children: ReactNode;
  user: UserResponse | null;
  authUser: User | null;
}) {
  const [user, setUser] = useState(initialUser);

  const refreshUser = useCallback(async () => {
    try {
      const res = await getUserProfile();
      setUser(res);
    } catch (err) {
      console.error("refreshUser error:", err);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, authUser, setUser, refreshUser }}>
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
