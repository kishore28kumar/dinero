import { Category } from "@models/Category.model";
import { CategoryConverter } from "@services/converters/Category.converter";
import { FirebaseError } from "firebase/app";
import { Firestore, collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getAllCategories(db: Firestore) {
    const promise = new Promise<Category[]>((resolve, reject) => {
        let categories: Category[] = [];
        const q = query(
            collection(db, "category").withConverter(
                CategoryConverter
            ),
            orderBy("instrumentName")
        );
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((category) => {
                categories.push(category.data() as Category);
            });
            resolve(categories);
        }).catch((error: FirebaseError) => {
            reject(error);
        });
    });
    return promise;
}