import { QueryDocumentSnapshot, serverTimestamp } from "firebase/firestore";
import { PaymentInstrument } from "../../models/PaymentInstrument.model";
import { BankAccount } from "../../models/BankAccount.model";

// Firestore data converter
export const PaymentInstrumentConverter = {
    toFirestore: (paymentInstrument: PaymentInstrument) => {
        if (paymentInstrument.instrumentType === "Bank Account") {
            return {
                instrumentName: paymentInstrument.instrumentName,
                instrumentType: paymentInstrument.instrumentType,
                createdBy: paymentInstrument.createdBy,
                createdDate: paymentInstrument.createdDate,
                updatedBy: paymentInstrument.updatedBy,
                updatedDate: serverTimestamp(),
                bankAccount: {
                    bankName: paymentInstrument.bankAccount.bankName,
                    accountNumber: paymentInstrument.bankAccount.accountNumber
                }
            };
        } else {
            return {
                instrumentName: paymentInstrument.instrumentName,
                instrumentType: paymentInstrument.instrumentType,
                createdBy: paymentInstrument.createdBy,
                createdDate: paymentInstrument.createdDate,
                updatedBy: paymentInstrument.updatedBy,
                updatedDate: serverTimestamp(),
                creditCard: {}
            };
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => {
        const data = snapshot.data(options);
        let paymentInstrument = new PaymentInstrument();
        paymentInstrument.paymentInstrumentId = snapshot.id;
        paymentInstrument.instrumentName = data.instrumentName;
        paymentInstrument.instrumentType = data.instrumentType;
        paymentInstrument.createdBy = data.createdBy;
        paymentInstrument.createdDate = data.createdDate;
        paymentInstrument.updatedBy = data.updatedBy;
        paymentInstrument.updatedDate = data.updatedDate;
        if (paymentInstrument.instrumentType === "Bank Account") {
            let bankAccount = new BankAccount();
            bankAccount.bankName = data.bankAccount.bankName;
            bankAccount.accountNumber = data.bankAccount.accountNumber;
            paymentInstrument.bankAccount = bankAccount;
        }
        return paymentInstrument;
    }
};
