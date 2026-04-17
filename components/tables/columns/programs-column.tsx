"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { EyeOff, FilePenLine } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { usePublishProgram } from "@/lib/api/hooks/programs/programs.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { useEffect } from "react";
import { Spinner } from "@/components/spinner";

let typeVariant;

function variantAssigner(type: "LEADERS" | "PROFESSIONALS" | "STUDENTS") {
  switch (type) {
    case "LEADERS":
      return (typeVariant = "warning");
    case "PROFESSIONALS":
      return (typeVariant = "hibiscus");
    case "STUDENTS":
      return (typeVariant = "success");
    default:
      return (typeVariant = "default");
  }
}

const ActionCell = ({
  row,
  handleDeleteProgram,
}: {
  row: any;
  handleDeleteProgram: (id: string) => void;
}) => {
  const router = useRouter();
  const { mutate, isPending } = usePublishProgram(row.original.id);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const handlePublishProgram = () => {
    mutate(
      {
        title: row.original.title,
        isPublished: !row.original.isPublished,
      },
      {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center  items-center">
        <EllipsisVertical />{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePublishProgram} className="py-3 px-4">
          {row.original.isPublished ? <EyeOff color="#344054" size={15} /> : <Eye color="#344054" size={15} />} {row.original.isPublished ? "Unpublish" : "Publish"} Program
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <Link
            href={`/admin/program/${row.original.id}`}
            className="py-3 w-full h-full flex px-3 gap-1"
          >
            <Eye color="#344054" size={15} /> View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/program/${row.original.id}/edit`)}
          className="py-3 px-4"
        >
          {" "}
          <FilePenLine size={15} color="#344054" /> Edit
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
  editProgram: (id: string) => void,
): ColumnDef<ProgramColumn>[] => [
  {
    accessorKey: "title",
    header: "Program Name",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div>
          <h6 className=" text-xs  ">{row.original.title}</h6>
        </div>
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "category",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        variant={variantAssigner(
          row.original.category?.toUpperCase() as
            | "LEADERS"
            | "PROFESSIONALS"
            | "STUDENTS",
        )}
      >
        {row.original.category}
      </Badge>
    ),
    size: 300,
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
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isPublished ? "success" : "secondary"}>
        {row.original.isPublished ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionCell row={row} handleDeleteProgram={handleDeleteProgram} />
    ),
    size: 50,
  },
];

export default ProgramsColumn;
