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

const ProgramsColumn = (): ColumnDef<ProgramColumn>[] => [
  {
    accessorKey: "id",
    header: "Employee ID",
    cell: ({ row }) => (
      <p className="font-bold text-[0.875rem] text-dash-black-100">
        {row.original.id}{" "}
      </p>
    ),
  },
  {
    accessorKey: "profile",
    header: "Employee Profile",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div>
          <h6 className="font-medium text-[1rem] text-dash-black-100 leading-6">
            {row.original.name}
          </h6>
          <span className="text-[#6B7280] text-[1rem] font-normal">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "dept",
    header: "Department",
    cell: ({ row }) => <p className=" ">{row.original.program}</p>,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <h6 contextMenu="font-bold text-[#111827] text-[1rem] " className="">
        {row.original.price}
      </h6>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="border-none">{row.original.status}</Badge>
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
                <p className="text-white">Edit Program details</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer outline-none border-none bg-transparent"
                >
                  <Eye />
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
                  <Trash2 />
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
              <Eye /> View
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4">
              {" "}
              <GreenEditIcon color="black" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4">
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },

    size: 50,
  },
];

export default ProgramsColumn;
