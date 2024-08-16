import { Category } from "@models/Category.model";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const CategoryConverter = {
    toFirestore: (category: Category) => { return { categoryName: category.categoryName } },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => {
        const data = snapshot.data(options);
        return new Category(snapshot.id, data.categoryName);
    }
};
