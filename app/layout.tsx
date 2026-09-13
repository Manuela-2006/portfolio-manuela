import "./globals.css";
import { Montserrat } from "next/font/google";
import { Hind } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "../components/sections/ThemeToggle";
import { LanguageProvider } from "./context/LanguageContext";

// Fuente ultra fina para el outline estilo Figma
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

const hind = Hind({
  subsets: ["latin"],
  weight: "400", // Regular
});

export const metadata: Metadata = {
  title: "Curriculum",
  description: "CV",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={montserrat.className}>
        <LanguageProvider>
        <ThemeProvider>

          {/* 🔥 Switch fijo en toda la web */}
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>

          {children}
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
