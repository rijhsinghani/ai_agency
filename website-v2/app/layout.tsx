import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "./components/Nav";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const description =
  "AI growth partner for small businesses. We build AI systems that handle marketing, content, and follow-up so you can stay on the work side.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sameerautomations.com"),
  title: "Sameer Automations — AI growth partner for service businesses",
  description,
  alternates: {
    canonical: "https://sameerautomations.com",
  },
  openGraph: {
    title: "Sameer Automations — AI growth partner for service businesses",
    description,
    url: "https://sameerautomations.com",
    siteName: "Sameer Automations",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Automations — AI growth partner for service businesses",
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(outfit.variable, dmSans.variable, "font-sans", "dark")}
    >
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="sameerautomations.com"
        strategy="afterInteractive"
      />
      <body className="bg-[#0E0E0E] text-white antialiased">
        <TooltipProvider>
          <Nav />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
