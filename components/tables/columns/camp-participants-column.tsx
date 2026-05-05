"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface CampParticipantRow {
  id: string;
  name: string;
  phone: string;
  tier: string;
  amountPaid: number;
  payment: string;
  emergencyContact?: any;
}

const CampParticipantsColumn = (
  onViewDetails: (id: string) => void
): ColumnDef<CampParticipantRow>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-primary-text">{row.original.name}</span>
       
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="text-xs">{row.original.phone}</span>,
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-normal">
        {row.original.tier}
      </Badge>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => (
      <span className="text-xs font-medium">
        {formatCurrency(row.original.amountPaid || 0)}
      </span>
    ),
  },
  {
    accessorKey: "payment",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.payment?.toLowerCase();
      return (
        <Badge
          variant={status === "paid" || status === "success" ? "success" : "warning"}
        >
          {row.original.payment || "Pending"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-8 text-xs border-regular-button text-regular-button hover:bg-regular-button hover:text-white transition-colors"
        onClick={() => onViewDetails(row.original.id)}
      >
        <Eye size={14} />
        View Details
      </Button>
    ),
  },
];

export default CampParticipantsColumn;
