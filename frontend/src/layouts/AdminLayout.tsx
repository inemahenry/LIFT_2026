import {
  CarFront,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  WalletCards,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Rides',
    path: '/admin/rides',
    icon: CarFront,
  },
  {
    label: 'Drivers',
    path: '/admin/drivers',
    icon: UserRound,
  },
  {
    label: 'Passengers',
    path: '/admin/passengers',
    icon: Users,
  },
  {
    label: 'Vehicles',
    path: '/admin/vehicles',
    icon: CarFront,
  },
  {
    label: 'Points',
    path: '/admin/points',
    icon: CircleDollarSign,
  },
  {
    label: 'Rewards',
    path: '/admin/rewards',
    icon: WalletCards,
  },
  {
    label: 'Configuration',
    path: '/admin/configuration',
    icon: Settings,
  },
]

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F6F8FA] text-[#111827]">

      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 border-r border-[#E5E7EB] bg-[#071A2F] text-white lg:flex lg:flex-col">

        <div className="px-7 py-7">
          <p className="text-2xl font-bold">
            Lift
          </p>

          <p className="mt-1 text-xs text-white/40">
            Administration
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-[#006EB6] text-white'
                      : 'text-white/55 hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 hover:bg-white/5 hover:text-white">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9CA3AF]">
                LIFT Administration
              </p>

              <h1 className="mt-1 text-lg font-bold">
                Operations
              </h1>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#006EB6] text-sm font-bold text-white">
              A
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}