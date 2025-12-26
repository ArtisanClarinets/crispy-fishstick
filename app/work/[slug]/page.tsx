import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMdxContent, getMdxFiles } from "@/lib/mdx";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getMdxContent("work", slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    };
  } catch {
    return {
      title: "Not Found",
    };
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getMdxContent("work", slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = post;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Work
        </Link>

        {/* Header */}
        <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{frontmatter.description}</p>
            <div className="flex gap-4 items-center mb-4">
              {frontmatter.tags && frontmatter.tags.map((tag: string) => (
                   <span key={tag} className="text-xs font-medium text-muted-foreground uppercase tracking-wider border border-border px-2 py-1 rounded-full">
                    {tag}
                   </span>
              ))}
              <span className="text-xs text-muted-foreground">{frontmatter.date}</span>
            </div>
        </div>

        {/* MDX Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {content}
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const files = await getMdxFiles("work");
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}
