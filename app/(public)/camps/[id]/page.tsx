import CampCardByIdOverviewWrapper from "@/components/pages/camps/camp-by-id";

export default async function CampDetailsOverview({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div><CampCardByIdOverviewWrapper id={id} /></div>;
}
