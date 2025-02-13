'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div
        className="text-center opacity-0 scale-95 animate-fade-in max-w-md w-full"
        style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
          Something went wrong!
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  )
}