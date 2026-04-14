/**
 * Program Details Page — /admin/program/[id]
 *
 * Architecture:
 * - Server component that awaits params, then renders ProgramDetailClient.
 * - The client component manages page-level draft state via useState<DraftWeek[]>.
 * - No page-level <form>. Each modal has its own scoped useForm.
 * - Draft weeks are built locally, then published one at a time via the Publish button.
 * - On publish success: draft is removed from local state, program query is invalidated
 *   so the "Program Weeks" list refreshes with the newly published week.
 */

import ProgramDetailClient from "./program-detail-client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramDetailsPage({ params }: Props) {
  const { id } = await params;
  return <ProgramDetailClient programId={id} />;
}
