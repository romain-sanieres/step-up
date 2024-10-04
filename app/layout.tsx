import "./globals.css";
import { Navigation } from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer";
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
          <Navigation />
          {children}
          <Toaster />
          <Footer />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
