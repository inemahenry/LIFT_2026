import {
  Bell,
  CarFront,
  ChevronRight,
  CircleCheck,
  MapPin,
  Power,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DriverHome() {
  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <header className="flex items-center justify-between bg-[#071A2F] px-5 pb-7 pt-7 text-white">
        <div>
          <p className="text-xs text-white/50">
            Good morning
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Bruno
          </h1>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Bell size={18} />
        </button>
      </header>

      <section className="-mt-4 px-5">

        <div className="rounded-[28px] bg-white p-5 shadow-lg shadow-black/5">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006EB6]/10 text-[#006EB6]">
                <CarFront size={23} />
              </div>

              <div>
                <p className="text-xs text-[#9CA3AF]">
                  Driver status
                </p>

                <p className="mt-1 font-bold">
                  AVAILABLE
                </p>
              </div>
            </div>

            <div className="flex h-3 w-3 rounded-full bg-green-500" />
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#071A2F] py-3.5 text-sm font-semibold text-white">
            <Power size={17} />
            Go offline
          </button>
        </div>

        <Link
          to="/driver/points"
          className="mt-4 block rounded-[28px] bg-[#006EB6] p-5 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">
                Your LIFT Points
              </p>

              <p className="mt-1 text-3xl font-bold">
                2,750
              </p>
            </div>

            <ChevronRight size={20} />
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: '91%' }}
            />
          </div>

          <p className="mt-2 text-xs text-white/60">
            250 points to reward
          </p>
        </Link>

        <div className="mt-6">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Ride requests
            </h2>

            <Link
              to="/driver/rides"
              className="text-xs font-semibold text-[#006EB6]"
            >
              View all
            </Link>
          </div>

          <div className="mt-3 rounded-[24px] border border-[#E5E7EB] bg-white p-5">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold">
                  Passenger
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-yellow-500"
                  />
                  4.8
                </div>
              </div>

              <p className="font-bold text-[#006EB6]">
                +120 pts
              </p>
            </div>

            <div className="my-4 space-y-3">

              <div className="flex items-center gap-3">
                <MapPin
                  size={17}
                  className="text-[#006EB6]"
                />

                <div>
                  <p className="text-[10px] text-[#9CA3AF]">
                    Pickup
                  </p>

                  <p className="text-sm font-semibold">
                    Kigali
                  </p>
                </div>
              </div>

              <div className="ml-2 h-3 border-l border-dashed border-[#D1D5DB]" />

              <div className="flex items-center gap-3">
                <MapPin
                  size={17}
                  className="text-[#F09CAF]"
                />

                <div>
                  <p className="text-[10px] text-[#9CA3AF]">
                    Destination
                  </p>

                  <p className="text-sm font-semibold">
                    Remera
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/driver/rides"
              className="block rounded-2xl bg-[#006EB6] py-3.5 text-center text-sm font-bold text-white"
            >
              View request
            </Link>
          </div>
        </div>

        <div className="mt-5 mb-8 flex items-center gap-3 rounded-2xl bg-green-50 p-4">
          <CircleCheck
            size={19}
            className="text-green-600"
          />

          <p className="text-xs leading-5 text-green-800">
            Your vehicle is verified and ready for rides.
          </p>
        </div>
      </section>
    </div>
  )
}