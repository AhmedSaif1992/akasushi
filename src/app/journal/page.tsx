import type { Metadata } from "next";
import JournalBoard from "@/components/JournalBoard";

export const metadata: Metadata = {
  title: "Journal | AKA Restaurant & Lounge",
  description:
    "What’s on at AKA Restaurant & Lounge — news, nights, and stories from Palm Jumeirah, Dubai.",
};

export default function JournalPage() {
  return (
    <main>
      <JournalBoard />
    </main>
  );
}
