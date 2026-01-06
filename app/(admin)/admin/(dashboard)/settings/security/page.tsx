import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MFASettings } from "@/components/admin/mfa-settings";
import { requireAdmin } from "@/lib/admin/guards";
import { notFound } from "next/navigation";

export default async function SecuritySettingsPage() {
  await requireAdmin({ permissions: ["settings.read"] });
  
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { mfaSecret: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
      </div>

      <div className="max-w-4xl">
        <MFASettings initialEnabled={!!user?.mfaSecret} />
      </div>
    </div>
  );
}
