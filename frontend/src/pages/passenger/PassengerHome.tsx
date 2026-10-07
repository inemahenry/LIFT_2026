import {
  ArrowRight,
  Bell,
  MapPin,
  Navigation,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import RideMap from '../../components/common/RideMap'

export default function PassengerHome() {
  return (
    <div className="bg-[#FFFFF0]">

      <header className="flex items-center justify-between px-5 pb-4 pt-6">
        <div>
          <p className="text-xs text-[#6B7280]">
            Good morning
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#111827]">
            Bruno
          </h1>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
          <Bell size={19} />
        </button>
      </header>

      <section className="px-5">
        <div className="relative overflow-hidden rounded-[28px]">
          <RideMap height="350px" />

          <div className="absolute left-4 right-4 top-4 z-[500] rounded-2xl bg-white p-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006EB6]/10 text-[#006EB6]">
                <Navigation size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#9CA3AF]">
                  Pickup
                </p>

                <p className="truncate text-sm font-semibold">
                  Current location
                </p>
              </div>
            </div>

            <div className="my-2 ml-4 h-4 border-l border-dashed border-[#D1D5DB]" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F9BFCB]/50 text-[#111827]">
                <MapPin size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#9CA3AF]">
                  Destination
                </p>

                <p className="truncate text-sm font-semibold">
                  Kigali Convention Centre
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 pt-5">
        <h2 className="text-lg font-bold">
          Where are you going?
        </h2>

        <p className="mt-1 text-sm text-[#6B7280]">
          Share the journey and the cost.
        </p>

        <Link
          to="/passenger/find"
          className="mt-5 flex h-14 items-center justify-between rounded-2xl bg-[#006EB6] px-5 text-white shadow-lg shadow-[#006EB6]/20"
        >
          <div>
            <p className="text-sm font-bold">
              Find a LIFT
            </p>

            <p className="text-xs text-white/70">
              Choose your pickup and destination
            </p>
          </div>

          <ArrowRight size={20} />
        </Link>

        <div className="mt-5">
          <h3 className="text-sm font-bold">
            Recent ride
          </h3>

          <div className="mt-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Kigali → Kicukiro
                </p>

                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Yesterday · 14:32
                </p>
              </div>

              <p className="font-bold text-[#006EB6]">
                RWF 500
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}