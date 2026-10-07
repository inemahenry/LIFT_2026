import { ArrowRight, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Landing() {
  return (
    <main className="min-h-screen bg-[#FFFFF0]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-[#006EB6]"
        >
          LIFT
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm">
              Get started
            </Button>
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#006EB6]/15 bg-[#006EB6]/5 px-4 py-2 text-sm font-medium text-[#006EB6]">
            <span className="h-2 w-2 rounded-full bg-[#006EB6]" />
            Shared rides, made simple
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#111111] sm:text-7xl">
            You're already going there.
            <span className="mt-2 block text-[#006EB6]">
              Why not give someone a LIFT?
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6B7280] sm:text-xl">
            LIFT connects people travelling in the same direction so they
            can share a journey and the cost.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/login">
              <Button size="lg">
                Find a LIFT
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="outline" size="lg">
                Become a driver
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-[#006EB6] p-7 text-white">
            <MapPin size={28} />

            <h2 className="mt-8 text-2xl font-semibold">
              Going your way?
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
              Find a shared ride heading in your direction and pay only your
              share of the journey.
            </p>
          </div>

          <div className="rounded-3xl bg-[#F9BFCB] p-7 text-[#111111]">
            <Users size={28} />

            <h2 className="mt-8 text-2xl font-semibold">
              Have an empty seat?
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-black/60">
              Let someone join your journey and earn LIFT points for
              completed rides.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}