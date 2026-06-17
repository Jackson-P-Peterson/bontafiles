import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OG_IMAGE, SITE_TITLE, SITE_URL, ogImageUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteDescription =
  "The evidence trail of California's most compromised power couple. How Rob and Mia Bonta built a pay-to-play empire inside California's justice system and legislature.";

const shareDescription =
  "Opposition research dossier on Rob and Mia Bonta: Duong family straw donors, Oakland Promise fraud, CCW data breach, $469k legal spend, AB 2624, and the FBI corruption probe.";

const shareImage = {
  url: OG_IMAGE.path,
  secureUrl: ogImageUrl,
  width: OG_IMAGE.width,
  height: OG_IMAGE.height,
  alt: OG_IMAGE.alt,
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: SITE_TITLE,
  },
  description: siteDescription,
  applicationName: SITE_TITLE,
  category: "Politics",
  keywords: [
    "Rob Bonta",
    "Mia Bonta",
    "The Bonta Files",
    "Bonta Files",
    "California Attorney General",
    "Assembly District 18",
    "Duong family",
    "Oakland FBI corruption",
    "Music Cafe straw donors",
    "Oakland Promise",
    "Viridis Fuels",
    "CCW data breach",
    "AB 2624",
    "SB 14",
    "Mario Juarez",
    "behested payments",
    "opposition research",
    "California politics",
    "pay to play",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: shareDescription,
    type: "website",
    locale: "en_US",
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: shareDescription,
    images: {
      url: ogImageUrl,
      alt: OG_IMAGE.alt,
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Oakland",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: siteDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: siteDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [
        { "@type": "Person", name: "Rob Bonta", jobTitle: "California Attorney General" },
        { "@type": "Person", name: "Mia Bonta", jobTitle: "California State Assemblymember" },
      ],
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ogImageUrl,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Article",
      headline: SITE_TITLE,
      description: siteDescription,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: ogImageUrl,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      about: [
        { "@type": "Person", name: "Rob Bonta" },
        { "@type": "Person", name: "Mia Bonta" },
      ],
      keywords:
        "Rob Bonta, Mia Bonta, opposition research, Duong family, Oakland Promise, FBI corruption probe",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_TITLE,
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content={String(OG_IMAGE.width)} />
        <meta property="og:image:height" content={String(OG_IMAGE.height)} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content={OG_IMAGE.alt} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={OG_IMAGE.alt} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
