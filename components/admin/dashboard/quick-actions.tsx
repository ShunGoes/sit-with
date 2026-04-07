import { Plus, FileText, Calendar } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Create program",
      icon: <div className="w-12 h-12 rounded-full bg-[#E8F3EF] text-[#4CA48B] flex items-center justify-center"><Plus size={24} /></div>
    },
    {
      label: "Add Content",
      icon: <div className="w-12 h-12 rounded-full bg-[#E8F3EF] text-[#4CA48B] flex items-center justify-center"><FileText size={24} /></div>
    },
    {
      label: "Schedule Content",
      icon: <div className="w-12 h-12 rounded-full bg-[#FFF9E6] text-[#FFC107] flex items-center justify-center"><Calendar size={24} /></div>
    }
  ];

  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-primary-text font-semibold text-xl">Quick Action</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, i) => (
          <button key={i} className="flex flex-col items-center justify-center gap-4 bg-dash-secondary-bg rounded-[16px] p-6 lg:min-w-[200px] flex-1 lg:flex-none shadow-sm transition-transform hover:-translate-y-1">
            {action.icon}
            <span className="text-primary-text text-sm font-semibold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
