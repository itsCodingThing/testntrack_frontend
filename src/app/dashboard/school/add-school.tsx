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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSchool } from "./actions";

export default function AddSchool() {
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
        <form action={createSchool} className="grid grid-cols-4 gap-4 py-4">
          <div className="col-span-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter school name"
              className="col-span-3"
            />
          </div>
          <div className="col-span-4">
            <Label htmlFor="code" className="text-right">
              Code
            </Label>
            <Input
              id="code"
              name="code"
              placeholder="Enter a unique school code"
              className="col-span-3"
            />
          </div>
          <div className="col-span-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter school email"
              className="col-span-3"
            />
          </div>
          <div className="col-span-4">
            <Label htmlFor="contact" className="text-right">
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              placeholder="Enter school contact"
              className="col-span-3"
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
