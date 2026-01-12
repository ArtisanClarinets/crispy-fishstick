// import { notFound } from "next/navigation";

interface AcademyArticlePageProps {
  params: {
    slug: string;
  };
}

export const metadata = {
  title: "Academy Article",
};

export default async function AcademyArticlePage({ params }: AcademyArticlePageProps) {
  // In real impl: await prisma.content.findUnique({ where: { slug: params.slug, type: 'academy' } })
  const { slug } = params;

  return (
    <div className="container py-24 max-w-3xl">
      <div className="space-y-4 mb-8">
        <div className="text-sm text-muted-foreground uppercase tracking-wider">Infrastructure Academy</div>
        <h1 className="text-4xl font-bold">{slug.replace(/-/g, ' ')}</h1>
      </div>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-xl lead">
          (Article content for {slug} will be rendered here from Markdown)
        </p>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}
