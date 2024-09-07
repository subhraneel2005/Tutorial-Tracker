import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
      {Array(4).fill(0).map((_, index) => (
        <div key={index} className='flex flex-col space-y-3'>
          <Skeleton className="h-10 w-[360px]" />
          <Skeleton className="h-[240px] w-[360px] rounded-xl" />
        </div>
      ))}
    </div>
  );
}
