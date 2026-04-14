import React from 'react'
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { Card } from "@/components/ui/card";

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px]">
      <DashboardHeaderText
        header="Dashboard Overview"
        subtext="Welcome back! Here is a summary of your learning progress."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-[#EAECF0] dark:border-[#333] flex flex-col">
           <h3 className="text-sm font-medium text-secondary-text mb-2">Enrolled Programs</h3>
           <p className="text-3xl font-bold text-primary-text">3</p>
        </Card>
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-[#EAECF0] dark:border-[#333] flex flex-col">
           <h3 className="text-sm font-medium text-secondary-text mb-2">Completed Modules</h3>
           <p className="text-3xl font-bold text-primary-text">2</p>
        </Card>
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-[#EAECF0] dark:border-[#333] flex flex-col">
           <h3 className="text-sm font-medium text-secondary-text mb-2">Upcoming Sessions</h3>
           <p className="text-3xl font-bold text-primary-text">1</p>
        </Card>
      </div>
    </div>
  )
}
