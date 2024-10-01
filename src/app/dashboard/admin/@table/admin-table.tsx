"use client";

import DataTable from "@/components/data-table";
import { Copy, More } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeAdmin } from "@/lib/api";
import type { IAdmin } from "@/types/models/admin";
import { ColumnDef } from "@tanstack/react-table";
import AddAdmin from "./add-admin";

function DeleteSchoolDialog({ schoolId }: { schoolId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
        </DialogHeader>
        <Button
          type="submit"
          size="sm"
          className="px-3"
          onClick={() => {
            removeAdmin(schoolId).then((res) => {
              console.log(res);
            });
          }}
        >
          <span className="sr-only">Copy</span>
          <Copy className="h-4 w-4" />
        </Button>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const columns: ColumnDef<IAdmin>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <More className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteSchoolDialog schoolId={row.original.id.toString()} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AdminTable({ data }: { data: IAdmin[] }) {
  return (
    <DataTable columns={columns} data={data}>
      <AddAdmin />
    </DataTable>
  );
}
