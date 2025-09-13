import { cookies } from "next/headers";
import StartupReveal from "@/components/animations/start-up-reveal";
import { workSans, jetMono } from "@/lib/fonts";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const hasSeenIntro = cookieStore.get("ff_seen_intro")?.value === "1";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${workSans.variable} ${jetMono.variable}`}
    >
      <body suppressHydrationWarning className="antialiased font-sans">
        {!hasSeenIntro && <StartupReveal oncePerSession />}{" "}
        {/* only render if not seen */}
        {children}
      </body>
    </html>
  );
}
