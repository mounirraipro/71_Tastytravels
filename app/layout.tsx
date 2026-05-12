import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdSenseLoader from './components/AdSenseLoader';
import CookieConsentBanner from './components/CookieConsentBanner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tasty Travels – Free Online Browser Game",
    template: "%s | Tasty Travels",
  },
  description:
    "Play Tasty Travels online free — Play Tasty Travels free online — no download, no account needed. No download, no account needed.",
  keywords: [
    "Tasty Travels",
    "Tasty Travels online",
    "Tasty Travels free",
    "free online game",
    "browser game",
    "casual game",
  ],
  authors: [{ name: "Tasty Travels Team" }],
  creator: "Tasty Travels",
  publisher: "Tasty Travels",
  metadataBase: new URL("https://tastytravels.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tasty Travels",
    title: "Tasty Travels – Free Online Browser Game",
    description:
      "Play Tasty Travels free in your browser — Play Tasty Travels free online — no download, no account needed.",
    url: "https://tastytravels.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasty Travels – Free Online Browser Game",
    description:
      "Play Tasty Travels free online — no download, no account needed. Play free online!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en">
        <head>
        <AdSenseLoader publisherId={publisherId} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tasty Travels",
              url: "https://tastytravels.co",
              description:
                "Play Tasty Travels free online — no download, no account needed.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://tastytravels.co/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tasty Travels",
              url: "https://tastytravels.co",
              logo: {
                "@type": "ImageObject",
                url: "https://tastytravels.co/og-image.png",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://tastytravels.co/contact",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
