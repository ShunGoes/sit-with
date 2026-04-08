import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    { title: "Total Participants", value: "1200" },
    { title: "Active Programs", value: "24" },
    { title: "Pending Consultations", value: "18" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {stats.map((stat, index) => (
        <Card key={index} className=" border-none rounded-[10px] bg-dash-secondary-bg">
          <CardContent className="p-5 flex flex-col gap-3 justify-center">
            <h6 className="text-primary-text text-xs md:text-sm font-normal">{stat.title}</h6>
            <h3 className="text-secondary-text text-2xl font-semibold">{stat.value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
