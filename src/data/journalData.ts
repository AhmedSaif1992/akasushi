export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  intro?: string;
  date: string;
  articleDate?: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  layoutType: "featured" | "box" | "card";
  paragraphs: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "after-dark-aka-changes",
    title: "After Dark, AKA Changes: How One Room Becomes Two Every Night",
    excerpt:
      "At ten, the lights drop, the music rises and the dining room becomes the lounge.",
    intro:
      "At ten, the lights drop, the music rises and the dining room becomes the lounge. One room. Two nights. Here’s how AKA shifts from dinner to after dark.",
    date: "Friday | 6 Nov 2026",
    articleDate: "Friday 6 Nov 2026",
    tag: "Nightlife",
    imageSrc: "/blogs/1.webp",
    imageAlt: "Guests dining by candlelight as AKA shifts into lounge mode",
    layoutType: "featured",
    paragraphs: [
      "As the last plates leave the pass, the room begins its second act. Candles stay lit, the volume lifts, and the dining floor opens into lounge territory — same address, different energy.",
      "It’s a deliberate changeover: lighting, sound, and service all move together so the night feels continuous rather than interrupted. Guests who came for dinner can stay for the room that follows.",
      "Reserve for dinner if you want the full arc — or arrive later when the lounge takes over.",
    ],
  },
  {
    slug: "built-by-hand-nigiri",
    title: "Built By Hand: Inside The Ritual Behind Every Piece Of Nigiri",
    excerpt:
      "Every piece of nigiri at AKA is shaped by hand, pressed just enough to hold and loose enough to fall apart on the tongue.",
    intro:
      "Every piece of nigiri at AKA is shaped by hand, pressed just enough to hold and loose enough to fall apart on the tongue.",
    date: "Monday | 2 Nov 2026",
    articleDate: "Monday 2 Nov 2026",
    tag: "Kitchen",
    imageSrc: "/blogs/2.webp",
    imageAlt: "AKA chef in red attire shaping nigiri by hand",
    layoutType: "box",
    paragraphs: [
      "The rice is seasoned and cooled to the touch of the hand. Each portion is formed once — no second press — so the grain stays distinct and the fish sits lightly on top.",
      "It’s a quiet ritual at the counter: knife, rice, fish, and a few seconds of judgment. The piece should hold on the journey to the mouth, then give way.",
      "Watch it at the counter if you can. The craft is half the story.",
    ],
  },
  {
    slug: "comfort-refined-broth",
    title: "Comfort, Refined: The Slow Broth Behind Our Warmest Dish",
    excerpt:
      "Hours on the stove, seasonal seafood and a bowl made for cooler Dubai nights.",
    intro:
      "Hours on the stove, seasonal seafood and a bowl made for cooler Dubai nights.",
    date: "Wednesday | 28 Oct 2026",
    articleDate: "Wednesday 28 Oct 2026",
    tag: "Kitchen",
    imageSrc: "/blogs/3.webp",
    imageAlt: "Seafood broth bowl on deep red fabric",
    layoutType: "box",
    paragraphs: [
      "The broth starts early and stays on a low flame. Bones, aromatics, and time do most of the work before seafood goes in at the last moment.",
      "It’s comfort without heaviness — clear flavour, soft heat, and a bowl that suits evenings when the air finally cools.",
      "Ask for it when the kitchen has the day’s catch at its best.",
    ],
  },
  {
    slug: "red-is-the-mood",
    title: "Red Is The Mood",
    excerpt:
      "The arches, the gold light and the colour that defines AKA after dark.",
    intro:
      "The arches, the gold light and the colour that defines AKA after dark.",
    date: "Friday | 23 Oct 2026",
    articleDate: "Friday 23 Oct 2026",
    tag: "Design",
    imageSrc: "/blogs/4.webp",
    imageAlt: "Neon red arched doorway inside AKA",
    layoutType: "card",
    paragraphs: [
      "Red isn’t decoration here — it’s the temperature of the room. Neon arches, warm gold, and dark surfaces set the frame before the first drink arrives.",
      "Walk the corridor and the colour does the introducing. By the time you sit, the mood is already set.",
      "Come after dark if you want to see it at full strength.",
    ],
  },
  {
    slug: "cooked-over-fire",
    title: "Cooked Over Fire: The Robata And The Wok At The Heart Of AKA",
    excerpt:
      "Charcoal, flame and the few seconds that make the difference between good and unforgettable.",
    intro:
      "Charcoal, flame and the few seconds that make the difference between good and unforgettable.",
    date: "Monday | 19 Oct 2026",
    articleDate: "Monday 19 Oct 2026",
    tag: "Kitchen",
    imageSrc: "/blogs/5.webp",
    imageAlt: "Flames rising from a pan in AKA’s kitchen",
    layoutType: "card",
    paragraphs: [
      "Robata and wok cooking live on timing. Charcoal heat, a hot pan, and a short window where the ingredient is sealed without drying out.",
      "You taste the fire first — smoke, char, and the sweetness that only high heat pulls out — then the seasoning underneath.",
      "Sit where you can see the pass if you want the theatre with the plate.",
    ],
  },
  {
    slug: "sound-of-aka-djs",
    title: "Meet The Sound Of AKA: The DJs Who Set The Pace After Dark",
    excerpt:
      "From the first course to last call, the residents behind every night's soundtrack.",
    intro:
      "From the first course to last call, the residents behind every night's soundtrack.",
    date: "Thursday | 15 Oct 2026",
    articleDate: "Thursday 15 Oct 2026",
    tag: "Nightlife",
    imageSrc: "/blogs/6.webp",
    imageAlt: "DJ performing at the AKA booth",
    layoutType: "card",
    paragraphs: [
      "Dinner starts softer. As the room turns, the booth takes the lead — residents who know when to lift the floor and when to hold it.",
      "The soundtrack is part of service: same care as the pass, timed to the night rather than a playlist on loop.",
      "Stay late enough and you’ll hear the room change with them.",
    ],
  },
  {
    slug: "aka-opens-its-doors",
    title: "AKA Opens Its Doors",
    excerpt:
      "Mina The Palm lit up red. A look back at our opening night, from the first plate to the last toast.",
    intro:
      "Mina The Palm lit up red. A look back at our opening night, from the first plate to the last toast.",
    date: "Sunday | 11 Oct 2026",
    articleDate: "Sunday 11 Oct 2026",
    tag: "News",
    imageSrc: "/blogs/7.webp",
    imageAlt: "Opening night crowd under AKA neon",
    layoutType: "card",
    paragraphs: [
      "Opening night filled the room before the doors had fully settled into routine. Red light, first plates, and a crowd that stayed for the toast.",
      "It was the first proof of what AKA was built for — dinner that turns into night without losing the room’s identity.",
      "We’re still writing the next chapters. This one was the start.",
    ],
  },
];
