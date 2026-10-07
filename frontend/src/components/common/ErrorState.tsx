import Button from '../ui/Button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this information.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-600">
        !
      </div>

      <h3 className="text-lg font-semibold text-[#111111]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B7280]">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  )
}