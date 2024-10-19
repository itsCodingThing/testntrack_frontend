"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createAdmin } from "@/lib/backend-apis/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlusIcon } from "lucide-react";

const adminFormSchema = z.object({
  email: z.string().email("Please enter email"),
  name: z.string().min(1, "Please enter name"),
  contact: z.string().length(10, "Please enter contact"),
  password: z.string().min(2, "Please enter password minimum length of 2"),
});

export default function AddAdmin() {
  const { toast } = useToast();
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      password: "",
    },
  });

  function onSubmit(values: z.output<typeof adminFormSchema>) {
    createAdmin(values).then((res) => {
      if (!res.status) {
        toast({ variant: "destructive", title: res.message });
      } else {
        setToggleForm(!toggleForm);
      }
    });
  }

  return (
    <Dialog open={toggleForm} onOpenChange={setToggleForm}>
      <DialogTrigger asChild>
        <Card className="w-[200px] h-[200px] cursor-pointer">
          <CardHeader className="text-center">
            <CardTitle>Add admin</CardTitle>
            <CardDescription>
              create admin <br /> or
              <br /> drag a file
            </CardDescription>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <CirclePlusIcon />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
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
                        placeholder="Enter your name"
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
                        placeholder="Enter email"
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
                        placeholder="Enter Password"
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
                        placeholder="Enter Contact"
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
