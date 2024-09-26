import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <div className="grid grid-rows-2 gap-2 py-4">
      <Button variant="default">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button variant="default">
        <Link href="/dashboard/school">School</Link>
      </Button>
    </div>
  );
}
