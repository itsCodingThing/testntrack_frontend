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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fileOpen } from "browser-fs-access";

const adminFormSchema = z.object({
  name: z.string().min(1, "Please enter name"),
  image: z.string().optional(),
});

export default function AddBatch() {
  const { toast } = useToast();
  const [toggleForm, setToggleForm] = useState(false);
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      image: "Select Image",
    },
  });

  function onSubmit(values: z.output<typeof adminFormSchema>) {
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
        <Button variant="outline">Add Batch</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Batch</DialogTitle>
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
              name="image"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Upload Image*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-3 cursor-pointer"
                        placeholder="select file"
                        type="button"
                        value={
                          form.getValues("image") ??
                          form.formState.defaultValues?.image
                        }
                        onClick={() => {
                          fileOpen({
                            mimeTypes: ["image/*"],
                          }).then((blob) => {
                            console.log(blob);
                            form.setValue("image", blob.name);
                          });
                        }}
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
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Batch Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-3"
                        placeholder="Enter batch name"
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
