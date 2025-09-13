"use client";

import Link from "next/link";

export function TermsConditionsFooter() {
  return (
    <span>
      <Link className="underline" href="/terms">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link className="underline" href="/privacy">
        Privacy Policy
      </Link>
      .
    </span>
  );
}
