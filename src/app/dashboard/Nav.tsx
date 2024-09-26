import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <div className="grid grid-rows-2 gap-2 py-4">
      <Button variant="default">Admin</Button>
      <Button variant="default">School</Button>
    </div>
  );
}
