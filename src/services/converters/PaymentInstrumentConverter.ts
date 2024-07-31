import { QueryDocumentSnapshot, serverTimestamp } from "firebase/firestore";
import { PaymentInstrument } from "../../models/PaymentInstrument.model";

// Firestore data converter
export const PaymentInstrumentConverter = {
    toFirestore: (paymentInstrument: PaymentInstrument) => {
        return {
            instrumentName: paymentInstrument.instrumentName,
            instrumentType: paymentInstrument.instrumentType,
            createdBy: paymentInstrument.createdBy,
            createdDate: paymentInstrument.createdDate,
            updatedBy: paymentInstrument.updatedBy,
            updatedDate: serverTimestamp(),
            // bankAccount: paymentInstrument.bankAccount
        };
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
        return paymentInstrument;
    }
};
