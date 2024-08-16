export class Category {

    constructor(categoryId: string, categoryName: string) {
        this._categoryId = categoryId;
        this._categoryName = categoryName;
    }

    private _categoryId!: string;
    private _categoryName!: string;

    public get categoryId(): string {
        return this._categoryId;
    }

    public set categoryId(categoryId: string) {
        this._categoryId = categoryId;
    }

    public get categoryName(): string {
        return this._categoryName;
    }

    public set categoryName(categoryName: string) {
        this._categoryName = categoryName;
    }
}
