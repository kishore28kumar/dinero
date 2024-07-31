import { addDoc, collection, Firestore, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { PaymentInstrument } from "../models/PaymentInstrument.model";
import { FirebaseError } from "firebase/app";
import { PaymentInstrumentConverter } from "./converters/PaymentInstrumentConverter";

export class PaymentInstrumentService {

    private constructor() { }

    public static INSTANCE = new PaymentInstrumentService();

    async getAllPaymentInstruments(db: Firestore, userUid: string) {
        const promise = new Promise<PaymentInstrument[]>((resolve, reject) => {
            // Asynchronous code here
            let paymentInstruments: PaymentInstrument[] = [];
            const q = query(
                collection(db, "paymentInstrument").withConverter(
                    PaymentInstrumentConverter
                ),
                where("createdBy", "==", userUid),
                orderBy("instrumentName")
            );
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((paymentInstrument) => {
                    paymentInstruments.push(paymentInstrument.data() as PaymentInstrument);
                });
                resolve(paymentInstruments);
            }).catch((error: FirebaseError) => {
                reject(error);
            });
        });
        return promise;
    }

    async createPaymentInstrument(db: Firestore, paymentInstrument: PaymentInstrument) {
        const newPaymentInstrument = await addDoc(collection(db, "paymentInstrument").withConverter(PaymentInstrumentConverter), paymentInstrument);
        return newPaymentInstrument;
    }
}