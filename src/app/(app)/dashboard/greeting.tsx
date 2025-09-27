"use client";

import { useAppContext } from "@/contexts/app-context-provider";
import { User } from "@/models/user";
import { Suspense, use } from "react";

export function Greeting() {
  const hour = new Date().getHours();
  const { userPromise } = useAppContext();
  const rawUser = use(userPromise);
  const user = rawUser ? User.fromJSON(rawUser) : null;

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
        {greeting} {user?.userFirstName}
      </h1>
    </Suspense>
  );
}
