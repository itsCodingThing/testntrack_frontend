import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto grid place-item-center">
      <h1 className="text-5xl">testntrack frontend</h1>
      <Link href="/login">
        <Button>go to login page</Button>
      </Link>
    </main>
  );
}
