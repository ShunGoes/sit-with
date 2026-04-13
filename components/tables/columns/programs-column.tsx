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

const ActionCell = ({
  row,
  editProgram,
  handleDeleteProgram,
}: {
  row: any;
  editProgram: (id: string) => void;
  handleDeleteProgram: (id: string) => void;
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className="flex gap-2 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => editProgram(row.original.id)}
              className="cursor-pointer outline-none border-none bg-transparent"
            >
              <FilePenLine size={15} />
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
              <Eye color="#344054" size={15} />
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
              onClick={() => handleDeleteProgram(row.original.id)}
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
          <Eye color="#344054" size={15} /> View
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 px-4">
          {" "}
          <FilePenLine
            size={15}
            color="#344054"
            onClick={() => editProgram(row.original.id)}
          />{" "}
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="py-3 px-4">
          <Trash2
            color="#344054"
            size={15}
            onClick={() => handleDeleteProgram(row.original.id)}
          />{" "}
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProgramsColumn = (
  handleDeleteProgram: (id: string) => void,
  editProgram: (id: string) => void
): ColumnDef<ProgramColumn>[] => [
  {
    accessorKey: "name",
    header: "Program Name",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div>
          <h6 className=" text-xs  ">
            {row.original?.name
              ? `${row.original.name.slice(0, 18)}${
                  row.original.name.length > 18 ? "..." : ""
                }`
              : "-"}
          </h6>
        </div>
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={variantAssigner(row.original.type)}>
        {row.original.type}
      </Badge>
    ),
    size: 300,
  },
  {
    accessorKey: "enroled",
    header: "Enrolled",
    cell: ({ row }) => <h6 contextMenu="text-xs ">{row.original.enrolled}</h6>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <h6 contextMenu="text-xs ">
        {formatCurrency(row.original.price, "NGN")}
      </h6>
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
    cell: ({ row }) => (
      <ActionCell
        row={row}
        editProgram={editProgram}
        handleDeleteProgram={handleDeleteProgram}
      />
    ),
    size: 50,
  },
];

export default ProgramsColumn;
