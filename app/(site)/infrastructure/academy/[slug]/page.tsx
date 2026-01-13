import { notFound } from "next/navigation";
import { getMdxContent } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


interface AcademyArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: AcademyArticlePageProps) {
  const params = await props.params;
  try {
    const { frontmatter } = await getMdxContent("academy", params.slug);
    return {
      title: `${frontmatter.title} | Infrastructure Academy`,
      description: frontmatter.description,
    };
  } catch {
    return {
      title: "Article Not Found",
    };
  }
}

export default async function AcademyArticlePage(props: AcademyArticlePageProps) {
  const params = await props.params;
  try {
    const { content, frontmatter } = await getMdxContent("academy", params.slug);

    return (
      <div className="container py-24 max-w-3xl">
        <Link href="/infrastructure/academy" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Academy
        </Link>

        <div className="space-y-4 mb-12 border-b pb-8">
          <div className="flex items-center gap-4 text-xs font-mono uppercase text-muted-foreground">
            <span>Infrastructure Academy</span>
            <span>•</span>
            <span>{frontmatter.readTime}</span>
            <span>•</span>
            <span>{frontmatter.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{frontmatter.title}</h1>
          <p className="text-xl text-muted-foreground">{frontmatter.description}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {content}
        </div>

        <div className="mt-16 pt-8 border-t">
          <div className="bg-muted/30 rounded-xl p-8 text-center space-y-4">
             <h3 className="text-2xl font-bold">Put this knowledge to work</h3>
             <p className="text-muted-foreground">
               Don't guess. Use our physics-based estimator to size your actual workload requirements.
             </p>
             <div className="flex gap-4 justify-center pt-4">
               <Button asChild size="lg" className="rounded-full">
                 <Link href="/infrastructure/estimator">Run Estimator</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full">
                 <Link href="/infrastructure/configurator">Build Config</Link>
               </Button>
             </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
