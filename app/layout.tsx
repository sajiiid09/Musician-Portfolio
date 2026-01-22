import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

import { NavProvider } from "./context/NavContext";
import Navbar from "@/components/Navbar";
import Template from "./template";
import { SITE_CONFIG } from "@/lib/assets";

export const metadata: Metadata = {
  title: SITE_CONFIG.fullName,
  description: `${SITE_CONFIG.tagline} ${SITE_CONFIG.genre} band from ${SITE_CONFIG.location}. Debut album "Dear Melancholia" coming soon.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-black text-white`}
      >
        <NavProvider>
          <Navbar />
          <Template>{children}</Template>
        </NavProvider>
      </body>
    </html>
  );
}