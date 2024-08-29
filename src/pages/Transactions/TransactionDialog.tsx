import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TransactionDate } from "./TransactionDate";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IndianRupee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDoc, collection } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import {
  Transaction,
  TransactionConverter,
} from "../../models/Transaction.model";
import { DialogProps } from "../../models/DialogProps.model";
import { TransactionFormSchema } from "./TransactionFormSchema";
import { CategoryCombobox } from "@pages/Transactions/CategoryCombobox";

export function TransactionDialog({ open, setOpen, onSave }: DialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useFirestore();
  const { data } = useUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      transactionDate: new Date(),
      description: "",
      accountingEntryType: "Credit",
      transactionAmount: 0,
      accountType: "Expense",
      category: { categoryId: "", categoryName: "" },
      paymentInstrument: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof TransactionFormSchema>) {
    console.log(JSON.stringify(values, null, 2));
    const transaction: Transaction = new Transaction(
      "",
      data!.uid,
      values.transactionDate.toISOString(),
      values.description,
      values.accountingEntryType,
      values.transactionAmount,
      values.accountType,
      values.category,
      values.paymentInstrument
    );
    const transactionCollection = collection(db, "transaction").withConverter(
      TransactionConverter
    );
    addDoc(transactionCollection, transaction).then(() => {
      onClose();
      onSave(transaction);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={onPointerDownOutside}
        onEscapeKeyDown={onEscapeKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>
            Create / Update your transaction here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Transaction Date</FormLabel>
                      <TransactionDate field={field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="Description" {...field} /> */}
                        <Textarea
                          placeholder="Tell us a little bit about the transaction"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="accountingEntryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accounting Entry Type</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="justify-start"
                        >
                          <ToggleGroupItem
                            value="Credit"
                            aria-label="Toggle Credit"
                          >
                            Credit
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="Debit"
                            aria-label="Toggle Debit"
                          >
                            Debit
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="transactionAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <IndianRupee className="mr-2" />
                          <Input
                            placeholder="Transaction Amount"
                            {...field}
                            className="text-right"
                            autoComplete="off"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      {/* <Input placeholder="Account Type" {...field} /> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Account Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Asset">Asset</SelectItem>
                          <SelectItem value="Income">Income</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                          <SelectItem value="Liability">Liability</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        {/* <Input placeholder="Category" {...field} /> */}
                        <CategoryCombobox form={form} value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="paymentInstrument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Instrument</FormLabel>
                      <FormControl>
                        <Input placeholder="Payment Instrument" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button variant="outline" className="uppercase" onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            className="uppercase font-bold"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Saving</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
