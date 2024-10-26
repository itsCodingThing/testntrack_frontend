import { CheckIcon, ChevronsUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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

export default function FilterMenu({
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
