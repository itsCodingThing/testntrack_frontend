import { Button } from "@/components/ui/button";

export default function SchoolPage() {
  return (
    <section>
      <h1 className="text-center text-4xl mb-5">School Dashboard</h1>
      <div className="flex gap-2 justify-center">
        <Button>Add admin</Button>
        <Button>Add teacher</Button>
        <Button>Add Student</Button>
        <Button>Add Batch</Button>
      </div>
    </section>
  );
}
