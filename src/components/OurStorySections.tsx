"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OurStorySections.module.css";

gsap.registerPlugin(ScrollTrigger);

interface LayerConfig {
  level: 1 | 2 | 3;
  src: string;
}

interface StorySectionItem {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  layers: LayerConfig[];
}

const STORY_SECTIONS: StorySectionItem[] = [
  {
    id: "origins",
    eyebrow: "The ORIGINS",
    title: "Born in The Ancient Kyoto, Japan",
    body: "Long before AKA became a destination, it was an idea born in the heart of Japan. It was inspired by a culture where the energy of modern cities lives in harmony with the silence of ancient temples, and where every detail, however small, carries meaning.",
    layers: [
      { level: 3, src: "/our-story-images/kyoto/kyoto-3.webp" },
      { level: 2, src: "/our-story-images/kyoto/kyoto-2.webp" },
      { level: 1, src: "/our-story-images/kyoto/kyoto-1.webp" },
    ],
  },
  {
    id: "craft",
    eyebrow: "THE CRAFT",
    title: "Honoring Japanese Culture and Craft",
    body: "To master sushi is to master patience. Our chefs follow the techniques of Japan’s old masters: the precise cut, the gentle press of seasoned rice, the respect for every ingredient. Each piece is shaped by hand, one at a time.",
    layers: [
      { level: 3, src: "/our-story-images/chef/chef-3.webp" },
      { level: 2, src: "/our-story-images/chef/chef-2.webp" },
      { level: 1, src: "/our-story-images/chef/chef-1.webp" },
    ],
  },
  {
    id: "dubai",
    eyebrow: "A New Home",
    title: "A New Chapter in Dubai",
    body: "Every tradition must travel to grow. AKA carried the soul of Japanese craft to Dubai, a city of ambition and endless diversity, and found its home at Mileo The Palm on West Beach, Palm Jumeirah. Step inside and taste Japan in Dubai.",
    layers: [
      { level: 3, src: "/our-story-images/dubai/dubai-3.webp" },
      { level: 2, src: "/our-story-images/dubai/dubai-2.webp" },
    ],
  },
];

// Speed multipliers: 1 is fastest, 2 is medium, 3 is slowest
const SPEED_CONFIG = {
  1: { from: 14, to: -14 },
  2: { from: 7, to: -7 },
  3: { from: 2.5, to: -2.5 },
};

function StoryParallaxSection({ section }: { section: StorySectionItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        const targetScope = isDesktop
          ? desktopBgRef.current
          : mobileWrapperRef.current;
        const triggerEl = isDesktop ? sectionEl : mobileWrapperRef.current;

        if (!targetScope || !triggerEl) return;

        ([1, 2, 3] as const).forEach((lvl) => {
          const layerEl = targetScope.querySelector<HTMLElement>(
            `[data-parallax-layer="${lvl}"]`
          );
          if (!layerEl) return;

          const { from, to } = SPEED_CONFIG[lvl];

          gsap.fromTo(
            layerEl,
            { yPercent: from },
            {
              yPercent: to,
              ease: "none",
              scrollTrigger: {
                trigger: triggerEl,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });
      }
    );

    return () => mm.revert();
  }, []);

  const sortedLayers = [...section.layers].sort((a, b) => b.level - a.level);

  return (
    <section
      ref={sectionRef}
      className={styles.storySection}
      aria-label={section.eyebrow}
    >
      {/* Desktop Background with Parallax Layers */}
      <div ref={desktopBgRef} className={styles.desktopBg} aria-hidden="true">
        {sortedLayers.map((layer) => (
          <div
            key={`desktop-layer-${layer.level}`}
            data-parallax-layer={layer.level}
            className={`${styles.layerWrapper} ${
              styles[`layerLevel_${layer.level}`]
            }`}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              quality={95}
              sizes="100vw"
              className={styles.layerImage}
            />
          </div>
        ))}
        <div className={styles.desktopOverlay} />
      </div>

      {/* Centered container with max-width 1250px and max-width 350px text box */}
      <div className={styles.container}>
        <div className={styles.textBox}>
          <p className={styles.eyebrow}>{section.eyebrow}</p>
          <h2 className={styles.title}>{section.title}</h2>
          <p className={styles.body}>{section.body}</p>
        </div>
      </div>

      {/* Mobile standalone image under text box with height 186.5vw and Parallax Layers */}
      <div
        ref={mobileWrapperRef}
        className={styles.mobileImageWrapper}
        aria-hidden="true"
      >
        {sortedLayers.map((layer) => (
          <div
            key={`mobile-layer-${layer.level}`}
            data-parallax-layer={layer.level}
            className={`${styles.layerWrapper} ${
              styles[`layerLevel_${layer.level}`]
            }`}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              quality={95}
              sizes="100vw"
              className={styles.layerImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function OurStorySections() {
  return (
    <>
      {STORY_SECTIONS.map((section) => (
        <StoryParallaxSection key={section.id} section={section} />
      ))}
    </>
  );
}
