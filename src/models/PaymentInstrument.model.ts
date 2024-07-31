import { BankAccount } from "./BankAccount.model";

export class PaymentInstrument {

    private _paymentInstrumentId!: string;
    private _instrumentName!: string;
    private _instrumentType!: string;
    private _bankAccount!: BankAccount;
    private _createdBy!: string;
    private _createdDate!: string;
    private _updatedBy!: string;
    private _updatedDate!: string;

    public get paymentInstrumentId(): string {
        return this._paymentInstrumentId;
    }

    public set paymentInstrumentId(paymentInstrumentId: string) {
        this._paymentInstrumentId = paymentInstrumentId;
    }

    public get instrumentName(): string {
        return this._instrumentName;
    }

    public set instrumentName(instrumentName: string) {
        this._instrumentName = instrumentName;
    }

    public get instrumentType(): string {
        return this._instrumentType;
    }

    public set instrumentType(instrumentType: string) {
        this._instrumentType = instrumentType;
    }

    public get bankAccount(): BankAccount {
        return this._bankAccount;
    }

    public set bankAccount(bankAccount: BankAccount) {
        this._bankAccount = bankAccount;
    }

    public get createdBy(): string {
        return this._createdBy;
    }

    public set createdBy(createdBy: string) {
        this._createdBy = createdBy;
    }

    public get createdDate(): string {
        return this._createdDate;
    }

    public set createdDate(createdDate: string) {
        this._createdDate = createdDate;
    }

    public get updatedBy(): string {
        return this._updatedBy;
    }

    public set updatedBy(updatedBy: string) {
        this._updatedBy = updatedBy;
    }

    public get updatedDate(): string {
        return this._updatedDate;
    }

    public set updatedDate(updatedDate: string) {
        this._updatedDate = updatedDate;
    }
}
