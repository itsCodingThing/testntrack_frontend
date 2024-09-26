"use client";

import { Stack } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SIDES = {
  top: "top",
  left: "left",
  right: "right",
  bottom: "bottom",
} as const;

interface IMobileSidebar {
  children: React.ReactNode;
  side?: (typeof SIDES)[keyof typeof SIDES];
  className?: string;
}

export default function MobileSidebar({
  side = "left",
  className,
  children,
}: IMobileSidebar) {
  return (
    <div className={clsx("grid grid-cols-2 gap-2", className)}>
      <Sheet key={side}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Stack className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>TestnTrack</SheetTitle>
            <SheetDescription>Access different features</SheetDescription>
          </SheetHeader>
          <SheetClose asChild>{children}</SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
