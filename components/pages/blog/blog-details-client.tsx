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
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import ShareButton from "@/components/blog/share-button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatAppDate, formatFullName } from "@/lib/utils";
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
          <article className="flex-1 min-w-0 space-y-8">
            <Link href="/blog" className="flex items-center gap-1 mb-2">
              <ChevronLeft className="text-regular-button" size={18} />
              <p className="font-medium text-sm text-regular-button">Back to Blog</p>
            </Link>

            <div className="bg-white px-0 md:px-5 py-8 rounded-sm lg:rounded-[16px] space-y-8">
              <div className="space-y-8">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="hibiscus"
                      className="flex items-center gap-1"
                    >
                      <Tag size={12} /> {blog.category}
                    </Badge>
                  </div>

                  <ShareButton
                    url={`/blog/${blog.slug}`}
                    title={blog.title}
                    description={blog.excerpt}
                    variant="public"
                  />
                </div>

                <div className="space-y-4">
                  <h1 className="lg:text-3xl text-2xl font-bold text-[#072608] leading-tight">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-secondary-text">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-regular-button" />
                      <span>{blog.authorDisplayName || formatFullName(blog.author?.firstName, blog.author?.lastName)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-regular-button" />
                      <span className="text-sm font-medium text-primary-text">
                        {formatAppDate(blog.createdAt, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-regular-button" />
                      <span>{blog.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured image */}
              {blog.coverImageUrl && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                  <Image
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-text">
                  Excerpt
                </h3>
                <p className="text-secondary-text italic border-l-4 border-[#649351]/20 pl-4 py-1 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              {/* Content body */}
              <div className="border-t border-border pt-8">
                <div
                  className="prose prose-sm md:prose-base max-w-none text-primary-text leading-[1.75] dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: blog.body }}
                />
              </div>
            </div>
          </article>

          {/* ── Sidebar Column ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-10">
            {/* Book a Consultation CTA */}
            <div className="">
              <p className="text-[#242424] text-base font-medium leading-snug mb-4">
                You don&apos;t have to process everything alone, support is here
                when you need it
              </p>
              <Link href="/consultation">
                <Button
                  variant="regular"
                  size={"sm"}
                  className=" px-5=3 py-2 h-auto  "
                >
                  Book my consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
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
                    href: "https://www.facebook.com/share/1DUtSP7cdu/?mibextid=wwXIfr",
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
