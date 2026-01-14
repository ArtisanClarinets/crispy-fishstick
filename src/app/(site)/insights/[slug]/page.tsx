import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMdxContent, getMdxFiles } from "@/shared/lib/mdx";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getMdxContent("insights", slug);
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

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getMdxContent("insights", slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = post;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" data-system-tone="insights">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>

        {/* Header */}
        <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{frontmatter.title}</h1>
            <div className="flex gap-4 items-center text-sm text-muted-foreground border-b border-border pb-8">
               <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
               </time>
               {frontmatter.tags && (
                   <>
                    <span>•</span>
                    <div className="flex gap-2">
                        {frontmatter.tags.map((tag: string) => (
                            <span key={tag} className="uppercase tracking-wider font-medium">{tag}</span>
                        ))}
                    </div>
                   </>
               )}
            </div>
        </div>

        {/* MDX Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {content}
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const files = await getMdxFiles("insights");
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}
