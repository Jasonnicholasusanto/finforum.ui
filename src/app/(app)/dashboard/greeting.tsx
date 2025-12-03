"use client";

import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";
import { Suspense } from "react";

export function Greeting() {
  const hour = new Date().getHours();
  const { user } = useAppContext();
  const userObj = user ? User.fromJSON(user) : null;

  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <Suspense fallback={<h1 className="text-3xl font-bold">Loading...</h1>}>
      <h1 className="text-3xl font-bold">
        {greeting} {userObj?.userFirstName}
      </h1>
    </Suspense>
  );
}
