"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Nav() {
  return (
    <div className="grid grid-rows-2 gap-2 py-4">
      <Button variant="default">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button variant="default">
        <Link href="/dashboard/school">School</Link>
      </Button>
      <Button
        variant="default"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}