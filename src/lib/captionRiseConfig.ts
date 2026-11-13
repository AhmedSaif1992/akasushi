export interface FinaleCaption {
  eyebrow: string;
  title: string;
  kanji: string;
  side: "left" | "right";
}

export const FINALE_CAPTIONS: FinaleCaption[] = [
  { eyebrow: "with", title: "Patience and Precision", kanji: "忍", side: "left" },
  { eyebrow: "by", title: "Hands That Know the Fish", kanji: "技", side: "right" },
  { eyebrow: "shaped", title: "One Piece at a Time", kanji: "握", side: "left" },
  { eyebrow: "to", title: "Your Table", kanji: "縁", side: "right" },
];

export const CAPTION_BEAT_STARTS_PCT = [0, 25, 50, 75];
export const CAPTION_EDGE_FADE = 0.04;

export const RISE_TRAVEL_FROM_VH = { desktop: 70, mobile: 35 };
export const RISE_TRAVEL_TO_VH = { desktop: -50, mobile: -55 };
export const RISE_SPEED_FACTOR = 0.6;
export const RISE_OVERLAP = 0.05;
export const RISE_FADE_EDGE = 0.15;
export const RISE_KANJI_SPEED_FACTOR = 0.5;

export const RISE_FIGMA_REF = {
  desktop: { width: 1512, height: 818 },
  mobile: { width: 402, height: 874 },
};

export const RISE_LAYOUT = [
  // 忍 — well inside the text, low and to the right of it
  {
    desktop: { textTop: -143, textWidth: 544, kanjiX: 260, kanjiY: 34 },
    mobile: { textTop: -102, textWidth: 342, kanjiX: -20, kanjiY: -85 },
  },
  // 技 — pulled inboard and lifted back above the text
  {
    desktop: { textTop: -123, textWidth: 567, kanjiX: 250, kanjiY: -98 },
    mobile: { textTop: -102, textWidth: 372, kanjiX: -52, kanjiY: -102 },
  },
  // 握 — rides high above the text
  {
    desktop: { textTop: -143, textWidth: 544, kanjiX: 107, kanjiY: -111 },
    mobile: { textTop: -102, textWidth: 372, kanjiX: -8, kanjiY: -71 },
  },
  // 縁 — sits below the (single-line) text
  {
    desktop: { textTop: -73, textWidth: 476, kanjiX: 8, kanjiY: 33 },
    mobile: { textTop: -35, textWidth: 372, kanjiX: -24, kanjiY: -88 },
  },
];

export const RISE_SIDE_OFFSET_PX = 60;
export const RISE_KANJI_SIZE_PX = { desktop: 240.976, mobile: 240 };
export const RISE_TYPE_PX = {
  mobile: { eyebrow: 24, title: 64 },
};

export const RISE_KANJI_BLEND = "color-dodge";
export const RISE_KANJI_COLOR = "rgb(202 75 75 / 0.85)";
export const RISE_KANJI_BLUR_PX = 1;
