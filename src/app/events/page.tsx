import type { Metadata } from "next";
import ExperiencesBoard from "@/components/ExperiencesBoard";

export const metadata: Metadata = {
  title: "Experiences & Events | AKA Restaurant & Lounge",
  description:
    "Discover live nights, performances, and signature moments at AKA Restaurant & Lounge on Palm Jumeirah, Dubai.",
};

export default function EventsPage() {
  return (
    <main>
      <ExperiencesBoard />
    </main>
  );
}
