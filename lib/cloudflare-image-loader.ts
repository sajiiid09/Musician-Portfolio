import type { ImageLoaderProps } from "next/image";

function encodeSource(src: string): string {
  return src.startsWith("/") ? encodeURI(src) : encodeURI(src);
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }

  const encodedSrc = encodeSource(src);

  // Keep local development and non-Cloudflare environments working without image errors.
  if (process.env.NODE_ENV !== "production") {
    return encodedSrc;
  }

  const imageQuality = quality ?? 75;
  return `/cdn-cgi/image/format=auto,width=${width},quality=${imageQuality}${encodedSrc}`;
}
