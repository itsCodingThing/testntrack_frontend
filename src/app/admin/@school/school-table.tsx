"use client";

import DataTable from "@/components/data-table";
import type { ISchool } from "@/types/models/school";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddSchool from "./add-school";
import { More } from "@/components/icons";
import { removeSchool } from "@/lib/api";
import clsx from "clsx";

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
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <p
          className={clsx(
            status === "pending"
              ? "text-yellow-500"
              : status === "active"
                ? "text-green-500"
                : "text-red-500",
          )}
        >
          {row.original.status}
        </p>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const data = row.original;

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
            <DropdownMenuItem>View Dashboard</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-red-500"
              onClick={() => {
                removeSchool(data.id.toString()).then((res) => {
                  console.log(res);
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function SchoolTable({ data }: { data: ISchool[] }) {
  return (
    <DataTable columns={columns} data={data}>
      <AddSchool />
    </DataTable>
  );
}
