"use client";

import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

export function SidebarLogo() {
  return (
    <SidebarHeader className="px-4 py-5">
      <div className="group-data-[collapsible=icon]:hidden">
        <Image
          src="/images/secondary-logo-light.png"
          alt="Finforum Secondary Logo Light"
          width={130}
          height={130}
          priority
          className="block dark:hidden"
        />
        <Image
          src="/images/secondary-logo-dark.png"
          alt="Finforum Secondary Logo Dark"
          width={130}
          height={130}
          priority
          className="hidden dark:block"
        />
      </div>
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
