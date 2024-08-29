import { DialogProps } from "@models/DialogProps.model";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFirestore, useUser } from "reactfire";
import moment from "moment";
import { PaymentInstrument } from "../../models/PaymentInstrument.model";
import { PaymentInstrumentService } from "../../services/PaymentInstrumentService";
import { PaymentInstrumentFormSchema } from "./PaymentInstrumentFormSchema";
import { toast } from "sonner";
import { BankAccount } from "../../models/BankAccount.model";
import { FirestoreError } from "firebase/firestore";
import { BankAccountForm } from "@pages/PaymentInstruments/BankAccountForm";
import { SaveButton } from "@/components/SaveButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@hooks/useMediaQuery";

export function PaymentInstrumentDialog({
  open,
  setOpen,
  onSave,
}: DialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);
  const db = useFirestore();
  const { data } = useUser();
  const bankAccountForm = useForm<z.infer<typeof PaymentInstrumentFormSchema>>({
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
    const paymentInstrument: PaymentInstrument = getPaymentInstrument(values);

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
    bankAccountForm.reset();
    setOpen(false);
  }

  function getPaymentInstrument(
    values: z.infer<typeof PaymentInstrumentFormSchema>
  ) {
    const paymentInstrument: PaymentInstrument = new PaymentInstrument();
    const currentMoment = moment();
    paymentInstrument.instrumentName = values.instrumentName;
    paymentInstrument.instrumentType = values.instrumentType;
    paymentInstrument.createdBy = data!.uid;
    paymentInstrument.createdDate = currentMoment.toISOString();
    paymentInstrument.updatedBy = data!.uid;
    paymentInstrument.updatedDate = currentMoment.toISOString();

    if (values.instrumentType == "Bank Account") {
      const bankAccount = new BankAccount();
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

  if (isDesktop) {
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
          <Tabs defaultValue="BankAccount">
            <TabsList className="ml-4">
              <TabsTrigger value="BankAccount">Bank Account</TabsTrigger>
              <TabsTrigger value="CreditCard">Credit Card</TabsTrigger>
            </TabsList>
            <TabsContent value="BankAccount">
              <BankAccountForm form={bankAccountForm} />
            </TabsContent>
            <TabsContent value="CreditCard">
              Change your password here.
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" className="uppercase" onClick={onClose}>
              Close
            </Button>
            <SaveButton
              onSave={bankAccountForm.handleSubmit(onSubmit)}
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
          <DrawerTitle>Payment Instrument</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="BankAccount">
          <TabsList className="ml-4">
            <TabsTrigger value="BankAccount">Bank Account</TabsTrigger>
            <TabsTrigger value="CreditCard">Credit Card</TabsTrigger>
          </TabsList>
          <TabsContent value="BankAccount">
            <BankAccountForm form={bankAccountForm} />
          </TabsContent>
          <TabsContent value="CreditCard">
            Change your password here.
          </TabsContent>
        </Tabs>
        <DrawerFooter className="pt-2">
          <SaveButton
            onSave={bankAccountForm.handleSubmit(onSubmit)}
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
