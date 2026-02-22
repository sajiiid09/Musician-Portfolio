import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("/news");

export default function Page() {
  return <div className="p-20 text-white">news Page</div>;
}
