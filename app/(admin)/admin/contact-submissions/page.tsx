"use client";

import { Suspense, useEffect } from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import { ContactSubmissionsColumn } from "@/components/tables/columns/contact-submissions-column";
import Pagination from "@/components/pagination";
import ReuseableTable from "@/components/tables/reuseable-table";
import {
  useGetAdminContactSubmissions,
  useDeleteContactSubmission,
} from "@/lib/api/hooks/contact/contact.hooks";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/searchInput";
import { useModalStore } from "@/components/store/use-modal-store";
import ContactSubmissionDetailsModal from "@/components/admin/contact-submissions/contact-submission-details-modal";
import { ContactSubmission } from "@/lib/api/services/contact/contact.services";
import { Spinner } from "@/components/spinner";

function ContactSubmissionsContent() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const search = searchParams.get("search") ?? "";

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    data: responseData,
    isLoading,
    isError,
    isFetching,
  } = useGetAdminContactSubmissions({
    page,
    limit,
    ...(search && { search }),
  });

  const { mutate: deleteSubmission, isPending: isDeleting } =
    useDeleteContactSubmission();

  const handleOnView = (submission: ContactSubmission) => {
    openModal(
      `contact-submission-${submission.id}`,
      <ContactSubmissionDetailsModal submission={submission} />,
    );
  };

  const handleOnDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      deleteSubmission(id, {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      });
    }
  };

  useEffect(() => {
    if (isDeleting) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isDeleting, openModal]);

  return (
    <div className="space-y-15 relative pb-10">
      <div className="flex justify-between items-center ">
        <DashboardHeaderText
          header="Contact Submissions"
          subtext="Overview of contact form submissions"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center w-full justify-between gap-4">
          <div className="w-auto flex items-center gap-3">
            <SearchInput />
          </div>

          <div className="hidden lg:block">
            {responseData?.meta?.totalPages ? (
              <Pagination totalPages={responseData.meta.totalPages} />
            ) : null}
          </div>
        </div>

        <div className="bg-dash-secondary-bg rounded-[16px] pb-1 w-full overflow-hidden">
          <QueryStateHandler
            key={`${page}-${search}`}
            data={responseData?.data}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading Submissions"
            fetchingMessage="Fetching Latest Submissions"
            errorMessage="Error loading submissions. Please try again"
            emptyMessage="No contact submissions recorded at this time"
            isFetching={isFetching}
          >
            <ReuseableTable
              columns={ContactSubmissionsColumn(handleOnView, handleOnDelete)}
              tableData={responseData?.data ?? []}
            />
          </QueryStateHandler>
        </div>

        <div className="lg:hidden mt-4 flex w-full">
          {responseData?.meta?.totalPages ? (
            <Pagination totalPages={responseData.meta.totalPages} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ContactSubmissionsPage() {
  return (
    <Suspense fallback={<div>Loading submissions...</div>}>
      <ContactSubmissionsContent />
    </Suspense>
  );
}
