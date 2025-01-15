"use client";

export function LoadingSpinner({
  className = "h-32 w-32",
}: {
  className?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div
        className={`animate-spin rounded-full border-b-2 border-primary ${className}`}
      />
      <p className='text-muted-foreground animate-pulse'>Please wait...</p>
    </div>
  );
}
