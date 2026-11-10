import Image from "next/image";
import { JournalArticle } from "@/data/journalData";
import styles from "./JournalArticleView.module.css";

interface JournalArticleViewProps {
  article: JournalArticle;
}

export default function JournalArticleView({
  article,
}: JournalArticleViewProps) {
  const introText = article.intro || article.excerpt;
  const dateText = article.articleDate || article.date;

  return (
    <article
      className={styles.articlePage}
      aria-labelledby="journal-article-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.tag}>{article.tag}</span>
            <time className={styles.date}>{dateText}</time>
          </div>

          <h1 id="journal-article-title" className={styles.title}>
            {article.title}
          </h1>

          {introText && <p className={styles.intro}>{introText}</p>}
        </header>

        <div className={styles.media}>
          <Image
            src={article.imageSrc}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, min(75rem, 92vw)"
            quality={90}
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          {article.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
