import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("/styleguide");

export default function Page() {
  return <div className="p-20 text-white">styleguide Page</div>;
}
