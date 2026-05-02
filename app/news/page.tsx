import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("/news");

export default function Page() {
  return <main className="min-h-screen w-full overflow-x-clip bg-black px-6 py-28 text-white md:p-20">news Page</main>;
}
