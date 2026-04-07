"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import GreenEditIcon from "@/pd-icons/green-edit";
import { Eye } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

let typeVariant;

function variantAssigner(type: "Leaders" | "Professionals" | "Students") {
  switch (type) {
    case "Leaders":
      return (typeVariant = "warning");
    case "Professionals":
      return (typeVariant = "hibiscus");
    case "Students":
      return (typeVariant = "success");
    default:
      return (typeVariant = "default");
  }
}
const ConsultationColumn = (): ColumnDef<ConsultationColumn>[] => [
  {
    accessorKey: "participant",
    header: "Participants",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div>
          <h6 className=" text-xs text-primary-text ">
            {row.original?.participant
              ? `${row.original.participant.slice(0, 18)}${
                  row.original.participant.length > 18 ? "..." : ""
                }`
              : "-"}
          </h6>
        </div>
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => (
      <p contextMenu="text-xs text-primary-text">{row.original.program}</p>
    ),
    size: 300,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p contextMenu="text-xs text-primary-text">
        {new Date(row.original.date).toLocaleDateString("en-Us", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "completed" ? "success" : "warning"}
      >
        {row.original.status.charAt(0).toUpperCase() +
          row.original.status.slice(1)}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: () => {
      const isMobile = useIsMobile();

      if (!isMobile) {
        return (
          <div className="flex gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer outline-none border-none bg-transparent"
                >
                  <GreenEditIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Edit Consulttation details</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer outline-none border-none bg-transparent"
                >
                  <Eye color="#344054" size={15}/>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">View more</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer outline-none border-none bg-transparent"
                >
                  <Trash2 color="#344054" size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Delete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center  items-center">
            <EllipsisVertical />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="py-3 px-4">
              <Eye color="#344054" size={15}/> View
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4">
              {" "}
              <GreenEditIcon color="#344054" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4">
              <Trash2 color="#344054" size={15} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },

    size: 50,
  },
];

export default ConsultationColumn;
