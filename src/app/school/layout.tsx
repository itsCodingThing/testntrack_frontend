import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SchoolLayout(props: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect("/login");
  if (session.user.type !== "school-admin") return redirect("/login");

  return <>{props.children}</>;
}
