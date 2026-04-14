import React from 'react'
import DashboardHeaderText from "@/components/dashboard/dashboard-header";

export default function UserSettingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Settings"
        subtext="Manage your account settings and preferences here."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-[#EAECF0] dark:border-[#333] p-6">
        <p className="text-secondary-text text-sm">Settings coming soon.</p>
      </div>
    </div>
  )
}
