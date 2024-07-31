export class BankAccount {

    private _bankName!: string | undefined;
    private _accountNumber!: string | undefined;

    public get bankName(): string | undefined {
        return this._bankName;
    }

    public set bankName(bankName: string | undefined) {
        this._bankName = bankName;
    }

    public get accountNumber(): string | undefined {
        return this._accountNumber;
    }

    public set accountNumber(accountNumber: string | undefined) {
        this._accountNumber = accountNumber;
    }
}
