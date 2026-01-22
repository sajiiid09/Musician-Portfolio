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

export const metadata: Metadata = {
  title: "Islam Manik",
  description: "Official Website of Islam Manik",
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
          {children}
        </NavProvider>
      </body>
    </html>
  );
}