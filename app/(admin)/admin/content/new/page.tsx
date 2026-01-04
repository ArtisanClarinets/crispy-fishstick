import { ContentForm } from "@/components/admin/content/content-form";

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
      <div className="max-w-3xl">
        <ContentForm />
      </div>
    </div>
  );
}
