import localFont from "next/font/local";

export const ivyPresto = localFont({
  src: [
    {
      path: "./fonts/IvyPresto Headline Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IvyPresto Headline Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ivy-presto",
  display: "swap",
});

export const ivyPrestoDisplay = localFont({
  src: [
    {
      path: "./fonts/IvyPresto Display Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IvyPresto Display Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ivy-presto-display",
  display: "swap",
});

export const ttDrugs = localFont({
  src: [
    {
      path: "./fonts/TTDrugs-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/TTDrugs-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-tt-drugs",
  display: "swap",
});

export const aoyagiKouzan = localFont({
  src: "./fonts/AoyagiKouzanT.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-aoyagi",
  display: "swap",
});
