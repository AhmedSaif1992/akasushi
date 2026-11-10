"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperienceSection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCardData {
  src: string;
  lines: [string, string];
  overlay?: string;
  fit?: React.CSSProperties["objectFit"];
  speed: number;
  mobileOrder: number;
}

const LEFT_CARDS: ExperienceCardData[] = [
  {
    src: "/experience/dining.webp",
    lines: ["Japanese", "Dining"],
    overlay:
      "linear-gradient(to left, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 49.874%)",
    fit: "fill",
    speed: 40,
    mobileOrder: 1,
  },
  {
    src: "/experience/authentic.webp",
    lines: ["Authentic", "Experience"],
    speed: 55,
    mobileOrder: 3,
  },
  {
    src: "/experience/beats.webp",
    lines: ["Live", "Beats"],
    speed: 45,
    mobileOrder: 6,
  },
];

const RIGHT_CARDS: ExperienceCardData[] = [
  {
    src: "/experience/sushi.webp",
    lines: ["Sushi", "Artistry"],
    overlay:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0) 74.66%, rgba(0, 0, 0, 0.4) 100%)",
    speed: 120,
    mobileOrder: 2,
  },
  {
    src: "/experience/crimson.webp",
    lines: ["Crimson", "Ambience"],
    speed: 130,
    mobileOrder: 4,
  },
  {
    src: "/experience/nights.webp",
    lines: ["Special", "Nights"],
    speed: 140,
    mobileOrder: 5,
  },
];

function renderMaskedText(
  text: string,
  dataAttr: string,
  s: Record<string, string>
) {
  const words = text.split(" ");
  return words.map((word, wordIndex) => (
    <span key={wordIndex} className={s.word}>
      {word.split("").map((char, charIndex) => (
        <span key={charIndex} className={s.charMask}>
          <span className={s.charInner} {...{ [dataAttr]: true }}>
            {char}
          </span>
        </span>
      ))}
      {wordIndex < words.length - 1 && (
        <span className={s.space}>&nbsp;</span>
      )}
    </span>
  ));
}

function ExperienceCard({ card }: { card: ExperienceCardData }) {
  const isReverseMobile = card.mobileOrder % 2 === 0;

  return (
    <div
      className={`${styles.card} ${
        isReverseMobile ? styles.cardReverseMobile : ""
      }`.trim()}
      data-experience-card
      data-speed={card.speed}
      data-reverse-mobile={isReverseMobile}
      style={{ "--mobile-order": card.mobileOrder } as React.CSSProperties}
    >
      <div className={styles.media} data-experience-media>
        <Image
          src={card.src}
          alt={`${card.lines[0]} ${card.lines[1]}`}
          fill
          sizes="(max-width: 768px) 65vw, 37vw"
          style={card.fit ? { objectFit: card.fit } : undefined}
        />
        {card.overlay && (
          <div
            className={styles.overlay}
            style={{ backgroundImage: card.overlay }}
          />
        )}
      </div>
      <p className={styles.label} data-experience-label>
        {card.lines[0]}
        <br />
        {card.lines[1]}
      </p>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop:
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        isMobile:
          "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        const eyebrow = section.querySelector<HTMLElement>(
          "[data-experience-eyebrow]"
        );
        const chars = section.querySelectorAll<HTMLElement>("[data-exp-char]");

        if (chars.length > 0) {
          gsap.set(chars, {
            yPercent: 115,
            backgroundPosition: "0% 0%",
            autoAlpha: 1,
          });
        }
        if (eyebrow) {
          gsap.set(eyebrow, { autoAlpha: 0, y: 24 });
        }

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });

        if (eyebrow) {
          titleTl.to(
            eyebrow,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            0
          );
        }

        if (chars.length > 0) {
          titleTl.to(
            chars,
            {
              yPercent: 0,
              backgroundPosition: "0% 100%",
              duration: 0.85,
              stagger: 0.025,
              ease: "power3.out",
            },
            0.1
          );
        }

        const cards = section.querySelectorAll<HTMLElement>(
          "[data-experience-card]"
        );

        cards.forEach((card) => {
          const speed = Number(card.dataset.speed) || 0;
          const isReverse = card.dataset.reverseMobile === "true";
          const media = card.querySelector<HTMLElement>(
            "[data-experience-media]"
          );
          const img = media?.querySelector<HTMLImageElement>("img");
          const label = card.querySelector<HTMLElement>(
            "[data-experience-label]"
          );

          // Smooth entrance reveal when each card enters the viewport
          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          });

          if (media) {
            revealTl.fromTo(
              media,
              {
                autoAlpha: 0,
                clipPath: "inset(14% 0% 0% 0%)",
              },
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.15,
                ease: "power3.out",
              },
              0
            );
          }

          if (img) {
            revealTl.fromTo(
              img,
              { scale: 1.14 },
              {
                scale: 1,
                duration: 1.4,
                ease: "power3.out",
              },
              0
            );
          }

          if (label) {
            const offsetX = !isDesktop && isReverse ? -22 : 22;
            revealTl.fromTo(
              label,
              { autoAlpha: 0, x: offsetX },
              {
                autoAlpha: 1,
                x: 0,
                duration: 1.05,
                ease: "power3.out",
              },
              0.15
            );
          }

          // Parallax scroll scrub
          const triggerConfig: ScrollTrigger.Vars = {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          };

          if (media && isDesktop) {
            gsap.fromTo(
              media,
              { y: () => speed * (window.innerWidth / 1512) },
              {
                y: () => -speed * (window.innerWidth / 1512),
                ease: "none",
                scrollTrigger: triggerConfig,
              }
            );
          }

          if (label) {
            const labelSpeed = speed + 70;
            gsap.fromTo(
              label,
              { y: () => labelSpeed * (window.innerWidth / 1512) },
              {
                y: () => -labelSpeed * (window.innerWidth / 1512),
                ease: "none",
                scrollTrigger: { ...triggerConfig },
              }
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.experience}
      id="experience"
      aria-labelledby="experience-title"
    >
      <p className={`eyebrow-lg ${styles.eyebrow}`} data-experience-eyebrow>
        Step Into AKA
      </p>
      <h2
        className={styles.title}
        id="experience-title"
      >
        <span className={styles.line}>
          {renderMaskedText("An Experience", "data-exp-char", styles)}
        </span>
        <span className={styles.line}>
          {renderMaskedText("Beyond the Ordinary", "data-exp-char", styles)}
        </span>
      </h2>
      <div className={styles.grid}>
        <div className={styles.col}>
          {LEFT_CARDS.map((card) => (
            <ExperienceCard key={card.src} card={card} />
          ))}
        </div>
        <div className={`${styles.col} ${styles.colRight}`}>
          {RIGHT_CARDS.map((card) => (
            <ExperienceCard key={card.src} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

