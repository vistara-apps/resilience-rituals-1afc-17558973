import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Resilience Rituals",
  description: "Build daily emotional resilience, track your progress, and boost your well-being.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/api/og",
      button: {
        title: "Launch Resilience Rituals",
        action: {
          type: "launch_frame",
          name: "Resilience Rituals",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/api/og",
          splashBackgroundColor: "#f0f4f8",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
