import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderSession from "@/components/providerSession";
import manifest from "../../public/manifest.json";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });


const APP_NAME = "Expezo";
const APP_DEFAULT_TITLE = "Expezo";
const APP_TITLE_TEMPLATE = "%s - Expezo";
const APP_DESCRIPTION = "The expense and task tracker you need!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <link rel="manifest" href="/manifest.json" />
        )}
      </Head>
      <body className={inter.className} style={{ scrollBehavior: "smooth",overflowX:"hidden" }}>
        <ProviderSession>{children}</ProviderSession>
      </body>
    </html>
  );
}
