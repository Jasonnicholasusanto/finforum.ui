"use client";

import { createContext, useState, ReactNode } from "react";
import { UserResponse } from "@/models/user";
import React from "react";

interface AppContextType {
  userPromise: Promise<UserResponse | null>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<UserResponse | null>;
}) {
  return (
    <AppContext.Provider
      value={{ userPromise: userPromise ?? Promise.resolve(null) }}
    >
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
