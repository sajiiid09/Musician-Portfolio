import UpcomingEvents from "@/components/UpcomingEvents";
import MusicSection from "@/components/MusicSection";
import GalleryMarquee from "@/components/GalleryMarquee";
import NewsletterUpdates from "@/components/NewsletterUpdates";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Band from "@/components/Band";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata("/music");

export default function Music() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black">
      {/* --- MAIN CONTENT SECTIONS --- */}
        <MusicSection />
      
      <GalleryMarquee />
      <UpcomingEvents />
      <Footer />
    </main>
  );
}
