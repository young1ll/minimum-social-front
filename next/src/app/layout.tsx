import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config';
import Providers from './providers';

// Root Metadata for all #1
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased',
          fontSans.variable
        )}>
        <Providers
          themeProviderProps={{
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
          }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
