import { getMdxFiles, getMdxContent } from "@/lib/mdx";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Work",
  description: "Selected case studies and projects.",
};

export default async function WorkPage() {
  const files = await getMdxFiles("work");
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return await getMdxContent("work", slug);
    })
  );

  return (
    <div className="container py-24 px-4">
      <div className="max-w-2xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Selected Work</h1>
        <p className="text-xl text-muted-foreground">
          A collection of production-grade systems, interfaces, and applications.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/work/${post.slug}`} className="group block h-full">
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-video bg-muted relative">
                 {/* Placeholder Image */}
                 <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
                     {post.frontmatter.title[0]}
                 </div>
              </div>
              <CardHeader>
                <div className="flex gap-2 flex-wrap mb-2">
                  {(post.frontmatter.tags as string[])?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors leading-tight">
                  {post.frontmatter.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.frontmatter.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
