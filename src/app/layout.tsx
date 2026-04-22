import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = "https://continuum.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Continuum — AI Training & Advisory",
    template: "%s — Continuum",
  },
  description:
    "Practical AI training and strategic advisory for South African organisations. Workshops, executive briefings and multi-week corporate programmes that deliver real business impact.",
  applicationName: "Continuum",
  authors: [{ name: "Continuum" }],
  keywords: [
    "AI training",
    "AI advisory",
    "South Africa",
    "corporate AI",
    "AI workshops",
    "POPIA AI",
    "AI for compliance",
    "AI for business",
  ],
  openGraph: {
    type: "website",
    siteName: "Continuum",
    title: "Continuum — AI Training & Advisory",
    description:
      "Practical AI training and strategic advisory for South African organisations.",
    locale: "en_ZA",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuum — AI Training & Advisory",
    description:
      "Practical AI training and strategic advisory for South African organisations.",
  },
  icons: {
    icon: [
      {
        url: "/favicon-dark.jpg",
        type: "image/jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.jpg",
        type: "image/jpeg",
        media: "(prefers-color-scheme: light)",
      },
    ],
    shortcut: "/favicon-dark.jpg",
    apple: "/favicon-dark.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#05070A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" suppressHydrationWarning className={montserrat.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
