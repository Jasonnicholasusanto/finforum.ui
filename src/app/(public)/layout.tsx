import type { Metadata } from "next";
import "../../styles/globals.css";
import "../../styles/abstract-gradients.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import GradientBg from "@/components/ui/gradient-bg";

export const metadata: Metadata = {
  title: "Finforum",
  description: "Where finance meets community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <GradientBg />
      {children}
    </ThemeProvider>
  );
}
