import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SaveButton } from "@/components/SaveButton";
import { DialogProps } from "@models/DialogProps.model";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategoryForm } from "@pages/Categories/CategoryForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from "@pages/Categories/CategoryFormSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "@models/Category.model";
import { createCategory } from "@services/CategoryService";
import { toast } from "sonner";
import { useFirestore } from "reactfire";
import { useMediaQuery } from "@hooks/useMediaQuery";

export function CategoryDialog({ open, setOpen, onSave }: DialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const db = useFirestore();
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  function onSubmit(values: z.infer<typeof CategoryFormSchema>) {
    // TODO: Validate if already exists
    setIsLoading(true);
    const category: Category = {
      categoryId: "",
      categoryName: values.categoryName,
    };
    // const category: Category = new Category("", values.categoryName);
    createCategory(db, category)
      .then(() => {
        onClose();
        onSave(category);
      })
      .catch(() => {
        toast.error("Unable to create the category");
        setIsLoading(false);
      });
  }

  function onClose() {
    setIsLoading(false);
    form.reset();
    setOpen(false);
  }

  function onPointerDownOutside(event: Event) {
    event.preventDefault();
  }

  function onEscapeKeyDown(event: Event) {
    event.preventDefault();
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={onPointerDownOutside}
          onEscapeKeyDown={onEscapeKeyDown}
        >
          <DialogHeader>
            <DialogTitle>Category</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CategoryForm form={form} />
          <DialogFooter>
            <Button variant="outline" className="uppercase" onClick={onClose}>
              Close
            </Button>
            <SaveButton
              onSave={form.handleSubmit(onSubmit)}
              isLoading={isLoading}
            ></SaveButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="">
        <DrawerHeader className="text-left">
          <DrawerTitle>Category</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <CategoryForm form={form} />
        <DrawerFooter className="pt-2">
          <SaveButton
            onSave={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
          ></SaveButton>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
