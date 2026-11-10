import Image from "next/image";
import styles from "./Footer.module.css";

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

export default function Footer() {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {/* Column 1: Address */}
          <div className={styles.col}>
            <h3 className={styles.heading}>Address</h3>
            <a
              className={styles.text}
              href="https://maps.app.goo.gl/xYkv6dodUTRsCwKW6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>AKA Restaurant &amp; Lounge</span>
              <span>Mileo The Palm, West Beach, Palm Jumeirah</span>
              <span>Dubai, UAE</span>
            </a>
          </div>

          <div className={styles.separator} aria-hidden="true" />

          {/* Column 2: Contact Us */}
          <div className={`${styles.col} ${styles.colContact}`}>
            <h3 className={styles.heading}>Contact us</h3>
            <p className={styles.text}>
              <span>
                Phone:{" "}
                <a href="tel:+971565004187" className={styles.link}>
                  +971565004187
                </a>
              </span>
              <span>
                Email:{" "}
                <a href="mailto:aka@akasushi.ae" className={styles.link}>
                  aka@akasushi.ae
                </a>
              </span>
            </p>

            <div className={styles.social} aria-label="Social links">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className={styles.socialLink}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Image src={item.icon} alt="" width={24} height={24} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.separator} aria-hidden="true" />

          {/* Column 3: Hours */}
          <div className={styles.col}>
            <h3 className={styles.heading}>Hours</h3>
            <p className={styles.text}>
              <span>Monday – Friday: 12:00 PM – 1:00 AM</span>
              <span>Saturday &amp; Sunday: 12:00 PM – 2:00 AM</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>© 2026 AKA Sushi</p>
      </div>
    </footer>
  );
}

