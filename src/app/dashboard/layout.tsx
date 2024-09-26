import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import Nav from "./Nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <section className="grid grid-cols-12">
      <MobileSidebar>
        <Nav />
      </MobileSidebar>
      <div className="bg-red-200 md:col-span-2 md:[display:block] hidden">
        <Nav />
      </div>
      <div className="bg-sky-200 md:col-span-10 col-span-12">{children}</div>
    </section>
  );
}
