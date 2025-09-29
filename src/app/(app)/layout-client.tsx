"use client";

import { useState } from "react";
import { OnboardingGate } from "./onboarding-gate";

export function LayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
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
