"use client";

import { useGetAdminBlogById, useDeleteBlogPost } from "@/lib/api/hooks/admin/blog.hooks";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import QueryStateHandler from "@/components/query-state-handler";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Clock, Tag, Trash2, Edit2, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleEditBlog } from "@/components/modal-helper";
import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { useEffect } from "react";

export default function BlogDetail({ id }: { id: string }) {
  const router = useRouter();
  const { data: blogResponse, isLoading, isError } = useGetAdminBlogById(id);
  const { mutate: deletePost, isPending: isDeleting } = useDeleteBlogPost();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const blog = blogResponse?.data;

  useEffect(() => {
    if (isDeleting) {
      openModal(
        "loading",
        <div className="flex items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isDeleting, openModal]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      deletePost(id, {
        onSuccess: () => {
          closeModal("loading");
          router.push("/admin/blog");
        },
        onError: () => {
          closeModal("loading");
        },
      });
    }
  };

  return (
    <div className="space-y-10">
      <DashboardHeaderText
        header="Blog Detail"
        subtext="View and manage blog post content."
        backLink="/admin/blog"
        backLinkText="Back to blogs"
      />

      <QueryStateHandler
        data={blog ? [blog] : undefined}
        isLoading={isLoading}
        isError={isError}
        loadingMessage="Loading Blog Details"
        errorMessage="Failed to fetch blog data"
        emptyMessage="Blog post not found"
      >
        {blog && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-dash-secondary-bg p-8 rounded-[16px] space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={blog.isPublished ? "success" : "warning"}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="hibiscus" className="flex items-center gap-1">
                      <Tag size={12} /> {blog.category}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-primary-text leading-tight">
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-secondary-text">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{blog.author || "Admin"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{blog.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>

                {blog.coverImageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary-text">Excerpt</h3>
                  <p className="text-secondary-text italic border-l-4 border-primary/20 pl-4 py-1 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="border-t border-border pt-8">
                  <div 
                    className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar / Actions */}
            <div className="space-y-6">
              <div className="bg-dash-secondary-bg p-6 rounded-[16px] border border-border sticky top-8">
                <h3 className="font-bold text-lg mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start gap-2 font-normal" 
                    variant="regular"
                    onClick={() => blog && handleEditBlog(blog)}
                  >
                    <Edit2 size={16} /> Edit Post
                  </Button>
                  <Button 
                    className="w-full justify-start gap-2 font-normal hover:bg-destructive/10 text-destructive border-destructive/20" 
                    variant="outline"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash2 size={16} /> {isDeleting ? "Deleting..." : "Delete Post"}
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-border space-y-4">
                  <div>
                    <p className="text-xs font-medium text-secondary-text uppercase tracking-wider">Created At</p>
                    <p className="text-sm font-medium">{format(new Date(blog.createdAt), "PPpp")}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-secondary-text uppercase tracking-wider">Last Updated</p>
                    <p className="text-sm font-medium">{format(new Date(blog.updatedAt), "PPpp")}</p>
                  </div>
                  {blog.publishedAt && (
                    <div>
                      <p className="text-xs font-medium text-secondary-text uppercase tracking-wider">Published At</p>
                      <p className="text-sm font-medium">{format(new Date(blog.publishedAt), "PPpp")}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-secondary-text uppercase tracking-wider">Slug</p>
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1 break-all">{blog.slug}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </QueryStateHandler>
    </div>
  );
}
