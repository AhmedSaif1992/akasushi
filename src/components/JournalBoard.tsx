"use client";

import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ARTICLES, JournalArticle } from "@/data/journalData";
import styles from "./JournalBoard.module.css";

interface JournalBoardProps {
  articles?: JournalArticle[];
}

export default function JournalBoard({
  articles = JOURNAL_ARTICLES,
}: JournalBoardProps) {
  const featured =
    articles.find((a) => a.layoutType === "featured") ?? articles[0];
  const boxes = articles.filter((a) => a.layoutType === "box");
  const cards = articles.filter((a) => a.layoutType === "card");

  return (
    <section className={styles.journal} aria-label="Journal">
      <header className={styles.header}>
        <h1 className={styles.title}>Journal</h1>
        <p className={styles.subtitle}>Look Whats New With AKA Sushi</p>
      </header>

      <div className={styles.list}>
        {/* Featured Top Card */}
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className={styles.featured}
            aria-label={featured.title}
          >
            <div className={styles.featuredMedia}>
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                quality={90}
                priority
                className={styles.coverImage}
              />
            </div>

            <div className={styles.featuredCopy}>
              <h2 className={styles.postTitle}>{featured.title}</h2>
              <p className={styles.postExcerpt}>{featured.excerpt}</p>

              <div className={styles.postMeta}>
                <time className={styles.postDate}>{featured.date}</time>
              </div>
            </div>
          </Link>
        )}

        {/* 2-Column Boxes */}
        {boxes.length > 0 && (
          <div className={styles.boxes}>
            {boxes.map((box) => (
              <Link
                key={box.slug}
                href={`/journal/${box.slug}`}
                className={styles.box}
                aria-label={box.title}
              >
                <div className={styles.boxMedia}>
                  <Image
                    src={box.imageSrc}
                    alt={box.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    quality={90}
                    className={styles.coverImage}
                  />
                </div>

                <div className={styles.boxCopy}>
                  <h2 className={styles.postTitle}>{box.title}</h2>
                  <p className={styles.postExcerpt}>{box.excerpt}</p>

                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>{box.date}</time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Horizontal Card List */}
        {cards.length > 0 && (
          <div className={styles.cards}>
            {cards.map((card) => (
              <Link
                key={card.slug}
                href={`/journal/${card.slug}`}
                className={styles.card}
                aria-label={card.title}
              >
                <div className={styles.cardMedia}>
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 20rem"
                    quality={90}
                    className={styles.coverImage}
                  />
                </div>

                <div className={styles.cardCopy}>
                  <h2 className={styles.postTitle}>{card.title}</h2>
                  <p className={styles.postExcerpt}>{card.excerpt}</p>

                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>{card.date}</time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
