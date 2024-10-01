import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileSidebar from "./mobile-sidebar";
import NavLinks from "./nav-links";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");

  console.log(session);

  return (
    <>
      <MobileSidebar className="md:hidden">
        <NavLinks />
      </MobileSidebar>
      <section className="min-h-svh grid grid-cols-12">
        <div className="md:col-span-2 md:[display:block] hidden p-4">
          <NavLinks />
        </div>
        <div className="md:col-span-10 col-span-12 p-4">{children}</div>
      </section>
    </>
  );
}
