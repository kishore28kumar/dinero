import { z } from "zod";

export const CategoryFormSchema = z.object({
    categoryName: z
        .string({
            required_error: "Category Name is required.",
        })
        .min(3, {
            message: "Category Name must be at least 3 characters.",
        })
        .max(100, {
            message: "Instrument Name cannot not be longer than 100 characters.",
        })
});
