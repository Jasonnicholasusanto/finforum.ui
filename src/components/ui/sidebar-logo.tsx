"use client";

import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

export function SidebarLogo() {
  return (
    <SidebarHeader className="px-4 py-5">
      <Image
        src="/images/secondary-logo.png"
        alt="Finforum Secondary Logo"
        width={130}
        height={130}
        priority
        className="block group-data-[collapsible=icon]:hidden"
      />
      <Image
        src="/images/primary-logo.png"
        alt="Finforum Primary Logo"
        width={15}
        height={15}
        priority
        className="hidden group-data-[collapsible=icon]:block"
      />
    </SidebarHeader>
  );
}
