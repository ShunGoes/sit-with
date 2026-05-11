"use client";

import React from "react";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import CardSkeletons from "@/components/skeletons/card-skeletons";
import CampCards from "@/components/user/dashboard/camp-cards";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function UserCampsPage() {
  const { data, isLoading } = useGetDashboardData();
  const router = useRouter();

  const campRegistrations = data?.data?.campRegistrations ?? [];

  useEffect(() => {
    if (!isLoading && campRegistrations.length === 0) {
      router.push("/dashboard");
    }
  }, [isLoading, campRegistrations, router]);

  if (isLoading) return <CardSkeletons />;

  if (campRegistrations.length === 0) return null;

  return (
    <div className="flex flex-col gap-7">
      <DashboardHeaderText
        header="My Registered Camps"
        subtext="View and manage your registered camp events"
      />

      <div className="grid grid-cols-1 gap-6 max-w-[1000px]">
        {campRegistrations.map((registration) => (
          <Link 
            key={registration.id} 
            href={`/dashboard/camps/${registration.camp.id}`}
            className="transition-transform hover:scale-[1.01]"
          >
            <CampCards registration={registration} />
          </Link>
        ))}
      </div>
    </div>
  );
}
