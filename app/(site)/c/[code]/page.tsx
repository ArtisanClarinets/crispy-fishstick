
interface SavedBuildPageProps {
  params: {
    code: string;
  };
}

export default async function SavedBuildPage({ params }: SavedBuildPageProps) {
  // In real impl: await prisma.infraBuild.findUnique({ where: { code: params.code } })
  // For now just scaffold
  const { code } = params;

  return (
    <div className="container py-24">
      <h1 className="text-3xl font-bold mb-4">Saved Build: {code}</h1>
      <p className="text-muted-foreground">
        This configuration is frozen and valid for 48 hours.
      </p>
      
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="font-semibold mb-4">Build Summary</h2>
        <div className="space-y-2 text-sm">
          <p>Status: <span className="text-green-500 font-mono">Active</span></p>
          <p>Expires: <span className="font-mono">In 47 hours</span></p>
        </div>
      </div>
    </div>
  );
}
