"use client"

import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetPublicBlogBySlug, useGetPublicBlogs } from "@/lib/api/hooks/blog/blog.hooks";
import BlogDetailsSkeleton from "@/components/blog/blog-details-skeleton";

function BlogDetailsWrapper({ slug }: { slug: string }) {
  const { data: blogResponse, isLoading: isLoadingBlog, isError: isBlogError } = useGetPublicBlogBySlug(slug);
  const { data: moreTipsResponse } = useGetPublicBlogs({ limit: 3 });

  const blog = blogResponse?.data;
  const moreTips = (moreTipsResponse?.data || []).filter((b) => b.slug !== slug).slice(0, 2);

  if (isLoadingBlog) {
    return <BlogDetailsSkeleton />;
  }
  if (isBlogError || !blog) {
    return <div className=" flex items-center justify-center w-full min-h-screen text-red-500">Error loading blog</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* ── Main Content Column ── */}
          <article className="flex-1 min-w-0">
            {/* Featured image */}
            <div className="w-full aspect-video bg-[#C4CEBC] rounded-sm mb-6 overflow-hidden relative">
              {blog.coverImageUrl && (
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Title & meta */}
            <h1 className="text-[#242424] text-2xl md:text-3xl font-medium leading-snug mb-4">
              {blog.title}
            </h1>
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium">
                {blog.readTimeMinutes} min read
              </span>
              <span className="text-sm text-secondary-text">{blog.category}</span>
            </div>

            {/* Content body */}
            <div
              className="prose prose-sm md:prose-base max-w-none text-primary-text leading-[1.75] dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </article>

          {/* ── Sidebar Column ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">
            {/* Book a Consultation CTA */}
            <div className="bg-[#F4F7F2] rounded-2xl p-6">
              <p className="text-[#242424] text-[15px] font-medium leading-snug mb-4">
                You don&apos;t have to process everything alone,{" "}
                <span className="text-[#649351] font-semibold">
                  support is here when you need it
                </span>
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
                    <div className="w-full aspect-video bg-[#DEE5DF] rounded-sm overflow-hidden relative">
                      {tip.coverImageUrl && (
                        <Image
                          src={tip.coverImageUrl}
                          alt={tip.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium w-fit">
                      {tip.readTimeMinutes} min read
                    </span>
                    <h4 className="text-[#242424] text-[15px] font-medium leading-snug group-hover:text-[#649351] transition-colors">
                      {tip.title}
                    </h4>
                    <p className="text-[#595959] text-[13px] leading-relaxed line-clamp-2">
                      {tip.excerpt}
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

export default function BlogDetailsClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<BlogDetailsSkeleton />}>
      <BlogDetailsWrapper slug={slug} />
    </Suspense>
  );
}
