"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { useReserveModal } from "./ReserveModal";
import styles from "./CtaSection.module.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openReserve } = useReserveModal();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const eyebrow = section.querySelector<HTMLElement>("[data-cta-eyebrow]");
      const chars = section.querySelectorAll<HTMLElement>("[data-cta-char]");
      const button = section.querySelector<HTMLElement>("[data-cta-button]");

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
      if (button) {
        gsap.set(button, { autoAlpha: 0, y: 24 });
      }

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      if (eyebrow) {
        ctaTl.to(
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
        ctaTl.to(
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

      if (button) {
        ctaTl.to(
          button,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.cta}
      aria-labelledby="cta-title"
    >
      <div className={styles.media}>
        <Image
          src="/hero-images/cta-image.webp"
          alt="Visit AKA"
          fill
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className="eyebrow-lg" data-cta-eyebrow>
          Visit AKA
        </p>
        <h2 id="cta-title" className={styles.title}>
          <span className={styles.line}>
            {renderMaskedText("For Experience", "data-cta-char", styles)}
          </span>
          <span className={styles.line}>
            {renderMaskedText("Worth Remembering", "data-cta-char", styles)}
          </span>
        </h2>
        <div className={styles.buttonWrapper} data-cta-button>
          <Button
            variant="primary"
            onClick={openReserve}
            aria-label="Reserve a table"
          >
            Reserve
          </Button>
        </div>
      </div>
    </section>
  );
}

