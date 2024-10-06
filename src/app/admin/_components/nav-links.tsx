"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOutButton from "./signout";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function NavLink({
  className,
  href,
  title,
}: {
  className: string;
  href: string;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <Button
      className={clsx(
        className,
        href === pathname ? "bg-zinc-500 text-black" : "",
      )}
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}

export default function NavLinks({ id }: { id: string }) {
  return (
    <nav className="h-full flex flex-col gap-2">
      <NavLink className="rounded-none" href="/admin" title="Dashboard" />
      <NavLink
        className="rounded-none"
        href={`/admin/${id}/settings`}
        title="Settings"
      />
      <SignOutButton className="rounded-none w-full" />
    </nav>
  );
}
