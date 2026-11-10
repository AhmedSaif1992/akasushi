import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOURNAL_ARTICLES } from "@/data/journalData";
import JournalArticleView from "@/components/JournalArticleView";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return {
      title: "Article Not Found | AKA Restaurant & Lounge",
    };
  }
  return {
    title: `${article.title} | AKA Restaurant & Lounge`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <JournalArticleView article={article} />
    </main>
  );
}

