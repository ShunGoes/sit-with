"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatAppDate } from "@/lib/utils";
import { ContactSubmission } from "@/lib/api/services/contact/contact.services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";

interface ActionCellProps {
  submission: ContactSubmission;
  onView: (submission: ContactSubmission) => void;
  onDelete: (id: string) => void;
}

const ActionCell = ({ submission, onView, onDelete }: ActionCellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center items-center">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem
          onClick={() => onView(submission)}
          className="py-3 px-3 flex gap-2 cursor-pointer"
        >
          <Eye size={15} color="#344054" />
          <span className="text-sm">View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(submission.id)}
          className="py-3 px-3 flex gap-2 cursor-pointer text-brand-red focus:text-brand-red focus:bg-red-50"
        >
          <Trash2 size={15} color="var(--brand-red)" />
          <span className="text-sm">Delete Submission</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ContactSubmissionsColumn = (
  onView: (submission: ContactSubmission) => void,
  onDelete: (id: string) => void,
): ColumnDef<ContactSubmission>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <h6 className="text-xs font-medium text-primary-text">
        {row.original?.fullName}
      </h6>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <h6
        className="text-xs text-secondary-text truncate max-w-[150px]"
        title={row.original?.email}
      >
        {row.original?.email}
      </h6>
    ),
    size: 150,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <h6 className="text-xs font-medium text-secondary-text">
        {row.original?.phone || "N/A"}
      </h6>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <p
        className="text-[10px] text-secondary-text truncate max-w-[200px]"
        title={row.original?.message}
      >
        {row.original?.message}
      </p>
    ),
    size: 200,
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text capitalize">
        {row.original?.source?.replace("_", " ")}
      </h6>
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
    size: 120,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionCell
        submission={row.original}
        onView={onView}
        onDelete={onDelete}
      />
    ),
    size: 50,
  },
];
