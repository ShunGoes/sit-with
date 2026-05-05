"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilePenLine } from "lucide-react";
import { Eye } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

import { formatAppDate } from "@/lib/utils";

const ParticipantsColumn = (): ColumnDef<ParticipantColumn>[] => [
  {
    accessorKey: "participant",
    header: "Participant",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div>
          <h6 className=" text-xs text-primary-text dark:text-[#A1A1A1]">
            {row.original?.participant
              ? `${row.original.participant.slice(0, 18)}${
                  row.original.participant.length > 18 ? "..." : ""
                }`
              : "-"}
          </h6>
        </div>
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => (
      <p className="text-xs text-primary-text dark:text-[#A1A1A1]">{row.original.program}</p>
    ),
    size: 200,
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => (
      <p className="text-xs text-primary-text dark:text-[#A1A1A1]">
        {row.original.dateJoined ? formatAppDate(row.original.dateJoined) : "-"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "success" : "secondary"}
      >
        {row.original.status}
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
                  <FilePenLine size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">Edit Participant details</p>
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
              <FilePenLine size={15} color="#344054" /> Edit
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

export default ParticipantsColumn;
