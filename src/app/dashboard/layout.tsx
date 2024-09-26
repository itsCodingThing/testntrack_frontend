import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileSidebar from "./mobile-sidebar";
import Nav from "./nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");

  console.log(session);

  return (
    <section className="grid grid-cols-12">
      <MobileSidebar className="md:hidden">
        <Nav />
      </MobileSidebar>
      <div className="md:col-span-2 md:[display:block] hidden">
        <Nav />
      </div>
      <div className="md:col-span-10 col-span-12">{children}</div>
    </section>
  );
}
