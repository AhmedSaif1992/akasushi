"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import styles from "./ReserveModal.module.css";

export interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReserveModal({ isOpen, onClose }: ReserveModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`.trim()}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reserve-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close reservation dialog"
          type="button"
        >
          <Image
            src="/reserve/reserve-close.svg"
            alt=""
            width={30}
            height={30}
          />
        </button>

        <div className={styles.header}>
          <p className={`eyebrow-sm ${styles.eyebrow}`}>Reservation</p>
          <h2 id="reserve-modal-title" className={styles.title}>
            Where the night comes alive
          </h2>
        </div>

        <div className={styles.options}>
          <a
            className={styles.option}
            href="https://wa.me/971565004187"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.optionIcon}
              src="/reserve/reserve-whatsapp.svg"
              alt=""
              width={90}
              height={90}
            />
            <span className={styles.optionText}>
              <span className={styles.optionTitle}>Reserve via WhatsApp</span>
              <span className={styles.optionSubtitle}>
                Chat with our team to arrange your reservation.
              </span>
            </span>
          </a>

          <a
            className={styles.option}
            href="https://www.sevenrooms.com/explore/akasushibar/reservations/create/search/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.optionIcon}
              src="/reserve/reserve-sevenrooms.svg"
              alt=""
              width={90}
              height={90}
            />
            <span className={styles.optionText}>
              <span className={styles.optionTitle}>Reserve via SevenRooms</span>
              <span className={styles.optionSubtitle}>
                Book your table online in just a few clicks.
              </span>
            </span>
          </a>
        </div>

        <p className={styles.footer}>We look forward to welcoming you.</p>
      </div>
    </div>
  );
}

interface ReserveModalContextValue {
  isOpen: boolean;
  openReserve: () => void;
  closeReserve: () => void;
}

const ReserveModalContext = createContext<ReserveModalContextValue | null>(
  null
);

export function useReserveModal() {
  const ctx = useContext(ReserveModalContext);
  if (!ctx) {
    throw new Error("useReserveModal must be used within ReserveModalProvider");
  }
  return ctx;
}

export function ReserveModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openReserve = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeReserve = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#reserve") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#reserve") {
        setIsOpen(true);
      }
    };
    checkHash();

    window.addEventListener("hashchange", checkHash);
    window.addEventListener("aka:open-reserve", openReserve);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("aka:open-reserve", openReserve);
    };
  }, [openReserve]);

  const value = useMemo(
    () => ({ isOpen, openReserve, closeReserve }),
    [isOpen, openReserve, closeReserve]
  );

  return (
    <ReserveModalContext.Provider value={value}>
      {children}
      <ReserveModal isOpen={isOpen} onClose={closeReserve} />
    </ReserveModalContext.Provider>
  );
}

export default ReserveModal;

