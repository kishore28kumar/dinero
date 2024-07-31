import moment from "moment";

export class Transaction {
    constructor(transactionId: string, userUid: string, transactionDate: string, description: string, accountingEntryType: string, 
        transactionAmount: number, accountType: string, category: string, paymentInstrument: string
    ) {
        this.transactionId = transactionId;
        this.userUid = userUid;
        this.transactionDate = transactionDate;
        this.transactionMonth = moment(transactionDate).format("YYYY, MM, MMMM");
        this.transactionYear = moment(transactionDate).format("YYYY");
        this.transactionWeek = moment(transactionDate).format("YYYY - WW");
        this.description = description;
        this.accountingEntryType = accountingEntryType;
        this.transactionAmount = transactionAmount;
        this.signedAmount = accountingEntryType === 'Credit' ? transactionAmount * -1 : transactionAmount;
        this.accountType = accountType;
        this.category = category;
        this.paymentInstrument = paymentInstrument;
        this.createdBy = userUid;
        this.createdDate = moment().toISOString();
        this.updatedBy = userUid;
        this.updatedDate = moment().toISOString();
    }

    transactionId: string;
    userUid: string;
    transactionDate: string;
    transactionMonth: string;
    transactionYear: string;
    transactionWeek: string;
    description: string;
    accountingEntryType: string;
    transactionAmount: number;
    signedAmount: number;
    accountType: string;
    category: string;
    paymentInstrument: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;

    toString() {
        return this.transactionDate + ', ' + this.description + ', ' + this.signedAmount;
    }
}

// Firestore data converter
export const TransactionConverter = {
    toFirestore: (transaction: Transaction) => {
        return {
            // id: transaction.transactionId,
            userUid: transaction.userUid,
            transactionDate: transaction.transactionDate,
            transactionMonth: transaction.transactionMonth,
            transactionYear: transaction.transactionYear,
            transactionWeek: transaction.transactionWeek,
            description: transaction.description,
            accountingEntryType: transaction.accountingEntryType,
            transactionAmount: transaction.transactionAmount,
            signedAmount: transaction.signedAmount,
            accountType: transaction.accountType,
            category: transaction.category,
            paymentInstrument: transaction.paymentInstrument,
            createdBy: transaction.createdBy,
            createdDate: transaction.createdDate,
            updatedBy: transaction.updatedBy,
            updatedDate: transaction.updatedDate,
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        // FIXME: Fix error
        return new Transaction(data.id, data.userUid, data.transactionDate, data.transactionMonth, data.transactionYear, data.transactionWeek, 
            data.description, data.creditOrDebit, data.transactionAmount, data.signedAmount, data.accountType, data.transactionType, data.instrument
        );
    }
};