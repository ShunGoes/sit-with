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
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <h6 className="text-xs font-medium text-primary-text">{`${row.original?.user?.firstName} ${row.original?.user?.lastName}`}</h6>
        <p 
          className="text-[10px] text-secondary-text truncate max-w-[120px] sm:max-w-[180px]" 
          title={row.original?.user?.email}
        >
          {row.original?.user?.email}
        </p>
      </div>
    ),

  },
  {
    accessorKey: "type",
    header: "Service Type",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text">{row.original?.type}</h6>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <h6 className="text-xs font-semibold">
        {formatCurrency(row.original?.amount, row.original?.currency)}
      </h6>
    ),
  },
  {
    accessorKey: "paystackRef",
    header: "Reference",
    cell: ({ row }) => (
      <h6 className="text-xs font-medium text-secondary-text">{row.original?.paystackRef || "N/A"}</h6>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={statusVariantAssigner(row.original?.status) as any}>
        {row.original?.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text">
        {formatAppDate(row.original?.createdAt)}
      </h6>
    ),
  
  },
];
