import { handleEditBlog } from "@/components/modal-helper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, FilePenLine } from "lucide-react";
import { BlogPost } from "@/lib/api/services/admin/blog.services";
import Link from "next/link";
import { formatAppDate } from "@/lib/utils";
import { useDeleteBlogPost } from "@/lib/api/hooks/admin/blog.hooks";
import { useModalStore } from "@/components/store/use-modal-store";
import { Spinner } from "@/components/spinner";
import { useEffect } from "react";

export default function BlogContent({ blog }: { blog: BlogPost }) {
  const { mutate: deletePost, isPending: isDeleting } = useDeleteBlogPost();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

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

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      deletePost(blog.id, {
        onSuccess: () => {
          closeModal("loading");
        },
        onError: () => {
          closeModal("loading");
        },
      });
    }
  };

  return (
    <div
      key={blog.id}
      className="bg-white dark:bg-dash-secondary-bg p-6 rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] border border-[#EAECF0] dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <Link href={`/admin/blog/${blog.id}`} className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 rounded-[12px] bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] flex items-center justify-center shrink-0">
          <FileText />
        </div>
        <div className="flex flex-col gap-y-1 ">
          <h3 className="text-base font-bold text-primary-text line-clamp-2 hover:text-primary transition-colors">
            {blog.title}
          </h3>
          <p className="text-sm text-secondary-text max-w-2xl line-clamp-2">
            {blog.excerpt}
          </p>
          <p className="text-sm text-secondary-text">
            {blog.author || "Admin"} · {formatAppDate(blog.createdAt)}
          </p>
        </div>
      </Link>

      <div className="flex md:flex-col items-center md:items-end gap-6 shrink-0 w-full md:w-auto md:h-24 justify-between">
        <div className="flex items-center gap-2">
          {blog.isPublished ? (
            <Badge variant={"success"}>Published</Badge>
          ) : (
            <Badge variant={"warning"}>Draft</Badge>
          )}
          <span className="px-3 py-1 bg-[#E8F3EF] dark:bg-[#1A2E25] text-[#4CA48B] text-xs font-medium rounded-full">
            {blog.category}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-auto self-end  ">
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              handleEditBlog(blog);
            }}
            className="w-8 h-8 hover:bg-muted cursor-pointer border-none flex items-center justify-center transition-all shadow-md "
          >
            <FilePenLine size={15} color="#98A2B3"  />
          </Button>
          <Button
            variant={"outline"}
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-8 h-8 hover:bg-[#FBEAEA] cursor-pointer border-none flex items-center justify-center transition-all shadow-md "
          >
            <Trash2 color="#D32F2F" size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}
