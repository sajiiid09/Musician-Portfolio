import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("/store");

export default function StoreLayout({ children }: { children: ReactNode }) {
  return children;
}
