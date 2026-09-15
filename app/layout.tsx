import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Agency — We Shape the Digital Frontier",
  description:
    "Nova Agency shapes bold digital products, identities, and experiences for teams building what comes next.",
  keywords: [
    "design studio",
    "digital agency",
    "UI UX design",
    "3D motion design",
    "design agency",
  ],
  openGraph: {
    title: "Nova Agency — We Shape the Digital Frontier",
    description: "A digital agency for ideas with gravity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
