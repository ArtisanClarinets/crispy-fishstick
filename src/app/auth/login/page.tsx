import { redirect } from "next/navigation";

/**
 * Canonical login route is `/admin/login`.
 *
 * `/auth/login` is retained for backwards compatibility and redirects to the
 * admin login page to avoid duplicate auth surfaces.
 */
export default function LoginRedirectPage() {
  redirect("/admin/login");
}
