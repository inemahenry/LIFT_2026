import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFFF0] px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#006EB6]">
          LIFT
        </p>

        <h1 className="mt-4 text-6xl font-bold text-[#111111]">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold">
          Page not found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link to="/" className="mt-7 inline-block">
          <Button>
            Go home
          </Button>
        </Link>
      </div>
    </main>
  )
}