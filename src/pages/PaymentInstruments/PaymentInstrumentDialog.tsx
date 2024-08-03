import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";
import { DialogProps } from "../../models/DialogProps.model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFirestore, useUser } from "reactfire";
import moment from "moment";
import { PaymentInstrument } from "../../models/PaymentInstrument.model";
import { PaymentInstrumentService } from "../../services/PaymentInstrumentService";
import { PaymentInstrumentFormSchema } from "./PaymentInstrumentFormSchema";
import { toast } from "sonner";
import { BankAccount } from "../../models/BankAccount.model";
import { FirestoreError } from "firebase/firestore";

export function PaymentInstrumentDialog({
  open,
  setOpen,
  onSave,
}: DialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useFirestore();
  const { data } = useUser();
  const form = useForm<z.infer<typeof PaymentInstrumentFormSchema>>({
    resolver: zodResolver(PaymentInstrumentFormSchema),
    defaultValues: {
      instrumentName: "",
      instrumentType: "Bank Account",
      bankName: "",
      accountNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof PaymentInstrumentFormSchema>) {
    setIsLoading(true);
    let paymentInstrument: PaymentInstrument = getPaymentInstrument(values);

    // TODO: Validate if already exists

    PaymentInstrumentService.INSTANCE.createPaymentInstrument(
      db,
      paymentInstrument
    )
      .then(() => {
        onClose();
        onSave(paymentInstrument);
      })
      .catch((error: FirestoreError) => {
        toast.error("Unable to create the Payment Instrument");
        console.error(error);
        setIsLoading(false);
      });
  }

  function onClose() {
    setIsLoading(false);
    form.reset();
    setOpen(false);
  }

  function getPaymentInstrument(
    values: z.infer<typeof PaymentInstrumentFormSchema>
  ) {
    let paymentInstrument: PaymentInstrument = new PaymentInstrument();
    let currentMoment = moment();
    paymentInstrument.instrumentName = values.instrumentName;
    paymentInstrument.instrumentType = values.instrumentType;
    paymentInstrument.createdBy = data!.uid;
    paymentInstrument.createdDate = currentMoment.toISOString();
    paymentInstrument.updatedBy = data!.uid;
    paymentInstrument.updatedDate = currentMoment.toISOString();

    if (values.instrumentType == "Bank Account") {
      let bankAccount = new BankAccount();
      bankAccount.bankName = values.bankName;
      bankAccount.accountNumber = values.accountNumber;
      paymentInstrument.bankAccount = bankAccount;
    }
    return paymentInstrument;
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
          <DialogTitle>Payment Instrument</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="instrumentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrument Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Instrument Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="instrumentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instrument Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an Instrument Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bank Account">
                            Bank Account
                          </SelectItem>
                          <SelectItem value="Credit Card">
                            Credit Card
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.getValues("instrumentType") == "Bank Account" ? (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Bank Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Account Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
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
                {/* <span>Please wait</span> */}
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
