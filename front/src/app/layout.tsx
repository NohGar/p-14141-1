import { ThemeProvider } from "next-themes";

import { Geist_Mono } from "next/font/google";
import Script from "next/script";

import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import ContextLayout from "./ContextLayout";
import GoogleAnalyticsProvider from "@/components/GoogleAnalyticsProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "슬로그",
  description: "슬로그는 당신을 위한 기술 블로그 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <GoogleAnalyticsProvider gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextLayout>{children}</ContextLayout>
          <Toaster richColors position="top-center" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
