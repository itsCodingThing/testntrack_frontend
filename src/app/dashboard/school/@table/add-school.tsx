"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createSchool } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schoolFormSchema = z.object({
  name: z.string().min(1, "Please enter name"),
  email: z.string().email("Please enter valid email"),
  code: z.string().min(1, "Please enter valid code"),
  contact: z.string().length(10, "Please enter valid contact"),
});

export default function AddSchool() {
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm<z.infer<typeof schoolFormSchema>>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      code: "",
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
    <Dialog open={toggleForm} onOpenChange={setToggleForm}>
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
