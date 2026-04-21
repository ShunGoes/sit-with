import { mockBlogs } from "@/lib/mock-data/blogs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = mockBlogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.snippet,
    openGraph: {
      title: blog.title,
      description: blog.snippet,
      type: "article",
      images: [
        {
          url: "/images/logo.png", // Fallback, would ideally use post image
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const blog = mockBlogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
    return null; // TypeScript narrowing
  }

  // Other blogs for "More Tips" sidebar
  const moreTips = mockBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ── Main Content Column ── */}
          <article className="flex-1 min-w-0">
            {/* Featured image */}
            <div className="w-full aspect-video bg-[#C4CEBC] rounded-sm mb-6 overflow-hidden" />

            {/* Title & meta */}
            <h1 className="text-[#242424] text-2xl md:text-3xl font-medium leading-snug mb-4">
              {blog.title}
            </h1>
            <div className="mb-8">
              <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium">
                {blog.readTime}
              </span>
            </div>

            {/* Content paragraphs */}
            <div className="space-y-5 text-[#333333] text-[15px] md:text-base leading-[1.75]">
              {blog.content.map((para, idx) => {
                // Treat short paragraphs (< 80 chars) as section headings
                const isHeading = para.length < 80 && !para.endsWith(".");
                if (isHeading) {
                  return (
                    <h2
                      key={idx}
                      className="text-[#242424] text-[17px] md:text-[18px] font-semibold mt-8 mb-2 leading-snug"
                    >
                      {para}
                    </h2>
                  );
                }
                return <p key={idx}>{para}</p>;
              })}
            </div>
          </article>

          {/* ── Sidebar Column ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">

            {/* Book a Consultation CTA */}
            <div className="bg-[#F4F7F2] rounded-2xl p-6">
              <p className="text-[#242424] text-[15px] font-medium leading-snug mb-4">
                You don&apos;t have to process everything alone,{" "}
                <span className="text-[#649351] font-semibold">support is here when you need it</span>
              </p>
              <Button
                variant="regular"
                className="flex items-center gap-2 text-sm px-5 py-2.5 h-auto rounded-lg w-full justify-center"
              >
                Book my consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-[#242424] text-[16px] font-semibold mb-5">Follow us</h3>
              <ul className="space-y-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                  { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                  { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                  { icon: <Youtube className="w-5 h-5" />, label: "Youtube" },
                ].map(({ icon, label }) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="flex items-center gap-3 text-[#444] text-[15px] hover:text-[#649351] transition-colors"
                    >
                      <span className="text-[#649351]">{icon}</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Tips on Wellness */}
            <div>
              <h3 className="text-[#242424] text-[16px] font-semibold mb-6">More Tips on wellness</h3>
              <div className="space-y-6">
                {moreTips.map((tip) => (
                  <Link href={`/blog/${tip.slug}`} key={tip.id} className="group flex flex-col gap-2">
                    <div className="w-full aspect-video bg-[#DEE5DF] rounded-sm overflow-hidden" />
                    <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium w-fit">
                      {tip.readTime}
                    </span>
                    <h4 className="text-[#242424] text-[15px] font-medium leading-snug group-hover:text-[#649351] transition-colors">
                      {tip.title}
                    </h4>
                    <p className="text-[#595959] text-[13px] leading-relaxed line-clamp-2">
                      {tip.snippet}
                    </p>
                    <span className="text-[#242424] text-[13px] font-medium border-b border-[#242424] pb-0.5 w-fit group-hover:text-[#649351] group-hover:border-[#649351] transition-colors">
                      Read more
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

// Pre-generate static paths for all blog slugs
export async function generateStaticParams() {
  return mockBlogs.map((b) => ({ slug: b.slug }));
}
