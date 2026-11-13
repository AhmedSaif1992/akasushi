"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/our-story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
];

const SOCIAL_LINKS = [
  {
    href: "https://maps.app.goo.gl/xYkv6dodUTRsCwKW6",
    icon: "/icons/map.svg",
    label: "Location",
    external: true,
  },
  {
    href: "mailto:aka@akasushi.ae",
    icon: "/icons/mail.svg",
    label: "Email",
    external: false,
  },
  {
    href: "https://instagram.com/akasushi.ae",
    icon: "/icons/instagram.svg",
    label: "Instagram",
    external: true,
  },
  {
    href: "tel:+971565004187",
    icon: "/icons/phone.svg",
    label: "Phone",
    external: false,
  },
  {
    href: "https://wa.me/971565004187",
    icon: "/icons/whatsapp.svg",
    label: "WhatsApp",
    external: true,
  },
];

function isCurrentPage(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const pathname = usePathname() ?? "/";

  // Show every link except the page the user is currently on
  const links = NAV_LINKS.filter((link) => !isCurrentPage(pathname, link.href));

  // Lock page scroll while open & close on Escape
  useEffect(() => {
    if (!isOpen) return;

    window.dispatchEvent(new CustomEvent("aka:scroll-lock"));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.dispatchEvent(new CustomEvent("aka:scroll-unlock"));
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="nav-menu"
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`.trim()}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Main">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              style={{ "--i": i } as React.CSSProperties}
              onClick={onClose}
            >
              <span className={styles.linkInner}>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={styles.separator} aria-hidden="true" />

          <div className={styles.social} aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={styles.socialLink}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Image src={social.icon} alt="" width={24} height={24} />
              </a>
            ))}
          </div>

          <div className={styles.location}>
            <h3 className={styles.locationHeading}>Location</h3>
            <a
              className={styles.locationText}
              href="https://maps.app.goo.gl/xYkv6dodUTRsCwKW6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>AKA Restaurant &amp; Lounge</span>
              <span>Mileo The Palm, West Beach, Palm Jumeirah</span>
              <span>Dubai, UAE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

