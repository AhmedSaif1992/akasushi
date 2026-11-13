import Image from "next/image";
import styles from "./OurStoryHero.module.css";

export default function OurStoryHero() {
  return (
    <section className={styles.hero} aria-label="Our Story">
      <div className={styles.imageWrapper}>
        <Image
          src="/our-story-images.webp"
          alt="The Crimson Story of AKA Sushi"
          fill
          priority
          quality={95}
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>THE Story of Aka</p>
          <h1 className={styles.title}>The Crimson Story of AKA Sushi</h1>
        </div>
      </div>
    </section>
  );
}
