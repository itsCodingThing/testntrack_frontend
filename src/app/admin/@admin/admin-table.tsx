"use client";

import { More, Trash } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { removeAdmin } from "@/lib/api";
import type { IAdmin } from "@/types/models/admin";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import AddAdmin from "./add-admin";
import {
  ColumnFiltersState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EventFor } from "@/types/util-types";
import { Input } from "@/components/ui/input";
import FilterMenu from "./filter-menu";

function DeleteAdminDialog({
  adminId,
  openDialog,
}: {
  adminId: string;
  openDialog: boolean;
}) {
  const [open, setOpen] = useState(openDialog);
  const { toast } = useToast();

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Admin</DialogTitle>
          <DialogDescription>Are you sure !!!</DialogDescription>
        </DialogHeader>
        <DialogTrigger asChild>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              removeAdmin(adminId).then((res) => {
                if (res.status) {
                  toast({
                    variant: "default",
                    title: "Admin deleted successfully",
                  });
                } else {
                  toast({
                    variant: "default",
                    title: "Failed to delete admin",
                  });
                }
              });
            }}
          >
            <span className="sr-only">Delete</span>
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}

function AdminTableDropdown({ id }: { id: number }) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-full">
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
          <DropdownMenuItem
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAdminDialog openDialog={openDialog} adminId={id.toString()} />
    </div>
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
      const { id } = row.original;
      return <AdminTableDropdown id={id} />;
    },
  },
];

export default function AdminTable({ data }: { data: IAdmin[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
  });
  const [filterBy, setFilterBy] = useState("name");

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1">
        <Input
          placeholder="Filter admins by name..."
          value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
          onChange={(event: EventFor<"input", "onChange">) =>
            table.getColumn(filterBy)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <FilterMenu onColNameChange={(col) => setFilterBy(col)} />
        <AddAdmin />
      </div>
      <div className="rounded-md border mt-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
