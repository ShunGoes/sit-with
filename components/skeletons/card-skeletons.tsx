import { Skeleton } from "@/components/ui/skeleton";
export default function CardSkeletons() {
  return (
          <section className="py-20 bg-white dark:bg-transparent" id="consultation-cta">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <Skeleton className="dark:bg-primary-text h-6 w-32 rounded-full mb-4" />
            <Skeleton className="dark:bg-primary-text h-10 w-3/4 lg:w-1/2 mb-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl  border border-slate-100  shadow-sm">
                <Skeleton className="dark:bg-primary-text h-8 w-3/4 mb-4" />
                <Skeleton className="dark:bg-primary-text h-20 w-full mb-6" />
                <div className="flex justify-between items-center mb-6">
                  <Skeleton className="dark:bg-primary-text h-6 w-24" />
                  <Skeleton className="dark:bg-primary-text h-6 w-24" />
                </div>
                <Skeleton className="dark:bg-primary-text h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}