"use client";

import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import { usePlatformSettingsStore } from "@/store/use-platform-settings-store";
import { PaymentsColumn } from "@/components/tables/columns/payments-column";
import Pagination from "@/components/pagination";
import ReuseableTable from "@/components/tables/reuseable-table";
import { useGetPayments } from "@/lib/api/hooks/payments/payments.hooks";
import { useSearchParams } from "next/navigation";

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const settings = usePlatformSettingsStore((state) => state.settings);

  const { data: paymentsData, isLoading, isError, isFetching } = useGetPayments({
    page,
    limit,
  });
console.log(paymentsData?.data)
  return (
    <div className="space-y-15">
      <div className="flex justify-between items-center ">
        <DashboardHeaderText
          header="Payments"
          subtext="Overview of all transactions on the platform"
        />
      </div>

      <div className="space-y-4">
        {/* table */}
        <div className="bg-dash-secondary-bg rounded-[16px] pb-1 w-full overflow-hidden">
          <QueryStateHandler
            data={paymentsData?.data}
            isLoading={isLoading}
            isError={isError}
            loadingMessage="Loading Payments"
            fetchingMessage="Fetching Latest Payments"
            errorMessage="Error loading payments. Please try again"
            emptyMessage="No payments recorded at this time"
            isFetching={isFetching}
          >
            <ReuseableTable
              columns={PaymentsColumn(settings?.currency)}
              tableData={paymentsData?.data ?? []}
            />
            {paymentsData?.meta?.totalPages && (
              <Pagination totalPages={paymentsData.meta.totalPages} />
            )}
          </QueryStateHandler>
        </div>
      </div>
    </div>
  );
}
