"use client";

import { CheckIcon, ChevronsUpDownIcon, MoreIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { removeAdmin } from "@/lib/backend-apis/admin";
import { cn, formatDate } from "@/lib/utils";
import type { Admin } from "@/types/models/admin";
import { EventFor } from "@/types/util-types";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const cols = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "contact",
    label: "Contact",
  },
];

function FilterMenu({
  onColNameChange,
}: {
  onColNameChange: (col: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [col, setCol] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {col
            ? cols.find((colName) => colName.value === col)?.label
            : "filter by..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No col name found.</CommandEmpty>
            <CommandGroup>
              {cols.map((colName) => (
                <CommandItem
                  key={colName.value}
                  value={colName.value}
                  onSelect={(currentValue) => {
                    setCol(currentValue === col ? "" : currentValue);
                    setOpen(false);
                    onColNameChange(currentValue);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      col === colName.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {colName.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function AdminTableDropdown({ id }: { id: number }) {
  const { toast } = useToast();

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              removeAdmin(id.toString()).then((res) => {
                if (res.status) {
                  toast({
                    variant: "default",
                    title: "Admin deleted successfully",
                  });
                } else {
                  toast({
                    variant: "destructive",
                    title: "Failed to delete admin",
                  });
                }
              });
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<Admin>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return <p className="text-yellow-500">{status}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return <p>{formatDate(row.original.created_at, "dd/MM/yyyy")}</p>;
    },
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

export default function AdminTable({ data }: { data: Admin[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                            header.getContext()
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
                        cell.getContext()
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
      <div className="mt-1 flex justify-end gap-1">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Select
          onValueChange={(v) => {
            table.setPageSize(Number(v));
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
