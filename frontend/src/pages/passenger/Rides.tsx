import { ArrowLeft, CarFront } from 'lucide-react'
import { Link } from 'react-router-dom'

const rides = [
  {
    from: 'Kigali',
    to: 'Kicukiro',
    date: 'Today · 14:32',
    price: 500,
    status: 'Completed',
  },
  {
    from: 'Kigali',
    to: 'Remera',
    date: 'Yesterday · 10:24',
    price: 700,
    status: 'Completed',
  },
  {
    from: 'Kigali',
    to: 'Nyamirambo',
    date: 'Sep 28 · 18:45',
    price: 500,
    status: 'Completed',
  },
]

export default function Rides() {
  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-6">

      <header className="flex items-center gap-3">
        <Link
          to="/passenger"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <h1 className="text-xl font-bold">
          Your rides
        </h1>
      </header>

      <div className="mt-7 space-y-3">
        {rides.map((ride) => (
          <div
            key={`${ride.from}-${ride.to}-${ride.date}`}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006EB6]/10 text-[#006EB6]">
                <CarFront size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold">
                  {ride.from} → {ride.to}
                </p>

                <p className="mt-1 text-xs text-[#9CA3AF]">
                  {ride.date}
                </p>
              </div>

              <p className="font-bold text-[#006EB6]">
                RWF {ride.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-3 border-t border-[#E5E7EB] pt-3">
              <span className="text-xs font-semibold text-green-600">
                {ride.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}