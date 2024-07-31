import { z } from "zod";

export const PaymentInstrumentFormSchema = z.object({
    instrumentName: z
        .string({
            required_error: "Instrument Name is required.",
        })
        .min(4, {
            message: "Instrument Name be at least 4 characters.",
        })
        .max(100, {
            message: "Instrument Name must not be longer than 100 characters.",
        }),
    instrumentType: z
        .string({
            required_error: "Instrument Type is required.",
        })
        .min(1, {
            message: "Instrument Type is required.",
        }),
    bankName: z
        .string({
            required_error: "Bank Name is required.",
        })
        .min(3, {
            message: "Bank Name be at least 3 characters.",
        })
        .max(20, {
            message: "Bank Name must not be longer than 20 characters.",
        }).optional(),
    accountNumber: z
        .string({
            required_error: "Account Number is required.",
        })
        .min(12, {
            message: "Account Number be at least 12 characters.",
        })
        .max(12, {
            message: "Account Number must not be longer than 12 characters.",
        }).optional(),
});
