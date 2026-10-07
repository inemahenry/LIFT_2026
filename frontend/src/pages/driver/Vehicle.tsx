import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Vehicle() {
  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-6">

      <header className="flex items-center gap-3">
        <Link
          to="/driver/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <h1 className="text-xl font-bold">
          My vehicle
        </h1>
      </header>

      <section className="mt-6 rounded-[28px] bg-[#071A2F] p-6 text-white">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006EB6]">
          🚗
        </div>

        <p className="mt-6 text-xl font-bold">
          Toyota Corolla
        </p>

        <p className="mt-1 text-sm text-white/50">
          RAE 123 D
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 size={17} />
          Verified
        </div>
      </section>

      <section className="mt-5 overflow-hidden rounded-2xl bg-white">

        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <div>
            <p className="text-[10px] text-[#9CA3AF]">
              Vehicle type
            </p>

            <p className="mt-1 text-sm font-semibold">
              Sedan
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <div>
            <p className="text-[10px] text-[#9CA3AF]">
              Make
            </p>

            <p className="mt-1 text-sm font-semibold">
              Toyota
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
          <div>
            <p className="text-[10px] text-[#9CA3AF]">
              Model
            </p>

            <p className="mt-1 text-sm font-semibold">
              Corolla
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <FileText size={18} />

            <span className="text-sm font-semibold">
              Verification documents
            </span>
          </div>

          <ChevronRight size={17} />
        </div>
      </section>
    </div>
  )
}