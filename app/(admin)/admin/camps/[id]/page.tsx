import CampDetail from "@/components/admin/camps/camp-detail";

export default async function CampDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <CampDetail id={id} />;
}
