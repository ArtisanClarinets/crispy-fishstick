import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const MAIN_CLASS = "flex-1 overflow-auto p-4 md:p-6";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user?.email);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {isAuthenticated ? (
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <AdminHeader />
            <main className={MAIN_CLASS}>
              {children}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className={MAIN_CLASS}>{children}</main>
        </div>
      )}
    </div>
  );
}
