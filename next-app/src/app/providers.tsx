"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider {...sessionProviderProps}>
        <ThemeProvider {...themeProviderProps}>{children}</ThemeProvider>
      </SessionProvider>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default Providers;
