import { getPublicBlogBySlug, getPublishedBlogs } from "@/lib/api/services/blog/blog.services";
import { Metadata } from "next";
import BlogDetailsClient from "@/components/pages/blog/blog-details-client";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await getPublicBlogBySlug(slug);
    const blog = response.data;

    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: "article",
        images: [
          {
            url: blog.coverImageUrl || "/images/logo.png",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  


  return (
    <BlogDetailsClient slug={slug} />
  );
}

export async function generateStaticParams() {
  try {
    const response = await getPublishedBlogs();
    return response.data.map((b:any) => ({ slug: b.slug }));
  } catch (error) {
    return [];
  }
}
