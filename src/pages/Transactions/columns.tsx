"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../../models/Transaction.model";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionDate",
    header: "Date",
  },
  {
    accessorKey: "transactionMonth",
    header: "Month",
  },
  {
    accessorKey: "transactionYear",
    header: "Year",
  },
  {
    accessorKey: "transactionWeek",
    header: "Week",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "creditOrDebit",
    header: "Credit/Debit",
  },
  {
    accessorKey: "transactionAmount",
    header: "Transaction Amount",
  },
  {
    accessorKey: "signedAmount",
    header: "Signed Amount",
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
  },
  {
    accessorKey: "instrument",
    header: "Instrument",
  },
];
