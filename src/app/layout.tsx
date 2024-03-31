import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderSession from "@/components/providerSession";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expezo",
  description: "The expense tracker you need",
  manifest:"/manifest.webmanifest"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ scrollBehavior: "smooth" }}>
        <ProviderSession>{children}</ProviderSession>
      </body>
    </html>
  );
}
