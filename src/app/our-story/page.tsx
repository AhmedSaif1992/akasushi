import type { Metadata } from "next";
import OurStoryHero from "@/components/OurStoryHero";

export const metadata: Metadata = {
  title: "The Crimson Story of AKA Sushi | AKA Restaurant & Lounge",
  description:
    "Discover the story of AKA Restaurant & Lounge on West Beach, Palm Jumeirah, Dubai.",
};

export default function OurStoryPage() {
  return (
    <main>
      <OurStoryHero />
    </main>
  );
}
