import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicBlogs } from "@/lib/api/hooks/blog/blog.hooks";
import "swiper/css";

export default function UserBlogsCarousel() {
  const { data: blogs, isLoading } = useGetPublicBlogs();

  if (isLoading) {
    return (
      <div className="p-4 rounded-2xl border border-slate-100 dark:border-none bg-dash-secondary-bg shadow-sm">
        <Skeleton className="w-full aspect-video rounded-md mb-4" />
        <Skeleton className="h-4 w-20 mb-2 rounded-full" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-5 w-24" />
      </div>
    );
  }

  const blogsList = blogs?.data || [];

  if (blogsList.length === 0) {
    return (
      <div className="p-8 rounded-2xl border border-slate-100 dark:border-none bg-dash-secondary-bg shadow-sm text-center">
        <p className="text-primary-text">No blogs available.</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      className="w-full !pb-8"
    >
      {blogsList.map((blog) => (
        <SwiperSlide key={blog.id} className="flex h-auto w-full max-w-full box-border">
          <Link
            href={`/blog/${blog.slug}`}
            className="flex flex-col group p-4 rounded-[16px] dark:border-none border border-[#F3F4F6] bg-dash-secondary-bg shadow-sm hover:shadow-lg hover:border-[#EBFDF3] transition-all duration-300 relative overflow-hidden h-full w-full"
          >
            {/* Image */}
            <div className="w-full aspect-video bg-[#DEE5DF] rounded-md mb-4 overflow-hidden relative">
              {blog.coverImageUrl ? (
                <Image
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* Read time badge */}
            <div className="mb-2">
              <span className="inline-block bg-[#60935D33] text-[#213A1F] dark:text-[#649351] px-2 py-0.5 rounded-full text-[10px] font-medium">
                {blog?.readTimeMinutes}
                {blog?.readTimeMinutes > 1 ? " mins" : " min"} read
              </span>
            </div>

            <h3 className="text-[#101828] dark:text-secondary-text font-medium text-base mb-2 line-clamp-2 group-hover:text-[#649351] transition-colors">
              {blog?.title}
            </h3>

            <p className="text-[#4A5565] dark:text-primary-text text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
              {blog?.excerpt}
            </p>

            <div className="mt-auto">
              <span className="text-[#242424] dark:text-secondary-text text-sm font-medium border-b border-[#242424] dark:border-secondary-text pb-0.5 group-hover:text-[#649351] group-hover:border-[#649351] transition-colors inline-block">
                Read more
              </span>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
