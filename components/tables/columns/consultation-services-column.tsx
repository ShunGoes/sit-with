"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, FilePenLine, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { formatCurrency } from "@/lib/utils";
import { ConsultationService } from "@/lib/api/services/consultations/consultation-services.services";
import { useUpdateConsultationService } from "@/lib/api/hooks/consultations/consultation-services.hooks";
import { editConsultationService } from "@/components/modal-helper";

const ActionCell = ({ row }: { row: any }) => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const service: ConsultationService = row.original;

  const { mutate: updateService, isPending } = useUpdateConsultationService();

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true }
      );
    }
  }, [isPending, openModal]);

  const handleToggleStatus = () => {
    updateService(
      { id: service.id, payload: { isActive: !service.isActive } },
      {
        onSuccess: () => closeModal("loading"),
        onError: () => closeModal("loading"),
      }
    );
  };

  const handleEdit = () => {
    editConsultationService(service);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer transition-all rounded-full duration-300 w-10 h-10 hover:bg-[#EBEBEB] flex justify-center items-center">
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit} className="py-3 px-4 gap-2">
          <FilePenLine size={15} className="text-primary-text"/> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleStatus} className="py-3 px-4 gap-2">
          {service.isActive ? (
            <ToggleLeft size={15}className="text-primary-text" />
          ) : (
            <ToggleRight size={15} className="text-primary-text" />
          )}
          {service.isActive ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/consultation-services/${service.id}`)}
          className="py-3 px-4 gap-2"
        >
          <Eye size={15} className="text-primary-text" /> View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ConsultationServicesColumn = (): ColumnDef<ConsultationService>[] => [
  {
    accessorKey: "title",
    header: "Service Name",
    cell: ({ row }) => (
      <p className="text-xs text-primary-text font-medium md:whitespace-normal whitespace-nowrap">{row.original.title}</p>
    ),
    size: 300,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="text-xs text-secondary-text max-w-[280px] truncate">
        {row.original.description}
      </p>
    ),
    size: 300,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <p className="text-xs text-primary-text">
        {formatCurrency(row.original.price)}
      </p>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <p className="text-xs text-primary-text">{row.original.duration} mins</p>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "success" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell row={row} />,
    size: 60,
  },
];

export default ConsultationServicesColumn;
