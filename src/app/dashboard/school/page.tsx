import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSchools } from "@/lib/api";
import type { ISchool } from "@/types/models/school";
import { ColumnDef } from "@tanstack/react-table";

function AddSchool() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add School</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add School</DialogTitle>
          <DialogDescription>Click save when you are done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter school name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Code
            </Label>
            <Input
              id="username"
              placeholder="Enter a unique school code"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const columns: ColumnDef<ISchool>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export default async function SchoolPage() {
  const { data } = await getSchools();

  return (
    <section className="container mx-auto">
      <AddSchool />
      <DataTable columns={columns} data={data} />
    </section>
  );
}
