import { z } from "zod";

export const TransactionFormSchema = z.object({
  transactionDate: z.date({
    required_error: "Transaction Date is required.",
  }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters.",
    })
    .max(100, {
      message: "Description must not be longer than 100 characters.",
    }),
  accountingEntryType: z.string({
    required_error: "Accounting Entry Type is required.",
  }),
  transactionAmount: z.coerce
    .number({
      required_error: "Transaction Amount is required",
      invalid_type_error: "Transaction Amount must be a number",
    })
    .int()
    .positive()
    .min(1, { message: "Transaction Amount should be at least 1" }),
  accountType: z.string({
    required_error: "Account Type is required.",
  }),
  category: z
    .string({
      required_error: "Category is required.",
    })
    .min(1, {
      message: "Category is required.",
    }),
  paymentInstrument: z
    .string({
      required_error: "Payment Instrument is required.",
    })
    .min(1, {
      message: "Payment Instrument is required.",
    }),
});
