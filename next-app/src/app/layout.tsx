import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

// Root Metadata for all #1
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased",
          "selection:tw-bg-orange-500 selection:tw-text-background",
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
          {modal}
          <div
            className={cn(
              "tw-relative tw-min-h-screen",
              "tw-flex tw-flex-1 tw-flex-col",
              "tw-bg-background",
            )}
          >
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
