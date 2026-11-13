"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReserveModal } from "./ReserveModal";
import Button from "./Button";
import styles from "./OurStoryView.module.css";

const PILLARS = [
  {
    kanji: "忍",
    eyebrow: "Pillars of Craft — 01",
    title: "Patience and Precision",
    description:
      "Every cut, temperature, and grain of seasoned rice is held to uncompromising Japanese tradition. Mastery isn’t hurried; it unfolds quietly through repetition, discipline, and reverence.",
  },
  {
    kanji: "技",
    eyebrow: "Pillars of Craft — 02",
    title: "Hands That Know the Fish",
    description:
      "Decades of touch guide our chefs' blades. Sourcing world-class seasonal seafood from Toyosu Market and coastal Japan, treated with meticulous dry-aging and delicate curing.",
  },
  {
    kanji: "握",
    eyebrow: "Pillars of Craft — 03",
    title: "Shaped One Piece at a Time",
    description:
      "Each nigiri is pressed just once by human hands — firm enough to hold on its journey to the mouth, yet loose enough to melt across the palate the instant it arrives.",
  },
  {
    kanji: "縁",
    eyebrow: "Pillars of Craft — 04",
    title: "To Your Table",
    description:
      "Food is connection. From the quiet theater of our omakase counter to lively shared plates under the Dubai night sky, every moment is crafted to bring people together.",
  },
];

export default function OurStoryView() {
  const router = useRouter();
  const { openReserve } = useReserveModal();

  return (
    <article className={styles.ourStory}>
      <div className={styles.inner}>
        {/* ── Page Hero ── */}
        <header className={styles.hero}>
          <span className={styles.heroKanjiWatermark} aria-hidden="true">
            赤
          </span>
          <p className={styles.eyebrow}>The Heritage of AKA</p>
          <h1 className={styles.title}>Our Story</h1>
          <p className={styles.lead}>
            A Taste of Japan. An Experience Beyond. Rooted in the quiet rituals
            of Tokyo&apos;s culinary heritage, brought to life on the shores of
            West Beach, Palm Jumeirah.
          </p>
        </header>

        <div className={styles.divider} aria-hidden="true" />

        {/* ── Chapter 1: The Essence of AKA ── */}
        <section className={styles.essenceGrid} aria-labelledby="essence-heading">
          <div className={styles.essenceContent}>
            <span className={styles.chapterLabel}>Chapter I</span>
            <h2 id="essence-heading" className={styles.heading}>
              The Meaning of 赤 (AKA)
            </h2>
            <p className={styles.paragraph}>
              In Japanese, <strong>AKA (赤)</strong> translates to crimson red —
              the color of fire, sacred shrine gates (torii), life, and passion.
              For us, red is not merely an accent; it is the heartbeat of our
              kitchen and the mood that transforms our room.
            </p>
            <p className={styles.paragraph}>
              Founded on the belief that dining should be an artful sensory journey,
              AKA blends time-honored Edomae sushi craftsmanship with an intoxicating
              contemporary energy.
            </p>
          </div>

          <div className={styles.imageCard}>
            <Image
              src="/blogs/4.webp"
              alt="Neon red arched doorway inside AKA Restaurant"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </section>

        {/* ── Chapter 2: The Four Pillars ── */}
        <section className={styles.pillarsSection} aria-labelledby="pillars-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.chapterLabel}>Chapter II</span>
            <h2 id="pillars-heading" className={styles.heading}>
              The Four Disciplines
            </h2>
            <p className={styles.paragraph} style={{ textAlign: "center", maxWidth: "34rem" }}>
              Our philosophy guided by Japanese culinary principles and human touch.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className={styles.pillarCard}>
                <span className={styles.pillarKanji} aria-hidden="true">
                  {pillar.kanji}
                </span>
                <div className={styles.pillarHeader}>
                  <p className={styles.pillarEyebrow}>{pillar.eyebrow}</p>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                </div>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Chapter 3: Dual Energy ── */}
        <section className={styles.dualSection} aria-labelledby="dual-heading">
          <div className={styles.imagesDualGrid}>
            <div className={styles.imageDualItem}>
              <Image
                src="/experience/sushi.webp"
                alt="Sushi Artistry at the counter"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
            </div>
            <div className={styles.imageDualItem}>
              <Image
                src="/experience/beats.webp"
                alt="Live beats and nightlife atmosphere"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.essenceContent}>
            <span className={styles.chapterLabel}>Chapter III</span>
            <h2 id="dual-heading" className={styles.heading}>
              Two Acts, One Room
            </h2>
            <p className={styles.paragraph}>
              By day and dusk, AKA is a refined Japanese dining sanctuary — clear,
              focused, and reverent. Guests gather for exquisite usuzukuri, prime
              robata skewers, and delicate nigiri by the water.
            </p>
            <p className={styles.paragraph}>
              As ten o&apos;clock approaches, the lights drop, crimson tones ignite,
              and the sound rises. The dining floor shifts effortlessly into lounge
              territory — seamless, magnetic, and alive with curated music and
              bespoke mixology until late.
            </p>
          </div>
        </section>

        {/* ── Bottom Call To Action ── */}
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>Experience AKA Firsthand</h2>
          <p className={styles.ctaText}>
            Step inside our dining room or lounge. Reserve your table for dinner,
            omakase, or late evening drinks on Palm Jumeirah.
          </p>
          <div className={styles.ctaButtons}>
            <Button
              variant="primary"
              onClick={openReserve}
              aria-label="Reserve a table"
            >
              Reserve a Table
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/menu")}
              aria-label="View menu"
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
