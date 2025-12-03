import { plusJakartaSans, jetMono } from "@/lib/fonts";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${plusJakartaSans.variable} ${jetMono.variable}`}
    >
      <body suppressHydrationWarning={true} className="antialiased font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
