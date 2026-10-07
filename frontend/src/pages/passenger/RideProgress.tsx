import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import RideMap from '../../components/common/RideMap'
import Button from '../../components/ui/Button'

export default function RideProgress() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <header className="absolute left-0 right-0 top-0 z-[600] px-5 pt-5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <ArrowLeft size={19} />
        </button>
      </header>

      <RideMap height="470px" />

      <section className="rounded-t-[32px] bg-white px-5 pb-8 pt-7">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280]">
              Your ride is in progress
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Stay on board
            </h1>
          </div>

          <div className="rounded-full bg-[#006EB6]/10 px-3 py-2 text-xs font-bold text-[#006EB6]">
            12 min
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-y border-[#E5E7EB] py-4">
          <div>
            <p className="text-xs text-[#9CA3AF]">
              Distance
            </p>

            <p className="mt-1 font-bold">
              4.3 km
            </p>
          </div>

          <div>
            <p className="text-xs text-[#9CA3AF]">
              Destination
            </p>

            <p className="mt-1 font-bold">
              Kigali Convention Centre
            </p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6]">
            <Phone size={17} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F0FDF4] p-4">
          <ShieldCheck
            size={21}
            className="text-green-600"
          />

          <div>
            <p className="text-sm font-bold">
              You're covered
            </p>

            <p className="text-xs text-[#6B7280]">
              Your ride and driver details are protected.
            </p>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-5 rounded-2xl"
          onClick={() => navigate('/passenger/completed')}
        >
          Complete ride
        </Button>
      </section>
    </div>
  )
}