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
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={handlePublishProgram} className="py-3 px-4">
          {row.original.isPublished ? (
            <EyeOff className="text-[#344054] dark:text-white" size={15} />
          ) : (
            <Eye className="text-[#344054] dark:text-white" size={15} />
          )}{" "}
          {row.original.isPublished ? "Unpublish" : "Publish"} Program
        </DropdownMenuItem>
        <DropdownMenuItem className="">
          <Link
            href={`/admin/program/${row.original.id}`}
            className="py-3 w-full h-full flex px-3 gap-1"
          >
            <Eye className="text-[#344054] dark:text-white" size={15} /> View
          </Link>
        </DropdownMenuItem>
        {row.original.isPublished && (
          <DropdownMenuItem
            onClick={() =>
              router.push(`/admin/program/${row.original.id}/edit`)
            }
            className="py-3 px-4"
          >
            {" "}
            <FilePenLine className="text-[#344054] dark:text-white" /> Edit
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => handleDeleteProgram(row.original.id)}
          className="py-3 px-4 text-brand-red hover:text-brand-red"
        >
          <Trash2 color="var(--brand-red)" size={15} /> Delete Program
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProgramsColumn = (
  handleDeleteProgram: (id: string) => void,
  editProgram: (id: string) => void,
  currency: string = "NGN",
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
    size: 200,
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
    size: 150,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <h6 className="text-xs ">
        {formatCurrency(row.original.price, currency)}
      </h6>
    ),
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isPublished ? "success" : "secondary"}>
        {row.original.isPublished ? "Published" : "Draft"}
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
