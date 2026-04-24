"use client";

import React, { useState } from "react";
import { useGetAllUsers } from "@/lib/api/hooks/users/users.hooks";
import QueryStateHandler from "@/components/query-state-handler";
import ReuseableTable from "@/components/tables/reuseable-table";
import { UsersTableColumns } from "./users-table-columns";
import { useModalStore } from "@/components/store/use-modal-store";
import UserDetailsModal from "./user-details-modal";
import { AdminUser } from "@/lib/api/services/users/users.services";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT = 20;

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useGetAllUsers({ page, limit: LIMIT });
  const openModal = useModalStore((state) => state.openModal);

  const handleViewDetails = (user: AdminUser) => {
    openModal(
      `user-details-${user.id}`,
      <UserDetailsModal user={user} />
    );
  };

  const users = data?.data?.users;
  const totalPages = data?.data?.pages || 0;

  return (
    <div className="space-y-4">
      <div className="bg-dash-secondary-bg rounded-[16px] pb-1 overflow-hidden">
        <QueryStateHandler
          data={users}
          isLoading={isLoading}
          isError={isError}
          loadingMessage="Loading Users"
          fetchingMessage="Fetching Latest Users"
          errorMessage="Error loading users. Please try again"
          emptyMessage="No users found"
          isFetching={isFetching}
        >
          <ReuseableTable
            columns={UsersTableColumns(handleViewDetails)}
            tableData={users ?? []}
          />
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EAECF0]">
              <div className="text-xs text-secondary-text">
                Page <span className="font-medium text-primary-text">{page}</span> of <span className="font-medium text-primary-text">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page <= 1}
                  className="h-9 text-xs px-4 border-[#EAECF0] text-primary-text font-medium hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1.5" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="h-9 text-xs px-4 border-[#EAECF0] text-primary-text font-medium hover:bg-slate-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          )}
        </QueryStateHandler>
      </div>
    </div>
  );
}
