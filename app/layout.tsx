"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactQueryProvider>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBar
              height="2px"
              color="#18181B"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <Navigation />
            {children}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
