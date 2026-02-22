import type { Metadata } from "next";
import {
  ALBUM_DEAR_MELANCHOLIA,
  BAND_MEMBERS,
  LOGOS,
  SITE_CONFIG,
  STREAMING_LINKS,
} from "@/lib/assets";

const DEFAULT_SITE_URL = "https://cremainband.com";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

export const SITE_URL = new URL(normalizeSiteUrl(rawSiteUrl));

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export const SEO_KEYWORDS = [
  "Cremain band",
  "Dhaka post-rock",
  "progressive rock Bangladesh",
  "Dear Melancholia",
  "Bangladesh rock band",
  "post-rock band Dhaka",
];

export const DEFAULT_OG_IMAGES = [
  {
    url: ALBUM_DEAR_MELANCHOLIA.cover,
    width: 1200,
    height: 1200,
    alt: `${SITE_CONFIG.name} - ${ALBUM_DEAR_MELANCHOLIA.title} album cover`,
  },
  {
    url: LOGOS.white,
    width: 1200,
    height: 630,
    alt: `${SITE_CONFIG.name} logo`,
  },
] as const;

type PublicRoute = {
  path: string;
  title: string;
  description: string;
  priority: number;
  includeInSitemap?: boolean;
  indexable?: boolean;
};

export const PUBLIC_ROUTES: PublicRoute[] = [
  {
    path: "/",
    title: SITE_CONFIG.fullName,
    description: `${SITE_CONFIG.tagline} ${SITE_CONFIG.genre} band from ${SITE_CONFIG.location}. Debut album "${ALBUM_DEAR_MELANCHOLIA.title}" coming soon.`,
    priority: 1,
  },
  {
    path: "/about",
    title: `About ${SITE_CONFIG.name}`,
    description: `Learn about ${SITE_CONFIG.name}, a ${SITE_CONFIG.genre} band from ${SITE_CONFIG.location}, the members, and the story behind the sound.`,
    priority: 0.9,
  },
  {
    path: "/music",
    title: `${SITE_CONFIG.name} Music | ${ALBUM_DEAR_MELANCHOLIA.title}`,
    description: `Explore ${SITE_CONFIG.name} music, tracks, visuals, and updates around the upcoming album "${ALBUM_DEAR_MELANCHOLIA.title}".`,
    priority: 0.95,
  },
  {
    path: "/events",
    title: `${SITE_CONFIG.name} Events & Shows`,
    description: `See upcoming ${SITE_CONFIG.name} events, live show announcements, and album launch updates in ${SITE_CONFIG.location}.`,
    priority: 0.9,
  },
  {
    path: "/news",
    title: `${SITE_CONFIG.name} News`,
    description: `Latest news, announcements, and release updates from ${SITE_CONFIG.name}.`,
    priority: 0.7,
  },
  {
    path: "/store",
    title: `${SITE_CONFIG.name} Store`,
    description: `Shop official ${SITE_CONFIG.name} music and merchandise including ${ALBUM_DEAR_MELANCHOLIA.title} releases and merch.`,
    priority: 0.85,
  },
  {
    path: "/contact",
    title: `Contact ${SITE_CONFIG.name}`,
    description: `Get in touch with ${SITE_CONFIG.name} for booking, press, and management inquiries.`,
    priority: 0.8,
  },
  {
    path: "/styleguide",
    title: `${SITE_CONFIG.name} Styleguide`,
    description: "Internal design styleguide page.",
    priority: 0.1,
    includeInSitemap: false,
    indexable: false,
  },
];

const ROUTE_MAP = new Map(PUBLIC_ROUTES.map((route) => [route.path, route]));

export function getRouteSeo(path: string): PublicRoute {
  const route = ROUTE_MAP.get(path);

  if (!route) {
    throw new Error(`Unknown SEO route: ${path}`);
  }

  return route;
}

export function buildPageMetadata(path: string): Metadata {
  const route = getRouteSeo(path);
  const canonical = path === "/" ? "/" : path;

  return {
    title: route.title,
    description: route.description,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: path,
      siteName: SITE_CONFIG.name,
      type: "website",
      locale: "en_US",
      images: [...DEFAULT_OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [ALBUM_DEAR_MELANCHOLIA.cover],
    },
    robots:
      route.indexable === false
        ? {
            index: false,
            follow: false,
            nocache: true,
          }
        : {
            index: true,
            follow: true,
          },
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: SITE_URL,
  ...buildPageMetadata("/"),
};

export function getSitemapEntries(lastModified = new Date()) {
  return PUBLIC_ROUTES.filter((route) => route.includeInSitemap !== false).map(
    (route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      priority: route.priority,
      changeFrequency:
        route.path === "/" || route.path === "/music" || route.path === "/events"
          ? ("weekly" as const)
          : ("monthly" as const),
    }),
  );
}

export function getMusicGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": absoluteUrl("/#musicgroup"),
    name: SITE_CONFIG.name,
    url: absoluteUrl("/"),
    description: `${SITE_CONFIG.genre} band from ${SITE_CONFIG.location}. ${SITE_CONFIG.tagline}`,
    genre: ["Post-Rock", "Progressive Rock"],
    image: [
      absoluteUrl(ALBUM_DEAR_MELANCHOLIA.cover),
      absoluteUrl(LOGOS.white),
    ],
    logo: absoluteUrl(LOGOS.white),
    foundingDate: SITE_CONFIG.formed,
    foundingLocation: {
      "@type": "Place",
      name: SITE_CONFIG.location,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.socials.youtube,
      SITE_CONFIG.socials.spotify,
      ...STREAMING_LINKS.map((link) => link.url),
    ],
    member: BAND_MEMBERS.map((member) => ({
      "@type": "OrganizationRole",
      roleName: member.role,
      member: {
        "@type": "Person",
        name: member.name,
      },
    })),
    album: {
      "@type": "MusicAlbum",
      name: ALBUM_DEAR_MELANCHOLIA.title,
      image: absoluteUrl(ALBUM_DEAR_MELANCHOLIA.cover),
      datePublished: ALBUM_DEAR_MELANCHOLIA.releaseYear,
    },
    email: SITE_CONFIG.email,
  };
}

export const MUSIC_GROUP_JSON_LD = JSON.stringify(getMusicGroupJsonLd()).replace(
  /</g,
  "\\u003c",
);
