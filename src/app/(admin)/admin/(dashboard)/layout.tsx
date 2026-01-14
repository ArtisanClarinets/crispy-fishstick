import { AdminSidebar } from "@/widgets/admin/sidebar";
import { AdminHeader } from "@/widgets/admin/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";

const MAIN_CLASS = "flex-1 overflow-auto p-4 md:p-6";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user?.email);

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className={MAIN_CLASS}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
