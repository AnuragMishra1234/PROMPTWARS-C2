import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TabProvider } from "@/context/TabContext";
import { TranslationProvider } from "@/context/TranslationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Election Process Assistant",
  description: "Understand elections visually. From your vote to final results — simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>
          <TabProvider>{children}</TabProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
