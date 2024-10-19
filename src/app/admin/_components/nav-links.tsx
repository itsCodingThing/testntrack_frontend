"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function NavLink({
  className,
  href,
  title,
}: {
  className?: string;
  href: string;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <Button
      className={cn(
        className,
        href === pathname ? "bg-zinc-500 text-black" : ""
      )}
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}

export default function NavLinks() {
  return (
    <nav className="h-full flex flex-col gap-2 py-5">
      <NavLink href="/admin" title="Dashboard" />
      <NavLink href="/admin/manage-schools" title="School" />
      <NavLink href="/admin/manage-admins" title="Admin" />
      <NavLink className="mt-auto" href="/admin/profile" title="Profile" />
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </nav>
  );
}
