import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { fileOpen } from "browser-fs-access";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const teacherFormSchema = z.object({
  email: z.string().email("Please enter email"),
  name: z.string().min(1, "Please enter name"),
  contact: z.string().length(10, "Please enter contact"),
});

export default function AddTeacher() {
  const { toast } = useToast();
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
    },
  });

  function onSubmit(values: z.output<typeof teacherFormSchema>) {
    console.log(values);
    form.reset();
    toast({ title: "school admin created" });
    setToggleForm(!toggleForm);
  }

  function onOpenChange(open: boolean) {
    form.reset();
    setToggleForm(open);
  }

  return (
    <Dialog open={toggleForm} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Teacher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Teacher</DialogTitle>
          <DialogDescription>Click save when you are done.</DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => {
            fileOpen().then((blob) => {
              console.log(blob);
            });
          }}
        >
          Upload file
        </Button>
        <p className="text-sm">*you can upload upto 50 users</p>
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
                        {...field}
                        className="col-span-3"
                        placeholder="Enter name"
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
