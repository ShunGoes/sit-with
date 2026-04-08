import { Plus, FileText, Calendar, CalendarCheck, CalendarCheck2 } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Create program",
      icon: <div className="w-12 h-12 rounded-full bg-[#DDF8DB] text-[#445B1C] flex items-center justify-center"><Plus size={24} /></div>
    },
    {
      label: "Add Content",
      icon: <div className="w-12 h-12 rounded-full bg-[#DDF8DB] text-[#445B1C] flex items-center justify-center"><FileText size={24} /></div>
    },
    {
      label: "Schedule Content",
      icon: <div className="w-12 h-12 rounded-full bg-[#FFFBD4] text-[#FFC555] flex items-center justify-center"><CalendarCheck2 size={24} /></div>
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-primary-text font-semibold text-xl">Quick Action</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide ">
        {actions.map((action, i) => (
          <button key={i} className="flex flex-col items-center justify-center gap-4 bg-dash-secondary-bg rounded-[10px] p-6 lg:min-w-[200px] min-w-[250px] flex-1 lg:flex-none  transition-transform hover:-translate-y-1">
            {action.icon}
            <span className="text-primary-text text-base font-semibold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
