import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/theme/theme-provider';
import { cn } from '@/lib/utils';

// Root Metadata for all #1
export const metadata: Metadata = {
  title: 'minimum-social',
  description:
    'Minimum-Social is a streamlined social media platform with a focus on simplicity, offering users a distraction-free experience, and featuring a core functionality of a simple voting system.',
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
