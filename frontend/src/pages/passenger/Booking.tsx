import { CheckCircle2, MapPin, Phone, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import RideMap from '../../components/common/RideMap'
import Button from '../../components/ui/Button'

export default function Booking() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <div className="relative">
        <RideMap height="390px" />

        <div className="absolute left-4 right-4 top-4 z-[500] rounded-2xl bg-white px-4 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className="text-[#006EB6]"
            />

            <div>
              <p className="text-xs text-[#6B7280]">
                Your LIFT
              </p>

              <p className="text-sm font-bold">
                Driver found
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-t-[32px] bg-white px-5 pb-8 pt-7">

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#006EB6]">
            Driver is arriving
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            2 min away
          </h1>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#F8FAFC] p-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#006EB6] text-lg font-bold text-white">
            JC
          </div>

          <div className="flex-1">
            <p className="font-bold">
              Jean Claude
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
              <Star
                size={13}
                fill="currentColor"
                className="text-yellow-500"
              />
              4.8 (320)
            </div>

            <p className="mt-1 text-xs text-[#6B7280]">
              Toyota Corolla · RAE 123 D
            </p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Phone size={17} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/passenger/arrived')}
          >
            Driver arrived
          </Button>

          <Button
            onClick={() => navigate('/passenger/progress')}
          >
            Start ride
          </Button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F9BFCB]/30 p-4">
          <MapPin size={19} />

          <div>
            <p className="text-xs text-[#6B7280]">
              Destination
            </p>

            <p className="text-sm font-semibold">
              Kigali Convention Centre
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}