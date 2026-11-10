import styles from "./HeartOfJapan.module.css";

function renderMaskedChars(text: string) {
  return text.split("").map((char, index) => {
    if (char === " ") {
      return (
        <span key={index} className={styles.space}>
          &nbsp;
        </span>
      );
    }
    return (
      <span key={index} className={styles.charMask} data-hoj-mask>
        <span className={styles.charInner} data-hoj-char>
          {char}
        </span>
      </span>
    );
  });
}

interface HeartOfJapanProps {
  className?: string;
}

export default function HeartOfJapan({ className = "" }: HeartOfJapanProps) {
  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-label="From The Heart of Japan"
    >
      <h2 className={styles.title}>
        <span className={styles.from}>{renderMaskedChars("from")}</span>
        <span className={styles.line}>{renderMaskedChars("The Heart")}</span>
        <span className={styles.line}>{renderMaskedChars("of Japan")}</span>
      </h2>
    </section>
  );
}
