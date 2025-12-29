import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { MetricGrid, MetricItem } from "@/components/mdx/metric";
import { Figure } from "@/components/mdx/figure";
import { ShopifySyncDiagram } from "@/components/mdx/ShopifySyncDiagram";
import { RedactionNote } from "@/components/mdx/RedactionNote";
import { SystemSpec } from "@/components/mdx/SystemSpec";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-6 text-gradient">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold tracking-tight mt-8 mb-4">{children}</h3>,
    p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">{children}</p>,
    a: ({ href, children }) => (
      <Link href={href as string} className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">{children}</ul>,
    ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-foreground text-lg">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-secondary px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
        {children}
      </code>
    ),
    Callout,
    MetricGrid,
    MetricItem,
    Figure,
    ShopifySyncDiagram,
    RedactionNote,
    SystemSpec,
    ...components,
  };
}
