"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./OurStoryHero.module.css";

gsap.registerPlugin(SplitText);

export default function OurStoryHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageEl = imageRef.current;
    const contentEl = contentRef.current;
    if (!imageEl || !contentEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Image fades in from darkness with a gentle settle
      tl.fromTo(
        imageEl,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 2.4, ease: "power2.out" },
        0
      );

      // 2. Text lines rise from their masks
      SplitText.create(contentEl.querySelectorAll("[data-hero-reveal]"), {
        type: "lines",
        mask: "lines",
        linesClass: "hero-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(contentEl, { autoAlpha: 1 });
          const lineTl = gsap.fromTo(
            self.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
            }
          );
          tl.add(lineTl, 0.9);
          return lineTl;
        },
      });
    });

    // Reduced motion: just show everything
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([imageEl, contentEl], { autoAlpha: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.hero} aria-label="Our Story">
      <div ref={imageRef} className={styles.imageWrapper}>
        <Image
          src="/our-story-images.webp"
          alt="The Crimson Story of AKA Sushi"
          fill
          priority
          quality={95}
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <p className={styles.eyebrow} data-hero-reveal>
            THE Story of Aka
          </p>
          <h1 className={styles.title} data-hero-reveal>
            The Crimson Story of AKA Sushi
          </h1>
        </div>
      </div>
    </section>
  );
}
