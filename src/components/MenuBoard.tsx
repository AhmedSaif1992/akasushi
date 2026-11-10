"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MENU_CATEGORIES } from "@/data/menuData";
import styles from "./MenuBoard.module.css";

interface FilterTab {
  id: string;
  label: string;
}

const FILTER_TABS: FilterTab[] = MENU_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.filterLabel,
}));

export default function MenuBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    MENU_CATEGORIES[0]?.id ?? ""
  );
  const [isFilterStuck, setIsFilterStuck] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const filtersListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const scrollTabIntoBar = useCallback((id: string) => {
    const slider = filtersListRef.current;
    const btnEl = tabRefs.current[id];
    if (!slider || !btnEl) return;
    const targetLeft =
      btnEl.offsetLeft - slider.clientWidth / 2 + btnEl.clientWidth / 2;
    slider.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, []);

  // Detect sticky state & active category on scroll
  useEffect(() => {
    const handleScrollAndResize = () => {
      const el = filtersRef.current;
      if (!el) return;

      const headerEl = document.querySelector("header");
      const navHeightStr = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--navbar-height");
      const navHeight =
        headerEl?.getBoundingClientRect().height ||
        parseFloat(navHeightStr) ||
        96;

      const rect = el.getBoundingClientRect();
      const stuck = rect.top <= navHeight + 2;

      setIsFilterStuck((prev) => {
        if (prev !== stuck) {
          window.dispatchEvent(
            new CustomEvent("aka:menu-filter-stuck", { detail: { stuck } })
          );
        }
        return stuck;
      });

      // Scrollspy: update active category tab while user scrolls naturally
      if (!isProgrammaticScrollRef.current) {
        const triggerLine = navHeight + rect.height + 64;
        let activeId = MENU_CATEGORIES[0]?.id ?? "";

        for (const cat of MENU_CATEGORIES) {
          const catEl = document.getElementById(cat.id);
          if (!catEl) continue;
          const catTop = catEl.getBoundingClientRect().top;
          if (catTop <= triggerLine) {
            activeId = cat.id;
          } else {
            break;
          }
        }

        setSelectedCategory((prev) => {
          if (prev !== activeId) {
            scrollTabIntoBar(activeId);
          }
          return activeId;
        });
      }
    };

    handleScrollAndResize();
    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize);

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
      window.dispatchEvent(
        new CustomEvent("aka:menu-filter-stuck", { detail: { stuck: false } })
      );
    };
  }, [scrollTabIntoBar]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = filtersListRef.current;
    if (!slider) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - slider.offsetLeft,
      scrollLeft: slider.scrollLeft,
      moved: false,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = filtersListRef.current;
    if (!slider || !dragStateRef.current.isDown) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = x - dragStateRef.current.startX;
    if (Math.abs(walk) > 5) {
      dragStateRef.current.moved = true;
      if (!isDragging) setIsDragging(true);
    }
    if (dragStateRef.current.moved) {
      e.preventDefault();
      slider.scrollLeft = dragStateRef.current.scrollLeft - walk * 1.25;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!dragStateRef.current.isDown) return;
    dragStateRef.current.isDown = false;
    setIsDragging(false);
  };

  const handleSelectCategory = (id: string) => {
    if (dragStateRef.current.moved) {
      dragStateRef.current.moved = false;
      return;
    }

    setSelectedCategory(id);
    scrollTabIntoBar(id);

    const categoryEl = document.getElementById(id);
    if (categoryEl) {
      const headerEl = document.querySelector("header");
      const navHeight = headerEl?.getBoundingClientRect().height || 96;
      const filterHeight =
        filtersRef.current?.getBoundingClientRect().height || 56;
      const offset = navHeight + filterHeight + 24;
      const targetTop =
        categoryEl.getBoundingClientRect().top + window.scrollY - offset;

      isProgrammaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current) {
        window.clearTimeout(programmaticScrollTimerRef.current);
      }
      programmaticScrollTimerRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 850);

      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }
  };

  return (
    <section className={styles.menuBoard} aria-label="Menu" ref={boardRef}>
      {/* Page Heading */}
      <header className={styles.intro}>
        <h1 className={styles.title}>Menu</h1>
      </header>

      {/* Sticky Category Tabs */}
      <div
        ref={filtersRef}
        className={`${styles.filtersWrapper} ${
          isFilterStuck ? styles.isStuck : ""
        }`.trim()}
      >
        <div className={styles.filtersInner}>
          <div
            ref={filtersListRef}
            className={`${styles.filtersDesktop} ${
              isDragging ? styles.isDragging : ""
            }`.trim()}
            role="tablist"
            aria-label="Menu categories"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterBtn} ${
                    isActive ? styles.isActive : ""
                  }`.trim()}
                  onClick={() => handleSelectCategory(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Categories Content */}
      <div className={styles.container}>
        {/* Visual Hero Banner */}
        <div className={styles.visualHero} aria-hidden="true">
          <div className={styles.visualMedia}>
            <Image
              src="/images/menu-page.webp"
              alt="AKA Restaurant & Lounge menu"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 90vw, 1100px"
              priority
            />
          </div>
        </div>

        {MENU_CATEGORIES.map((category) => (
          <article
            key={category.id}
            id={category.id}
            className={styles.category}
            data-category={category.id}
          >
            <header className={styles.categoryHeading}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              {category.subtitle && (
                <p className={styles.categorySubtitle}>{category.subtitle}</p>
              )}
            </header>

            <ul className={styles.dishGrid}>
              {category.dishes.map((dish, index) => {
                const prevGroup = category.dishes[index - 1]?.group;
                const isNewGroup = Boolean(dish.group && dish.group !== prevGroup);

                return (
                  <React.Fragment key={dish.id}>
                    {isNewGroup && dish.group && (
                      <li className={styles.groupHeader}>{dish.group}</li>
                    )}
                    <li className={styles.dish}>
                      <div className={styles.dishTop}>
                        <h3 className={styles.dishName}>{dish.name}</h3>
                        <span className={styles.dishPrice}>{dish.price}</span>
                      </div>

                      {dish.description && (
                        <p className={styles.dishDesc}>{dish.description}</p>
                      )}

                      {(dish.allergensLabel || dish.intoleranceLabel) && (
                        <p className={styles.dishMeta}>
                          {dish.allergensLabel
                            ? `Allergens: ${dish.allergensLabel}`
                            : "Allergens: None"}
                          {dish.intoleranceLabel
                            ? ` | Intolerance: ${dish.intoleranceLabel}`
                            : ""}
                        </p>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
