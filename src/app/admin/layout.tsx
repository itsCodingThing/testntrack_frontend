import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileSidebar from "./_components/mobile-sidebar";
import NavLinks from "./_components/nav-links";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout(props: AdminLayoutProps) {
  const session = await auth();
  if (!session) return redirect("/login");
  if (session.user.type !== "admin") return redirect("/login");

  return (
    <>
      <MobileSidebar className="md:hidden">
        {session.user.id && <NavLinks />}
      </MobileSidebar>
      <section className="grid grid-cols-12 gap-4 h-screen max-h-screen">
        <div className="md:col-span-2 md:[display:block] hidden p-4">
          <div className="flex flex-col h-full">
            <h1 className="text-center font-bold text-3xl mb-5">ManageIT</h1>
            {session.user.id && <NavLinks />}
          </div>
        </div>
        <div className="md:col-span-10 col-span-12 p-4 overflow-y-auto">{props.children}</div>
      </section>
    </>
  );
}
