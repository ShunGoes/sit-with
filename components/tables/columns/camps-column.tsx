"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePenLine } from "lucide-react";
import { Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { EllipsisVertical, Plus } from "lucide-react";
import { formatCurrency, formatAppDate } from "@/lib/utils";
import { Camp } from "@/lib/api/services/camps/camps.services";
import { addCampTierWithId } from "@/components/modal-helper";

let typeVariant;

function statusVariantAssigner(status: string) {
  switch (status.toUpperCase()) {
    case "UPCOMING":
      return "warning";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "destructive";
    default:
      return "hibiscus";
  }
}

const ActionCell = ({
  row,
  handleDeleteCamp,
  editCamp,
}: {
  row: { original: Camp };
  handleDeleteCamp: (id: string) => void;
  editCamp: (camp: Camp) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center items-center">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="">
          <Link
            href={`/admin/camps/${row.original.id}`}
            className="py-3 w-full h-full flex px-3 gap-1"
          >
            <Eye className="text-primary-text" size={15} /> View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => addCampTierWithId(row.original.id)}
          className="py-3 px-4"
        >
          <Plus size={15} className="text-primary-text" /> Add Tier
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => editCamp(row.original)}
          className="py-3 px-4"
        >
          <FilePenLine size={15} className="text-primary-text" /> Edit Camp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteCamp(row.original.id)} className="py-3 px-4 text-brand-red">
          <Trash2 color="var(--brand-red)" size={15} /> Delete Camp
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CampsColumn = (
  handleDeleteCamp: (id: string) => void,
  editCamp: (camp: Camp) => void,
  currency: string = "NGN"
): ColumnDef<Camp>[] => [
  {
    accessorKey: "title",
    header: "Camp Name",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <h6 className="text-xs">{row.original.title}</h6>
      </div>
    ),
    size: 180,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text">
        {row.original.location}
      </h6>
    ),
    size: 150,
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <h6 className="text-xs">
        {row.original.capacity}
      </h6>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const dateStr = row.original.startDate;
      const formattedDate = dateStr 
        ? formatAppDate(dateStr)
        : "-";
      return <h6 className="text-xs">{formattedDate}</h6>;
    },
    size: 150
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
       const status = row.original.status || "UPCOMING";
       return (
        <Badge variant={statusVariantAssigner(status) as any}>
          {status}
        </Badge>
       );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionCell
        row={row}
        handleDeleteCamp={handleDeleteCamp}
        editCamp={editCamp}
      />
    ),
    size: 50,
  },
];

export default CampsColumn;
