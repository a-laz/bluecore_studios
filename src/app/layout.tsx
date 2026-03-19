import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bluecorestudio.com"),
  title: {
    default: "Bluecore Studios — Web3 Infrastructure & AI Solutions",
    template: "%s | Bluecore Studios",
  },
  description:
    "We build DeFi protocols, AI-powered risk systems, and the compliance middleware that connects them to institutional capital.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Bluecore Studios",
    title: "Bluecore Studios — Web3 Infrastructure & AI Solutions",
    description:
      "Infrastructure for the Onchain Intelligence Era. DeFi protocols, AI agents, and compliance middleware.",
    type: "website",
    url: "https://bluecorestudio.com",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Bluecore Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecore Studios — Web3 Infrastructure & AI Solutions",
    description:
      "Infrastructure for the Onchain Intelligence Era. DeFi protocols, AI agents, and compliance middleware.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
