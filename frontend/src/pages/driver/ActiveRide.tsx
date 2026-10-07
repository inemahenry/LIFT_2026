import {
  CheckCircle2,
  MapPin,
  Phone,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import RideMap from '../../components/common/RideMap'
import Button from '../../components/ui/Button'

export default function ActiveRide() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0]">

      <RideMap height="440px" />

      <section className="rounded-t-[32px] bg-white px-5 pb-8 pt-7">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6B7280]">
              Passenger
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Patrick M.
            </h1>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#006EB6]/10 text-[#006EB6]">
            <Phone size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl bg-[#F8FAFC] p-4">

          <div className="flex items-center gap-3">
            <MapPin
              size={18}
              className="text-[#006EB6]"
            />

            <div>
              <p className="text-[10px] text-[#9CA3AF]">
                Destination
              </p>

              <p className="text-sm font-bold">
                Remera
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t border-[#E5E7EB] pt-4">
            <div>
              <p className="text-[10px] text-[#9CA3AF]">
                Distance
              </p>

              <p className="mt-1 text-sm font-bold">
                4.3 km
              </p>
            </div>

            <div>
              <p className="text-[10px] text-[#9CA3AF]">
                Reward
              </p>

              <p className="mt-1 text-sm font-bold text-[#006EB6]">
                +120 points
              </p>
            </div>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-5 rounded-2xl"
          onClick={() => navigate('/driver/complete')}
        >
          Complete ride
        </Button>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
          <CheckCircle2
            size={15}
            className="text-green-500"
          />
          Passenger verified
        </div>
      </section>
    </div>
  )
}