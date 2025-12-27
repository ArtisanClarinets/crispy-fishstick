import { getMdxContent, getMdxFiles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, BarChart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/reveal";

// Import MDX Components to pass directly
import { Callout } from "@/components/mdx/callout";
import { MetricGrid, MetricItem } from "@/components/mdx/metric";
import { Figure } from "@/components/mdx/figure";

// Define global components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold tracking-tight mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground" {...props} />,
  a: ({ href, children }: any) => (
    <Link href={href as string} className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
      {children}
    </Link>
  ),
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground" {...props} />,
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => (
    <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-foreground text-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="relative rounded bg-secondary px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground" {...props} />
  ),
  Callout,
  MetricGrid,
  MetricItem,
  Figure,
};

export default async function WorkDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let post;
  try {
    post = await getMdxContent("work", slug);
  } catch {
    notFound();
  }

  const { title, description, date, role, timeline, outcome, tags } = post.frontmatter;

  // Placeholder gradient lookup
  const placeholderStyle = siteConfig.workPlaceholders[slug as keyof typeof siteConfig.workPlaceholders] || { gradient: "from-gray-800 to-black", accent: "text-primary" };

  return (
    <article className="min-h-screen pb-24">
      {/* HERO HEADER */}
      <div className={`relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-12 md:pb-24 overflow-hidden`}>
         <div className={`absolute inset-0 bg-gradient-to-br ${placeholderStyle.gradient} opacity-30`} />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

         <div className="container relative z-10">
            <Link href="/work" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
            </Link>

            <Reveal>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">{title}</h1>
            </Reveal>

            <Reveal delay={0.1}>
               <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">{description}</p>
            </Reveal>

             <Reveal delay={0.2}>
               <div className="flex flex-wrap gap-2 mt-8">
                  {tags?.map((tag) => (
                     <span key={tag} className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium backdrop-blur-sm">
                        {tag}
                     </span>
                  ))}
               </div>
            </Reveal>
         </div>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
         {/* SIDEBAR METADATA - STICKY */}
         <aside className="lg:col-span-4 space-y-8">
            <div className="lg:sticky lg:top-24 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
               <h3 className="font-semibold text-lg mb-6 border-b border-border/50 pb-4">At a Glance</h3>

               <div className="space-y-6">
                  <div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <User className="h-4 w-4" /> Role
                     </div>
                     <p className="font-medium">{role}</p>
                  </div>

                  <div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" /> Timeline
                     </div>
                     <p className="font-medium">{timeline}</p>
                  </div>

                   <div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <BarChart className="h-4 w-4" /> Outcome
                     </div>
                     <p className="font-medium text-primary">{outcome}</p>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-border/50">
                   <Button className="w-full" disabled>
                      View Live Project <ArrowUpRight className="ml-2 h-4 w-4" />
                   </Button>
                   <p className="text-xs text-center text-muted-foreground mt-3">Access limited due to NDA</p>
               </div>
            </div>
         </aside>

         {/* MAIN CONTENT */}
         <div className="lg:col-span-8 prose prose-neutral dark:prose-invert prose-lg max-w-none">
            {/*
              With next-mdx-remote v5/RSC, `post.content` is already a compiled React Element.
              We just render it. We don't need <MDXRemote /> here if `lib/mdx.ts` uses `compileMDX`.
            */}
            {post.content}

            <div className="mt-24 pt-12 border-t border-border flex justify-between items-center not-prose">
               <h4 className="font-bold text-xl">Ready to build something similar?</h4>
               <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Book a Consultation</Link>
               </Button>
            </div>
         </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const files = await getMdxFiles("work");
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}
