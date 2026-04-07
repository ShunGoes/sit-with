import { ChevronLeft, ChevronRight } from "lucide-react";

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
      action: "Paid ₦45,000 for",
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
      action: "Paid ₦32,000 for",
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
    <div className="bg-dash-secondary-bg rounded-[16px] shadow-sm flex flex-col w-full p-4 md:p-6 overflow-hidden">
      <h3 className="text-brand-green text-sm font-bold pb-4 border-b border-[#EAECF0] dark:border-gray-800">
        Recent Activities
      </h3>

      <div className="flex flex-col w-full overflow-x-auto">
        <div className="min-w-[600px]">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-4 border-b border-[#EAECF0] dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors px-2"
            >
              <p className="text-sm text-primary-text">
                <span className="font-medium text-[#475467] dark:text-[#A1A1A1]">{activity.boldName}</span>{" "}
                {activity.action}{" "}
                <span className="text-brand-green font-medium">
                  {activity.boldTarget}
                </span>
              </p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#F5F3FF] text-[#7F56D9] text-[12px] font-medium rounded-[16px]">
                  {activity.badge1}
                </span>
                <span className="px-3 py-1 bg-[#FFF9E6] text-[#F79009] text-[12px] font-medium rounded-[16px]">
                  {activity.badge2}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-2 mt-4 pt-4">
        <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-[#344054] dark:text-gray-200 bg-white dark:bg-gray-800 font-medium text-xs">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-[#EAECF0] dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <ChevronRight size={16} />
        </button>
        <span className="text-xs text-[#344054] dark:text-gray-400 font-medium ml-2">
          6 Pages
        </span>
      </div>
    </div>
  );
}
