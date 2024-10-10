"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeSchool, createSchool } from "@/lib/backend-apis/school";
import type { ISchool } from "@/types/models/school";
import clsx from "clsx";
import { EventFor } from "@/types/util-types";
import { Input } from "@/components/ui/input";
import { MoreIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schoolFormSchema = z.object({
  name: z.string().min(1, "Please enter name"),
  email: z.string().email("Please enter valid email"),
  code: z.string().min(1, "Please enter valid code"),
  contact: z.string().length(10, "Please enter valid contact"),
  password: z.string().min(8, "Password must be atleast 8 charactor long"),
});

function AddSchool() {
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm<z.infer<typeof schoolFormSchema>>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      code: "",
      password: "",
    },
  });

  function onSubmit(values: z.output<typeof schoolFormSchema>) {
    createSchool(values).then((res) => {
      if (!res.status) {
        toast({ variant: "destructive", title: res.message });
      } else {
        setToggleForm(false);
      }
    });
  }

  return (
    <Dialog
      open={toggleForm}
      onOpenChange={(open) => {
        form.reset();
        setToggleForm(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add School</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add School</DialogTitle>
          <DialogDescription>Click save when you are done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-4 gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder="Enter your school name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder="Enter school email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="code"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Code</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder="Enter school unique school code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="contact"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Contact</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        placeholder="Enter school contact"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
function SchoolTableDropDown({ id }: { id: string }) {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>View Dashboard</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:bg-red-500"
          onClick={() => {
            removeSchool(id).then((res) => {
              if (!res.status) {
                console.log(res.message);
              } else {
                toast({
                  variant: "destructive",
                  title: "Unable to delete school",
                });
              }
            });
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <p
          className={clsx(
            status === "pending"
              ? "text-yellow-500"
              : status === "active"
                ? "text-green-500"
                : "text-red-500"
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

      return <SchoolTableDropDown id={data.id.toString()} />;
    },
  },
];

export default function SchoolTable({ data }: { data: ISchool[] }) {
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

  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          placeholder="Filter school names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: EventFor<"input", "onChange">) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AddSchool />
        <div className="flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Select
            onValueChange={(v) => {
              console.log(v);
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
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="rounded-md border mt-5">
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
    </>
  );
}
