"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { ThemeProvider } from "./components/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";

export function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <ErrorBoundary>
        <MiniKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
          config={{
            appearance: {
              mode: "auto",
              theme: "resilience-theme",
              name: "Resilience Rituals",
              logo: "/images/logo.png",
            },
          }}
        >
          {props.children}
        </MiniKitProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
