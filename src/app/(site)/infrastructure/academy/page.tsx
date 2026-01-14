import { getAllMdxContent } from "@/shared/lib/mdx";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure Academy",
  description: "Learn the truth about cloud costs, hardware performance, and data sovereignty.",
};

export default async function AcademyIndexPage() {
  const posts = await getAllMdxContent("academy");

  return (
    <div className="container py-24">
      <div className="max-w-2xl mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Infrastructure Academy</h1>
        <p className="text-xl text-muted-foreground">
          Inoculate yourself against cloud marketing fluff. Engineering truths, backed by math.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/infrastructure/academy/${post.slug}`} className="group h-full">
            <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex gap-2 mb-3">
                  {post.frontmatter.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-mono font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors text-xl">
                  {post.frontmatter.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.frontmatter.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                  <span>{post.frontmatter.readTime}</span>
                  <span className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
