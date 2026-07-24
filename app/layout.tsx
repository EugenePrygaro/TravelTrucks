import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Travel Trucks",
  description:
    "A travel truck rental service that allows users to rent campers for their travel needs.",
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
