import type { Metadata } from "next";
import MenuBoard from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Menu | AKA Restaurant & Lounge",
  description:
    "Explore the AKA Restaurant & Lounge Japanese menu — usuzukuri, sushi, sashimi, hot kitchen, signature rolls, and more on Palm Jumeirah, Dubai.",
};

export default function MenuPage() {
  return (
    <main>
      <MenuBoard />
    </main>
  );
}
