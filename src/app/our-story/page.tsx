import type { Metadata } from "next";
import OurStoryView from "@/components/OurStoryView";

export const metadata: Metadata = {
  title: "Our Story | AKA Restaurant & Lounge",
  description:
    "Discover the story of AKA Restaurant & Lounge — Japanese culinary tradition, omakase craft, and nightlife on West Beach, Palm Jumeirah, Dubai.",
};

export default function OurStoryPage() {
  return (
    <main>
      <OurStoryView />
    </main>
  );
}
