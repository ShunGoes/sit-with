"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatAppDate } from "@/lib/utils";
import { Payment } from "@/lib/api/services/payments/payments.services";

const statusVariantAssigner = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "destructive";
    case "refunded":
      return "default";
    default:
      return "hibiscus";
  }
};

export const PaymentsColumn = (currency: string = "NGN"): ColumnDef<Payment>[] => [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <h6 className="text-xs font-medium text-primary-text">{row.original.reference}</h6>
    ),
  },
  {
    accessorKey: "email",
    header: "Customer Email",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text">{row.original.email}</h6>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <h6 className="text-xs font-semibold">
        {formatCurrency(row.original.amount, row.original.currency || currency)}
      </h6>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.paymentMethod || "N/A"}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantAssigner(row.original.status) as any}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text">
        {formatAppDate(row.original.createdAt)}
      </h6>
    ),
  },
];
