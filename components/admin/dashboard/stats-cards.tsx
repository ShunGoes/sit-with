import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    { title: "Total Participants", value: "1200" },
    { title: "Active Programs", value: "24" },
    { title: "Pending Consultations", value: "18" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border-none rounded-[16px] bg-dash-secondary-bg">
          <CardContent className="p-6 flex flex-col gap-3 justify-center">
            <h6 className="text-[#667085] text-xs md:text-sm font-medium">{stat.title}</h6>
            <h3 className="text-primary-text text-[28px] md:text-[32px] font-semibold">{stat.value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
