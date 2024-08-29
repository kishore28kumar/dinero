"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFirestore, useUser } from "reactfire";
import { getAllCategories } from "@services/CategoryService";
import { Category } from "@models/Category.model";
import { UseFormReturn } from "react-hook-form";
import { Transaction } from "@models/Transaction.model";

type CategoryComboboxProps = {
  form: UseFormReturn<
    {
      transactionDate: Date;
      description: string;
      accountingEntryType: string;
      transactionAmount: number;
      accountType: string;
      category: Category;
      paymentInstrument: string;
    },
    Transaction,
    undefined
  >;
  value: Category;
};

export function CategoryCombobox({ form, value }: CategoryComboboxProps) {
  // Hooks
  let emptyData: Category[] = [];
  const [categories, setData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const db = useFirestore();
  const { status } = useUser();
  useEffect(() => {
    if (status === "success") {
      getAllCategories(db).then((categories) => {
        setData(categories);
        setIsLoading(false);
      });
    }

    return () => {
      emptyData = [];
    };
  }, [status]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-full justify-between"
        >
          {value.categoryId
            ? categories.find(
                (category) => category.categoryId === value.categoryId
              )?.categoryName
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 flex w-full">
        <Command>
          <CommandInput placeholder="Search Category..." />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.categoryId}
                  value={category.categoryName}
                  onSelect={() => {
                    form.setValue("category", category);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.categoryId === category.categoryId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.categoryName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
