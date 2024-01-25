"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider as ReduxProvider } from "react-redux";
import React from "react";
import { store } from "@/redux/store";

interface ProvidersProps {
  children: React.ReactNode;
  sessionProviderProps?: SessionProviderProps;
  themeProviderProps?: ThemeProviderProps;
}

const Providers = ({ children, sessionProviderProps, themeProviderProps }: ProvidersProps) => {
  return (
    <SessionProvider {...sessionProviderProps}>
      <ReduxProvider store={store}>
        <ThemeProvider {...themeProviderProps}>{children}</ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default Providers;
