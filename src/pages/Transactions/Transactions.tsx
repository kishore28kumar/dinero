import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TransactionDialog } from "./TransactionDialog";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { Transaction } from "@models/Transaction.model";
import { useFirestore, useUser } from "reactfire";
import { TransactionService } from "@services/TransactionService";
import { toast } from "sonner";

export function Transactions() {
  // Hooks
  let emptyData: Transaction[] = [];
  const [transactions, setData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const db = useFirestore();
  const { status, data } = useUser();
  useEffect(() => {
    if (status === "success") {
      getAllTransactions();
    }

    return () => {
      emptyData = [];
    };
  }, [status]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  function getAllTransactions() {
    TransactionService.INSTANCE.getAllTransactions(db, data!.uid).then(
      (transactions) => {
        setData(transactions);
        setIsLoading(false);
      }
    );
  }

  function onSave() {
    getAllTransactions();
    toast.success("Transaction has been created.");
  }

  function openTransactionDialog() {
    setIsTransactionDialogOpen(true);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-5xl">Transactions</h1>
        <Button
          className="p-2 h-8 mt-2 font-bold"
          onClick={openTransactionDialog}
        >
          <Plus />
        </Button>
        <TransactionDialog
          open={isTransactionDialogOpen}
          setOpen={setIsTransactionDialogOpen}
          onSave={onSave}
        />
      </div>
      <div className="py-5">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <DataTable columns={columns} data={transactions} />
        )}
      </div>
    </main>
  );
}
