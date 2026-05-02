import { Badge } from "@/components/ui/badge";

import { formatCurrency } from "@/lib/utils";

export function RecentActivities() {
  const activities = [
    {
      boldName: "Amaka Osei",
      action: "Enrolled in",
      boldTarget: "Leadership Essentials translation",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Tunde Adeyemi",
      action: "Booked",
      boldTarget: "consultation for Career Development",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Chidinma Eze",
      action: `Paid ${formatCurrency(45000)} for`,
      boldTarget: "Professional Growth Program",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Emeka Nwosu",
      action: "Enrolled in",
      boldTarget: "Business Strategy for Students",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Fatima Bello",
      action: "Booked",
      boldTarget: "consultation for Executive Leadership",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Seun Adebayo",
      action: `Paid ${formatCurrency(32000)} for`,
      boldTarget: "Student Success Bootcamp",
      badge1: "Enrollment",
      badge2: "New",
    },
    {
      boldName: "Tunde Adeyemi",
      action: "Booked",
      boldTarget: "consultation for Career Development",
      badge1: "Enrollment",
      badge2: "New",
    },
  ];

  return (
    <div className="bg-dash-secondary-bg rounded-[16px] min-h-[60vh] flex flex-col w-full p-4 md:p-6 overflow-y-auto scrollbar-hide">
      <h3 className="text-brand-green text-sm font-bold pb-2 border-b border-[#EAECF0] dark:border-gray-800">
        Recent Activities
      </h3>

      <div className="flex flex-col w-full scrollbar-hide overflow-x-auto">
        <div className="min-w-[600px]">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-[#EAECF0] dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors px-2"
            >
              <p className="font-normal text-xs text-secondary-text">
                {activity.boldName} {activity.action}{" "}
                <span className="text-[#649351] font-normal">
                  {activity.boldTarget}
                </span>
              </p>
              <div className="flex items-center gap-3">
                <Badge variant={"hibiscus"}>
                  {activity.badge1}
                </Badge>
                <Badge variant={"warning"}>
                  {activity.badge2}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
