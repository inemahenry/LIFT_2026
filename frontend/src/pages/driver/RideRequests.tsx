import {
  ArrowLeft,
  MapPin,
  Navigation,
  Star,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function RideRequests() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-6">

      <header className="flex items-center gap-3">
        <Link
          to="/driver"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <div>
          <h1 className="text-xl font-bold">
            Ride request
          </h1>

          <p className="text-xs text-[#6B7280]">
            New passenger request
          </p>
        </div>
      </header>

      <div className="mt-6 rounded-[28px] bg-[#071A2F] p-5 text-white">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#006EB6] text-lg font-bold">
            PM
          </div>

          <div className="flex-1">
            <p className="font-bold">
              Patrick M.
            </p>

            <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
              <Star
                size={12}
                fill="currentColor"
                className="text-yellow-400"
              />
              New passenger
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white/5 p-4">

          <div className="flex gap-3">
            <Navigation
              size={18}
              className="mt-0.5 text-[#F9BFCB]"
            />

            <div>
              <p className="text-[10px] text-white/40">
                Pickup
              </p>

              <p className="mt-1 text-sm font-semibold">
                Kigali City Tower
              </p>
            </div>
          </div>

          <div className="ml-2 my-3 h-5 border-l border-dashed border-white/20" />

          <div className="flex gap-3">
            <MapPin
              size={18}
              className="mt-0.5 text-[#F9BFCB]"
            />

            <div>
              <p className="text-[10px] text-white/40">
                Destination
              </p>

              <p className="mt-1 text-sm font-semibold">
                Remera
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] text-white/40">
              Distance
            </p>

            <p className="mt-1 font-bold">
              4.3 km
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-white/40">
              LIFT Points
            </p>

            <p className="mt-1 font-bold text-[#F9BFCB]">
              +120
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
        >
          Decline
        </Button>

        <Button
          size="lg"
          onClick={() => navigate('/driver/active')}
        >
          Accept
        </Button>
      </div>
    </div>
  )
}