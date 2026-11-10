"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { EXPERIENCES_DATA, ExperienceItem } from "@/data/experiencesData";
import { useReserveModal } from "./ReserveModal";
import Button from "./Button";
import styles from "./ExperiencesBoard.module.css";

interface ExperiencesBoardProps {
  items?: ExperienceItem[];
}

export default function ExperiencesBoard({
  items = EXPERIENCES_DATA,
}: ExperiencesBoardProps) {
  const { openReserve } = useReserveModal();
  const boardRef = useRef<HTMLElement>(null);

  const featured = useMemo(
    () => items.find((item) => item.featured) ?? items[0] ?? null,
    [items]
  );

  const gridItems = useMemo(
    () => items.filter((item) => !item.featured),
    [items]
  );

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(gridItems.length / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return gridItems.slice(start, start + itemsPerPage);
  }, [gridItems, currentPage]);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={boardRef}
      className={styles.experiencesBoard}
      aria-label="Events"
    >
      <div className={styles.inner}>
        {/* Intro */}
        <header className={styles.intro}>
          <h1 className={styles.title}>Events</h1>
          <p className={styles.subtitle}>AKA&apos;s Events &amp; Offers</p>
        </header>

        <div className={styles.body}>
          {/* Featured Experience Card */}
          {featured && (
            <article
              id={featured.id}
              className={`${styles.card} ${styles.featuredCard}`}
              aria-label={featured.title}
            >
              <div className={styles.featuredMedia}>
                <Image
                  src={featured.imageSrc}
                  alt={featured.imageAlt}
                  width={1440}
                  height={1899}
                  priority
                  className={styles.featuredPoster}
                />
              </div>

              <div className={styles.featuredCopy}>
                <time className={styles.cardDate}>{featured.date}</time>

                <div className={styles.cardCopyMain}>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  {featured.description && (
                    <p className={styles.featuredDesc}>{featured.description}</p>
                  )}
                </div>

                <Button
                  variant="primary"
                  className={styles.bookBtn}
                  onClick={openReserve}
                  aria-label={`Book ${featured.title}`}
                >
                  Book Now
                </Button>
              </div>
            </article>
          )}

          {/* Regular Experience Grid */}
          <div className={styles.grid}>
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className={styles.card}
                aria-label={item.title}
              >
                <div className={styles.cardMedia}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 767px) 156px, 240px"
                    quality={90}
                    className={styles.cardImage}
                  />
                </div>

                <div className={styles.cardCopy}>
                  <time className={styles.cardDate}>{item.date}</time>

                  <div className={styles.cardCopyMain}>
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    {item.description && (
                      <p className={styles.cardDesc}>{item.description}</p>
                    )}
                  </div>

                  <a
                    href={item.ctaHref}
                    className={styles.detailsBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      openReserve();
                    }}
                  >
                    {item.ctaLabel || "More Details"}
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className={styles.pagination}
              aria-label="Events pages"
            >
              {Array.from({ length: totalPages }, (_, idx) => {
                const isActive = idx === currentPage;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.paginationBtn} ${
                      isActive ? styles.isActive : ""
                    }`.trim()}
                    aria-label={`Page ${idx + 1}`}
                    {...(isActive ? { "aria-current": "page" as const } : {})}
                    onClick={() => handlePageChange(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
