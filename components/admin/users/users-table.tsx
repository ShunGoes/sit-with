"use client";

import React, { useState } from "react";
import { useGetAllUsers } from "@/lib/api/hooks/users/users.hooks";
import QueryStateHandler from "@/components/query-state-handler";
import ReuseableTable from "@/components/tables/reuseable-table";
import { UsersTableColumns } from "./users-table-columns";
import { useModalStore } from "@/components/store/use-modal-store";
import UserDetailsModal from "./user-details-modal";
import { AdminUser } from "@/lib/api/services/users/users.services";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";

const LIMIT = 2;

export default function UsersTable() {

  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  
  const { data, isLoading, isError, isFetching } = useGetAllUsers({
    page,
    limit: LIMIT,
    ...(search && { search })
  });
  const openModal = useModalStore((state) => state.openModal);

  const handleViewDetails = (user: AdminUser) => {
    openModal(`user-details-${user.id}`, <UserDetailsModal user={user} />);
  };

  const users = data?.data;
  const totalPages = data?.meta?.totalPages || 0;

  return (
    <div className="space-y-4">
      <div className="bg-dash-secondary-bg rounded-[16px] pb-1 overflow-hidden">
        <QueryStateHandler
          key={`${page}-${search}`}
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
        </QueryStateHandler>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
