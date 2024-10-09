import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MobileSidebar from "./_components/mobile-sidebar";
import NavLinks from "./_components/nav-links";
import { Suspense } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  school: React.ReactNode;
}

export default async function AdminLayout(props: AdminLayoutProps) {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <>
      <MobileSidebar className="md:hidden">
        {session.user.id && <NavLinks id={session.user.id} />}
      </MobileSidebar>
      <h1 className="text-center font-bold text-5xl mb-5">ManageIT</h1>
      <section className="grid grid-cols-12">
        <div className="md:col-span-2 md:[display:block] hidden p-4">
          <div className="flex flex-col">
            {session.user.id && <NavLinks id={session.user.id} />}
          </div>
        </div>
        <div className="md:col-span-10 col-span-12 p-4">
          {props.children}
          <Suspense fallback={<p>loading....</p>}>
            {props.admin}
            {props.school}
          </Suspense>
        </div>
      </section>
    </>
  );
}
