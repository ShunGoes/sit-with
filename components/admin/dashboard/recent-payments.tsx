"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useGetAdminStats } from "@/lib/api/hooks/admin/admin.hooks";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentPayments() {
  const { data, isLoading, isError } = useGetAdminStats();

  if (isError) return null;

  const payments = data?.data?.recentPayments ?? [];

  return (
    <div className="bg-dash-secondary-bg rounded-[16px] flex flex-col w-full p-4 md:p-6 overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse mt-4">
          <thead>
            <tr className="text-secondary-text text-[10px] uppercase tracking-wider font-semibold">
              <th className="pb-3 px-2">Type</th>
              <th className="pb-3 px-2">Amount</th>
              <th className="pb-3 px-2">Reference</th>
              <th className="pb-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-primary-text text-xs">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-[#EAECF0] last:border-0">
                  <td className="py-3 px-2"><Skeleton className="h-4 w-16" /></td>
                  <td className="py-3 px-2"><Skeleton className="h-4 w-20" /></td>
                  <td className="py-3 px-2"><Skeleton className="h-4 w-24" /></td>
                  <td className="py-3 px-2"><Skeleton className="h-6 w-16 rounded-full" /></td>
                </tr>
              ))
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-secondary-text">
                  No recent payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 font-medium">{payment.type}</td>
                  <td className="py-3 px-2">{formatCurrency(payment.amount, payment.currency)}</td>
                  <td className="py-3 px-2 text-secondary-text font-mono text-[10px]">
                    {payment.paystackRef || "N/A"}
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={payment.status === "SUCCESS" ? "success" : "warning"}>
                      {payment.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
