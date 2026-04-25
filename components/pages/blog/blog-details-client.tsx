"use client";

import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  User,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import {
  useGetPublicBlogBySlug,
  useGetPublicBlogs,
} from "@/lib/api/hooks/blog/blog.hooks";
import BlogDetailsSkeleton from "@/components/blog/blog-details-skeleton";

function BlogDetailsWrapper({ slug }: { slug: string }) {
  const {
    data: blogResponse,
    isLoading: isLoadingBlog,
    isError: isBlogError,
  } = useGetPublicBlogBySlug(slug);
  const { data: moreTipsResponse } = useGetPublicBlogs({ limit: 3 });

  const blog = blogResponse?.data;
  const moreTips = (moreTipsResponse?.data || [])
    .filter((b) => b.category === blog?.category && b.id !== blog?.id)
    .slice(0, 2);

  if (isLoadingBlog) {
    return <BlogDetailsSkeleton />;
  }
  if (isBlogError || !blog) {
    return (
      <div className=" flex items-center justify-center w-full min-h-screen text-red-500">
        Error loading blog
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:mt-20 mt-15 lg:w-10/12 w-full mx-auto">
          {/* ── Main Content Column ── */}
          <article className="flex-1 min-w-0">
            <Link href="/blog" className="flex items-center gap-1 mb-6">
              <ChevronLeft className="text-regular-button" />
              <p className="font-medium text-sm text-regular-button">Back</p>
            </Link>
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
            <h1 className="text-[#072608] lg:text-2xl text-xl font-medium leading-snug mb-4">
              {blog.title}
            </h1>
            <div className="mb-8 flex items-center gap-4">
              <span className="inline-block bg-[#E5ECE3] text-[#476C3B] px-3 py-1 rounded-full text-xs font-medium">
                {blog.readTimeMinutes} min read
              </span>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{blog.author || "Admin"}</span>
              </div>
              <span className="text-sm text-secondary-text">
                {blog.category}
              </span>
            </div>

            {/* Content body */}
            <div
              className="prose prose-sm md:prose-base max-w-none text-primary-text leading-[1.75] dark:prose-invert shadow-[0px_4px_4px_#0000001F] p-4"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </article>

          {/* ── Sidebar Column ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">
            {/* Book a Consultation CTA */}
            <div className="">
              <p className="text-[#242424] text-base font-medium leading-snug mb-4">
                You don&apos;t have to process everything alone, support is here
                when you need it
              </p>
              <Button
                variant="regular"
                size={"sm"}
                className=" px-5=3 py-2 h-auto  "
              >
                Book my consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-[#242424] text-[16px] font-semibold mb-5">
                Follow us
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: (
                      <Image
                        width={20}
                        height={20}
                        alt="social media link"
                        src={"/images/facebook.png"}
                      />
                    ),
                    label: "Facebook",
                    href: "https://www.facebook.com/share/19tSLd5kzH/?mibextid=wwXIfr",
                  },
                  {
                    icon: (
                      <Image
                        width={20}
                        height={20}
                        alt="social media link"
                        src={"/images/tiktok.png"}
                      />
                    ),
                    label: "Tiktok",
                    href: "https://www.tiktok.com/@sitwithpd?_r=1&_t=ZN-95g0zMOaKzW",
                  },
                  {
                    icon: (
                      <Image
                        width={20}
                        height={20}
                        alt="social media link"
                        src={"/images/instagram.png"}
                      />
                    ),
                    label: "Instagram",
                    href: "https://www.instagram.com/sitwithpd?igsh=OHo1eHRqNTRmd2ps&utm_source=qr",
                  },
                  {
                    icon: (
                      <Image
                        width={20}
                        height={20}
                        alt="social media link"
                        src={"/images/youtube.png"}
                      />
                    ),
                    label: "Youtube",
                    href: "https://www.youtube.com/@sitwithpd",
                  },
                ].map(({ icon, label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
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
            {moreTips.length > 0 && (
              <div>
                <h3 className="text-[#242424] text-[16px] font-semibold mb-6">
                  Read More
                </h3>
                <div className="space-y-6">
                  {moreTips.map((tip) => (
                    <Link
                      href={`/blog/${tip.slug}`}
                      key={tip.id}
                      className="group flex flex-col gap-2"
                    >
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
            )}
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
