
export default function DashboardHeaderText({
  header,
  subtext,
}: {
  header: string;
  subtext: string;
}) {
  return (
    <header>
      <h1 className="text-primary-text font-semibold text-[1.5rem] mb-1">
        {header}
      </h1>
      <p className="text-secondary-text text-sm ">{subtext}</p>
    </header>
  );
}
