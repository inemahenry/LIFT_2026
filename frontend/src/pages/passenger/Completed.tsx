import {
  CheckCircle2,
  CreditCard,
  Receipt,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'

export default function Completed() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-12">

      <div className="flex flex-col items-center text-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#006EB6] text-white shadow-xl shadow-[#006EB6]/20">
          <CheckCircle2 size={42} />
        </div>

        <p className="mt-6 text-sm text-[#6B7280]">
          Ride completed
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Thank you for riding with LIFT
        </h1>

        <p className="mt-5 text-4xl font-bold text-[#006EB6]">
          RWF 500
        </p>
      </div>

      <div className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">

        <div className="flex justify-between py-3">
          <span className="text-sm text-[#6B7280]">
            Base booking fee
          </span>

          <span className="font-semibold">
            RWF 500
          </span>
        </div>

        <div className="flex justify-between border-t border-[#E5E7EB] py-3">
          <span className="text-sm text-[#6B7280]">
            Additional distance
          </span>

          <span className="font-semibold">
            RWF 0
          </span>
        </div>

        <div className="flex justify-between border-t border-[#E5E7EB] pt-4">
          <span className="font-bold">
            Total
          </span>

          <span className="font-bold text-[#006EB6]">
            RWF 500
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
          <CreditCard size={20} />

          <div>
            <p className="text-sm font-bold">
              Mobile Money
            </p>

            <p className="text-xs text-[#9CA3AF]">
              **** 5678
            </p>
          </div>
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        className="mt-5 rounded-2xl"
        onClick={() => navigate('/passenger')}
      >
        Done
      </Button>

      <button
        onClick={() => navigate('/passenger/receipt')}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white text-sm font-semibold"
      >
        <Receipt size={17} />
        View receipt
      </button>
    </div>
  )
}