import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { Plus, Landmark, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { PaymentInstrumentDialog } from "./PaymentInstrumentDialog";
import { PaymentInstrument } from "../../models/PaymentInstrument.model";
import { useFirestore, useUser } from "reactfire";
import { PaymentInstrumentService } from "../../services/PaymentInstrumentService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PaymentInstruments() {
  // Hooks
  let emptyData: PaymentInstrument[] = [];
  const [paymentInstruments, setData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentInstrumentDialogOpen, setIsPaymentInstrumentDialogOpen] =
    useState(false);
  const db = useFirestore();
  const { status, data } = useUser();
  useEffect(() => {
    if (status === "success") {
      getAllPaymentInstruments();
    }

    return () => {
      emptyData = [];
    };
  }, [status]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  function getAllPaymentInstruments() {
    PaymentInstrumentService.INSTANCE.getAllPaymentInstruments(db, data!.uid)
      .then((paymentInstruments) => {
        setData(paymentInstruments);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Unable to fetch the Payment Instruments.");
        setIsLoading(false);
      });
  }

  function onSave(paymentInstrument: PaymentInstrument) {
    getAllPaymentInstruments();
    toast.success(
      "Payment Instrument " +
        paymentInstrument.instrumentName +
        " has been created."
    );
  }

  function openPaymentInstrumentialog() {
    setIsPaymentInstrumentDialogOpen(true);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-5xl">Payment Instruments</h1>
        <Button
          className="p-2 h-8 mt-2 font-bold"
          onClick={openPaymentInstrumentialog}
        >
          <Plus />
        </Button>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <PaymentInstrumentDialog
            open={isPaymentInstrumentDialogOpen}
            setOpen={setIsPaymentInstrumentDialogOpen}
            onSave={onSave}
          />
        </ErrorBoundary>
      </div>
      <div className="py-5 grid gap-5">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          paymentInstruments.map((paymentInstrument) => {
            if (paymentInstrument.instrumentType == "Bank Account") {
              return (
                <Card
                  className="w-96"
                  key={paymentInstrument.paymentInstrumentId}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>{paymentInstrument.instrumentName}</CardTitle>
                    <div className="flex-1"></div>
                    <Landmark />
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Bank Name</p>
                    <p>Account Number</p>
                  </CardContent>
                  <CardFooter>
                    <Button>View Balance</Button>
                    <Button variant="outline" className="ml-5">
                      View Statement
                    </Button>
                  </CardFooter>
                </Card>
              );
            } else if (paymentInstrument.instrumentType == "Credit Card") {
              return (
                <Card
                  className="w-96"
                  key={paymentInstrument.paymentInstrumentId}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>{paymentInstrument.instrumentName}</CardTitle>
                    <div className="flex-1"></div>
                    <CreditCard />
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>XXXX XXXX XXXX 8000</p>
                    <p>01/25</p>
                    <Progress value={33} className="mt-10" />
                  </CardContent>
                  <CardFooter>
                    <Button>View Outstanding</Button>
                  </CardFooter>
                </Card>
              );
            }
          })
        )}
      </div>
    </main>
  );
}
