import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberShield — Real-Time Threat Intelligence Platform",
  description:
    "Defend, detect, and dominate cyber threats in real time. CyberShield delivers AI-powered threat detection across your entire attack surface with sub-2ms response times.",
  keywords: [
    "cybersecurity",
    "threat detection",
    "security dashboard",
    "SOC platform",
    "real-time monitoring",
    "attack surface management",
  ],
  authors: [{ name: "CyberShield" }],
  robots: "index, follow",
  openGraph: {
    title: "CyberShield — Real-Time Threat Intelligence Platform",
    description:
      "AI-powered threat detection across your entire attack surface.",
    type: "website",
    siteName: "CyberShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberShield — Real-Time Threat Intelligence Platform",
    description:
      "AI-powered threat detection across your entire attack surface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
