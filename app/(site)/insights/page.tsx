import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllMdxContent } from "@/lib/mdx";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Insights",
  description: "Writing on engineering rigor, system design, and product quality.",
};

export default async function InsightsPage() {
  const posts = await getAllMdxContent("insights");

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8" data-system-tone="insights">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts on building high-trust systems, designing for clarity, and
              the craft of software engineering.
            </p>
          </div>
        </Reveal>

        <div className="space-y-12">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <Link href={`/insights/${post.slug}`} className="group block">
                <article className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.frontmatter.readTime || "5 min read"}</span>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex items-center text-primary font-medium mt-2">
                    Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}

          {posts.length === 0 && (
             <p className="text-muted-foreground">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
