'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  sessionProviderProps?: SessionProviderProps;
  themeProviderProps?: ThemeProviderProps;
}

const Providers = ({
  children,
  sessionProviderProps,
  themeProviderProps,
}: ProvidersProps) => {
  return (
    <SessionProvider {...sessionProviderProps}>
      <ThemeProvider {...themeProviderProps}>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
