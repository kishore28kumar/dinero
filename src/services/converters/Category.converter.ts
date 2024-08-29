import { Category } from "@models/Category.model";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const CategoryConverter = {
    toFirestore: (category: Category) => { return { categoryName: category.categoryName } },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: any) => {
        const data = snapshot.data(options);
        const category: Category = {
            categoryId: snapshot.id,
            categoryName: data.categoryName
        };
        return category;
    }
};
