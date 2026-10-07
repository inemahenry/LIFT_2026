import {
  ArrowLeft,
  ArrowUpRight,
  Gift,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const transactions = [
  {
    amount: '+120',
    description: 'Ride completed',
    date: 'Today · 10:24',
  },
  {
    amount: '+150',
    description: 'Ride completed',
    date: 'Today · 08:12',
  },
  {
    amount: '+100',
    description: 'Ride completed',
    date: 'Yesterday · 18:45',
  },
  {
    amount: '+130',
    description: 'Ride completed',
    date: 'Yesterday · 14:10',
  },
]

export default function DriverPoints() {
  return (
    <div className="min-h-full bg-[#FFFFF0] px-5 pb-8 pt-6">

      <header className="flex items-center gap-3">
        <Link
          to="/driver"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={19} />
        </Link>

        <h1 className="text-xl font-bold">
          My Points
        </h1>
      </header>

      <section className="mt-6 rounded-[30px] bg-[#006EB6] p-6 text-white">

        <p className="text-xs text-white/60">
          Your LIFT Points
        </p>

        <p className="mt-2 text-5xl font-bold">
          2,750
        </p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: '91.6%' }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-white/60">
          <span>2,750</span>
          <span>3,000</span>
        </div>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/60">
            Next reward
          </p>

          <p className="mt-1 text-lg font-bold">
            250 points to go
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-[26px] border border-[#E5E7EB] bg-white p-5">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F9BFCB]/50">
            <Gift size={20} />
          </div>

          <div>
            <p className="text-sm font-bold">
              Reward available at 3,000 points
            </p>

            <p className="mt-1 text-xs text-[#6B7280]">
              Your reward amount comes from LIFT configuration.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-7">

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Points history
          </h2>

          <TrendingUp
            size={19}
            className="text-[#006EB6]"
          />
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white">

          {transactions.map((transaction) => (
            <div
              key={`${transaction.date}-${transaction.amount}`}
              className="flex items-center gap-4 border-b border-[#E5E7EB] p-4 last:border-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                <ArrowUpRight size={17} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {transaction.description}
                </p>

                <p className="mt-1 text-[11px] text-[#9CA3AF]">
                  {transaction.date}
                </p>
              </div>

              <p className="font-bold text-green-600">
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}