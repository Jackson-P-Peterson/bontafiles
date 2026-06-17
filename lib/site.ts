export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bontafiles.com";

export const SITE_TITLE = "The Bonta Files";

export const OG_IMAGE = {
  path: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Rob and Mia Bonta — The Bonta Files opposition research dossier",
} as const;

export const ogImageUrl = `${SITE_URL}${OG_IMAGE.path}`;
