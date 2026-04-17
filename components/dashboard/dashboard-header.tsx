import { ChevronLast, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardHeaderText({
  header,
  subtext,
  backLink,
  backLinkText,
}: {
  header: string;
  subtext: string;
  backLink?: string;
  backLinkText?: string;
}) {
  return (
    <header className="space-y-5">
      {backLink && (
        <Link href={backLink} className="flex items-center gap-1">
          <ChevronLeft className="text-regular-button" />
          <p className="font-medium text-sm text-regular-button">{backLinkText ?? "Back"}</p>
        </Link>
      )}
      <h1 className="text-primary-text font-semibold text-[1.5rem] mb-1">
        {header}
      </h1>
      <p className="text-secondary-text text-sm ">{subtext}</p>
    </header>
  );
}
