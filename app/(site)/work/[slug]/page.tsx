import { getMdxContent, getMdxFiles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Calendar, User, BarChart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { WorkDetailHero } from "@/components/work-detail-hero";
import { VTLink } from "@/components/vt-link";

export default async function WorkDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let post;
  try {
    post = await getMdxContent("work", slug);
  } catch {
    notFound();
  }

  const { title, description, role, timeline, outcome, tags } = post.frontmatter;

  return (
    <article className="min-h-screen pb-24">
      {/* HERO HEADER - Use Client Component for Shared Element Transition */}
      <WorkDetailHero
        slug={slug}
        title={title}
        description={description}
        tags={tags}
      />

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
            {post.content}

            <div className="mt-24 pt-12 border-t border-border flex justify-between items-center not-prose">
               <h4 className="font-bold text-xl">Ready to build something similar?</h4>
               <Button asChild size="lg" className="rounded-full">
                  <VTLink href="/contact">Book a Consultation</VTLink>
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
