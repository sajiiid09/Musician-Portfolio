import type { Metadata } from "next";
import { Cinzel, Archivo } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { ROOT_METADATA, MUSIC_GROUP_JSON_LD } from "@/lib/seo";
import { NavProvider } from "./context/NavContext";
import Template from "./template";
import "./globals.css";

// Cinzel for headings - elegant, classic display font
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Archivo for body text - modern, highly readable
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = ROOT_METADATA;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: MUSIC_GROUP_JSON_LD }}
        />
        <SmoothScroll />
        <div className="noise-overlay" />
        <NavProvider>
          <Navbar />
          <Template>{children}</Template>
        </NavProvider>
      </body>
    </html>
  );
}
