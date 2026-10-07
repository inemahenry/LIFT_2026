import {
  AlertCircle,
  CarFront,
  Clock3,
  Users,
} from 'lucide-react'

const stats = [
  {
    label: "Today's rides",
    value: '124',
    icon: CarFront,
  },
  {
    label: 'Active drivers',
    value: '38',
    icon: Users,
  },
  {
    label: 'Passengers',
    value: '421',
    icon: Users,
  },
  {
    label: 'Pending verification',
    value: '7',
    icon: AlertCircle,
  },
]

export default function AdminDashboard() {
  return (
    <div>

      <div>
        <p className="text-sm text-[#6B7280]">
          Overview
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Dashboard
        </h2>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006EB6]/10 text-[#006EB6]">
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-5 text-3xl font-bold">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-[#6B7280]">
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-2">

        <section className="rounded-2xl border border-[#E5E7EB] bg-white">

          <div className="flex items-center justify-between border-b border-[#E5E7EB] p-5">
            <div>
              <h3 className="font-bold">
                Recent rides
              </h3>

              <p className="mt-1 text-xs text-[#9CA3AF]">
                Latest operational activity
              </p>
            </div>

            <Clock3
              size={18}
              className="text-[#006EB6]"
            />
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {[
              ['Kigali → Remera', 'Completed', 'RWF 500'],
              ['Kigali → Kicukiro', 'In progress', 'RWF 700'],
              ['Kigali → Nyamirambo', 'Completed', 'RWF 500'],
            ].map((ride) => (
              <div
                key={ride[0]}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {ride[0]}
                  </p>

                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    {ride[1]}
                  </p>
                </div>

                <p className="text-sm font-bold text-[#006EB6]">
                  {ride[2]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E5E7EB] bg-white">

          <div className="border-b border-[#E5E7EB] p-5">
            <h3 className="font-bold">
              Pending verification
            </h3>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Items requiring admin attention
            </p>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {[
              ['Jean Claude', 'Driver verification'],
              ['Toyota Corolla · RAE 123 D', 'Vehicle verification'],
              ['Patrick M.', 'Driver verification'],
            ].map((item) => (
              <div
                key={item[0]}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {item[0]}
                  </p>

                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    {item[1]}
                  </p>
                </div>

                <button className="rounded-lg bg-[#006EB6]/10 px-3 py-2 text-xs font-bold text-[#006EB6]">
                  Review
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}