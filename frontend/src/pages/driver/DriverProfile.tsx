import {
  CarFront,
  ChevronRight,
  LogOut,
  Settings,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function DriverProfile() {
  const { logout } = useAuth()

  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-7">

      <h1 className="text-2xl font-bold">
        Profile
      </h1>

      <div className="mt-6 rounded-[28px] bg-[#071A2F] p-5 text-white">

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#006EB6] text-xl font-bold">
            B
          </div>

          <div>
            <p className="text-lg font-bold">
              Bruno
            </p>

            <p className="text-xs text-white/50">
              LIFT Driver
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white">

        <Link
          to="/driver/vehicle"
          className="flex items-center gap-4 border-b border-[#E5E7EB] p-4"
        >
          <CarFront size={19} />

          <span className="flex-1 text-sm font-semibold">
            My vehicle
          </span>

          <ChevronRight size={17} className="text-[#9CA3AF]" />
        </Link>

        <button className="flex w-full items-center gap-4 border-b border-[#E5E7EB] p-4 text-left">
          <UserRound size={19} />

          <span className="flex-1 text-sm font-semibold">
            Personal information
          </span>

          <ChevronRight size={17} className="text-[#9CA3AF]" />
        </button>

        <button className="flex w-full items-center gap-4 p-4 text-left">
          <Settings size={19} />

          <span className="flex-1 text-sm font-semibold">
            Settings
          </span>

          <ChevronRight size={17} className="text-[#9CA3AF]" />
        </button>
      </div>

      <button
        onClick={logout}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white py-3.5 text-sm font-semibold text-red-600"
      >
        <LogOut size={17} />
        Log out
      </button>
    </div>
  )
}