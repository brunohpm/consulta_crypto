export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 bordert-
blue-500 ${sizeClasses[size]}`}
    />
  );
}
export function LoadingCard() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border
border-gray-200 dark:border-gray-700"
    >
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full
mr-3"
            ></div>
            <div>
              <div
                className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-
2"
              ></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-8"></div>
        </div>
        {/* Price skeleton */}
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-3"></div>
        {/* Change skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-4"></div>
        {/* Info skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gridcols-
4 gap-6"
    >
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
}
export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header skeleton */}
      <header
        className="bg-white dark:bg-gray-800 shadow-sm border-b bordergray-
200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48
animate-pulse"
            ></div>
            <div className="flex items-center space-x-4">
              <div
                className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-64
animate-pulse"
              ></div>
              <div
                className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg
animate-pulse"
              ></div>
            </div>
          </div>
        </div>
      </header>
      {/* Content skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96"></div>
        </div>
        <LoadingGrid />
      </main>
    </div>
  );
}
