"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import NavMenu from "./NavMenu";
import { useReserveModal } from "./ReserveModal";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onReserveClick?: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function Navbar({ onReserveClick, onMenuToggle }: NavbarProps) {
  const { openReserve } = useReserveModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStickySolid, setIsStickySolid] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reserveBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reserveBtn = reserveBtnRef.current;
    const menuBtn = menuBtnRef.current;
    const headerEl = headerRef.current;

    const syncSize = () => {
      if (reserveBtn && menuBtn) {
        const h = reserveBtn.getBoundingClientRect().height;
        if (h > 0) {
          menuBtn.style.height = `${h}px`;
          menuBtn.style.width = `${h}px`;
        }
      }
      if (headerEl) {
        const headerH = headerEl.getBoundingClientRect().height;
        if (headerH > 0) {
          document.documentElement.style.setProperty(
            "--navbar-height",
            `${headerH}px`
          );
        }
      }
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    if (reserveBtn) ro.observe(reserveBtn);
    if (headerEl) ro.observe(headerEl);
    window.addEventListener("resize", syncSize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  useEffect(() => {
    const handleStickyChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ stuck: boolean }>;
      setIsStickySolid(Boolean(customEvent.detail?.stuck));
    };
    window.addEventListener("aka:menu-filter-stuck", handleStickyChange);
    return () => {
      window.removeEventListener("aka:menu-filter-stuck", handleStickyChange);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      onMenuToggle?.(next);
      return next;
    });
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    onMenuToggle?.(false);
  }, [onMenuToggle]);

  const handleReserveClick = () => {
    closeMenu();
    (onReserveClick ?? openReserve)();
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${
        isStickySolid ? styles.headerSticky : ""
      }`.trim()}
    >
      <NavMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="AKA Restaurant & Lounge"
        >
          <Image
            src="/akalogo.svg"
            alt="AKA Restaurant & Lounge"
            width={107}
            height={60}
            priority
            className={styles.logoImage}
            style={{ width: "auto" }}
          />
        </Link>

        <div className={styles.actions}>
          <Button
            ref={reserveBtnRef}
            variant="primary"
            onClick={handleReserveClick}
            aria-label="Reserve a table"
          >
            Reserve
          </Button>

          <Button
            ref={menuBtnRef}
            variant="secondary"
            type="button"
            className={styles.menuButton}
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Image
              src={
                isMenuOpen
                  ? "/icons/navbutton-close.svg"
                  : "/icons/navbutton-open.svg"
              }
              alt=""
              width={25}
              height={25}
              className={styles.menuIcon}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
