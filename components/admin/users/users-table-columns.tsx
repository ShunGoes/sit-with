"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminUser } from "@/lib/api/services/users/users.services";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye } from "lucide-react";
import { formatAppDate } from "@/lib/utils";

const ActionCell = ({
  user,
  onViewDetails,
}: {
  user: AdminUser;
  onViewDetails: (user: AdminUser) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center items-center">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => onViewDetails(user)}
          className="py-3 px-3 flex gap-2 cursor-pointer"
        >
          <Eye size={15} color="#344054" />
          <span className="text-sm">View Details</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const UsersTableColumns = (
  onViewDetails: (user: AdminUser) => void
): ColumnDef<AdminUser>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <h6 className="text-xs font-medium whitespace-nowrap">
        {row.original.firstName} {row.original.lastName}
      </h6>
    ),
    size: 300,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <h6 className="text-xs text-secondary-text whitespace-nowrap">{row.original.email}</h6>
    ),
    size: 250,
  },
  {
    accessorKey: "isEmailVerified",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isEmailVerified ? "success" : "warning"}>
        {row.original.isEmailVerified ? "Verified" : "Unverified"}
      </Badge>
    ),
    size: 100,
  },
  {
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => {
      const dateStr = row.original.createdAt;
      const formattedDate = dateStr
        ? formatAppDate(dateStr)
        : "-";
      return <h6 className="text-xs whitespace-nowrap">{formattedDate}</h6>;
    },
    size: 200,
  },
  {
    header: "Activity",
    cell: ({ row }) => {
      const counts = row.original._count;
      return (
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-secondary-text">Camps</span>
            <span className="text-xs font-medium">{counts.campRegistrations}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-secondary-text">Consults</span>
            <span className="text-xs font-medium">{counts.consultations}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-secondary-text">Programs</span>
            <span className="text-xs font-medium">{counts.purchases}</span>
          </div>
        </div>
      );
    },
    size: 400,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionCell user={row.original} onViewDetails={onViewDetails} />
    ),
    size: 50,
  },
];
