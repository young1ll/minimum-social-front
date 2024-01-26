import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from "@/components/site-header";

// Root Metadata for all #1
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased",
          // fontSans.className
        )}
      >
        <Providers
          themeProviderProps={{
            attribute: "class",
            defaultTheme: "system",
            enableSystem: true,
          }}
        >
          <div className="tw-relative tw-min-h-screen tw-flex tw-flex-col tw-bg-background">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
