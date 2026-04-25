import BlogDetail from "@/components/admin/blog/blog-detail";

export default async function AdminBlogDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <BlogDetail id={id} />;
}
