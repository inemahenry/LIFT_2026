interface LoadingStateProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingState({
  message = 'Loading...',
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <div
      className={[
        'flex items-center justify-center',
        fullScreen ? 'min-h-screen' : 'py-12',
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#006EB6]/20 border-t-[#006EB6]" />

        <p className="text-sm font-medium text-[#6B7280]">
          {message}
        </p>
      </div>
    </div>
  )
}