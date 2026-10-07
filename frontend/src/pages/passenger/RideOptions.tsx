import { ArrowLeft, CarFront, Clock3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'

const options = [
  {
    id: 'shared',
    name: 'LIFT Shared',
    description: 'Share your ride · Affordable',
    price: 500,
    minutes: 5,
  },
  {
    id: 'solo',
    name: 'LIFT Solo',
    description: 'Private ride',
    price: 1200,
    minutes: 3,
  },
]

export default function RideOptions() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <header className="flex items-center gap-3 px-5 pb-5 pt-6">
        <Link
          to="/passenger/find"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>
          <h1 className="text-xl font-bold">
            Choose your LIFT
          </h1>

          <p className="text-xs text-[#6B7280]">
            Kigali → Kigali Convention Centre
          </p>
        </div>
      </header>

      <section className="px-5">

        <div className="rounded-[28px] bg-[#006EB6] p-5 text-white">
          <p className="text-xs text-white/60">
            Your journey
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold">
                4.3 km
              </p>

              <p className="text-xs text-white/60">
                Estimated distance
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">
                ~12 min
              </p>

              <p className="text-xs text-white/60">
                Estimated time
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => navigate('/passenger/booking')}
              className="flex w-full items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left transition hover:border-[#006EB6]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006EB6]/10 text-[#006EB6]">
                <CarFront size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold">
                    {option.name}
                  </h2>

                  <p className="font-bold text-[#006EB6]">
                    RWF {option.price.toLocaleString()}
                  </p>
                </div>

                <p className="mt-1 text-xs text-[#6B7280]">
                  {option.description}
                </p>

                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#9CA3AF]">
                  <Clock3 size={12} />
                  {option.minutes}–{option.minutes + 3} min
                </div>
              </div>
            </button>
          ))}
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-6 rounded-2xl"
          onClick={() => navigate('/passenger/booking')}
        >
          Book LIFT
        </Button>

      </section>
    </div>
  )
}