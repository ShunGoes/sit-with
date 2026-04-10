import VerificationFailedClient from "./verification-failed-client";

interface VerificationFailedPageProps {
  searchParams: {
    reason?: string;
  };
}

export default function VerificationFailedPage({
  searchParams,
}: VerificationFailedPageProps) {
  return <VerificationFailedClient reason={searchParams.reason} />;
}
