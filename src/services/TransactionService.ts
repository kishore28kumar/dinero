import { addDoc, collection, doc, Firestore, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { Transaction, TransactionConverter } from "../models/Transaction.model";

export class TransactionService {

    private constructor() { }

    public static INSTANCE = new TransactionService();

    // Eg: TransactionService.INSTANCE.createTransaction(db,new Transaction("",authInstance.currentUser!.uid,"2024-07-28","2024, 07, July","2024","2024 - 27","Test2","Credit",10,-10,"Expense","Misc","ICICI (519444)")).then(tran=>console.log(tran));
    async createTransaction(db: Firestore, transaction: Transaction) {
        // Add a new document with a generated id.
        const newTransaction = await addDoc(collection(db, "transaction").withConverter(TransactionConverter), transaction);
        return newTransaction;
    }

    async updateTransaction(db: Firestore, transaction: Transaction) {
        const transactionRef = doc(db, "transaction", transaction.transactionId).withConverter(TransactionConverter);
        await setDoc(transactionRef, transaction, { merge: true });
        return transactionRef;
    }

    async getAllTransactions(db: Firestore, userUid: string) {
        let transactions: Transaction[] = [];
        const q = query(
            collection(db, "transaction").withConverter(
                TransactionConverter
            ),
            where("createdBy", "==", userUid),
            orderBy("createdDate")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((transaction) => {
            transactions.push(transaction.data() as Transaction);
        });
        return transactions;
    }
}
