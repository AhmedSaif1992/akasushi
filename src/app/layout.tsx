import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReserveModalProvider } from "@/components/ReserveModal";
import { ivyPresto, ivyPrestoDisplay, ttDrugs, aoyagiKouzan } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AKA Sushi",
  description: "AKA Restaurant & Lounge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ivyPresto.variable} ${ivyPrestoDisplay.variable} ${ttDrugs.variable} ${aoyagiKouzan.variable}`}
    >
      <body className={ttDrugs.className} suppressHydrationWarning>
        <ReserveModalProvider>
          <Navbar />
          {children}
          <Footer />
        </ReserveModalProvider>
      </body>
    </html>
  );
}


