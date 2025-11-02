"use client";

import { useState } from "react";
import { OnboardingGate } from "./onboardingGate";
import { UserResponse } from "@/models/user";

export function LayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResponse | null;
}) {
  const [showOnboarding, setShowOnboarding] = useState(user === null);

  return (
    <>
      {showOnboarding && (
        <OnboardingGate onComplete={() => setShowOnboarding(false)} />
      )}
      {children}
    </>
  );
}
