import type { Metadata } from "next";
import { Cinzel, Archivo } from "next/font/google";
import "./globals.css";

// Cinzel for headings - elegant, classic display font
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Archivo for body text - modern, highly readable
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
        className={`${cinzel.variable} ${archivo.variable} font-body antialiased bg-black text-white`}
      >
        <NavProvider>
          <Navbar />
          <Template>{children}</Template>
        </NavProvider>
      </body>
    </html>
  );
}
